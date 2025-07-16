import { NextResponse } from "next/server";
import { Printer } from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";

export async function POST() {
  try {
    const device = new USB();
    device.open(async function (err) {
      if (err) {
        throw new Error(err);
      }

      const options = { encoding: "BIG5" /* default */ };
      let printer = new Printer(device, options);

      printer
        .font("A")
        .align("lt")
        .style("b")
        .size(1, 1)
        .marginLeft(20)
        .feed(2)
        .drawLine("-")
        .feed(2)
        .text(
          "青山依舊在,幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢,浪花淘盡英雄。是非成敗轉頭空,滾滾長江樵江渚上,古今多少事,都付笑談中"
        )
        .feed(1)
        .text(
          "青山依舊在,幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢,浪花淘盡英雄。是非成敗轉頭空,滾滾長青山依舊在,幾度夕陽紅。慣看秋青山依舊在,幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢,浪花淘盡英雄。是非成敗轉頭空"
        )
        .feed(1)
        .text("滾滾長江東逝水,白髮漁樵江渚上,古今多少事,都付笑談中。")
        .feed(1)
        .drawLine(".")
        .feed(1);

      printer.cut().close();
    });

    return NextResponse.json(
      { message: "Print job sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
