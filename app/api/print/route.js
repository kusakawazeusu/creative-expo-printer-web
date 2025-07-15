import { NextResponse } from "next/server";
import { Printer, Image } from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";
import path from "path";

export async function POST(request) {
  try {
    const device = new USB();
    device.open(async function (err) {
      if (err) {
        console.error(err);
        return;
      }

      const options = { encoding: "BIG5" /* default */ };
      let printer = new Printer(device, options);

      const imagePath = path.join(process.cwd(), "public", "4.png");

      const image1 = await Image.load(imagePath);
      printer = await printer.align("CT").image(
        image1,
        "d24" // changing with image
      );

      printer.cut().close();
    });

    // const { printIds } = await request.json();

    return NextResponse.json(
      { message: "Print job sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing print request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
