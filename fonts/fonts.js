import localFont from "next/font/local";
import { Noto_Sans_TC } from "next/font/google";

export const JinHeiFont = localFont({
  preload: true,
  src: "../public/fonts/JinHeiFont.ttf",
});

export const Shrikhand = localFont({
  preload: true,
  src: "../public/fonts/Shrikhand-Regular.ttf",
});

export const NotoSans = Noto_Sans_TC({
  preload: false,
  weight: ["400", "500", "700"],
});
