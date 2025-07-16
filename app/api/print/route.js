import { NextResponse } from "next/server";
import { Printer, Image } from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;
    const images = id.split(",");

    if (!images.length) {
      return NextResponse.json({ message: "no images" }, { status: 400 });
    }

    const device = new USB();
    device.open(async function (err) {
      if (err) {
        throw new Error(err);
      }

      const options = { encoding: "BIG5" /* default */ };
      let printer = new Printer(device, options);

      for (const image of images) {
        const imagePath = path.join(
          process.cwd(),
          "public",
          "images",
          `${image}.png`
        );

        console.log(imagePath);
        const loadedImage = await Image.load(imagePath);

        printer = await printer.align("CT").image(
          loadedImage,
          "d24" // changing with image
        );

        printer.cut();
      }

      printer.close();
    });

    return NextResponse.json(
      { message: "Print job sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
