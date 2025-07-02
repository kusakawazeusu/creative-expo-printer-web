import localFont from "next/font/local";
import { Noto_Sans_TC } from "next/font/google";

export const JinHeiFont = localFont({
  src: "../public/fonts/JinHeiFont.ttf",
});

export const Shrikhand = localFont({
  src: "../public/fonts/Shrikhand-Regular.ttf",
});

export const NotoSans = Noto_Sans_TC({
  weight: ["400", "500", "700"],
});
