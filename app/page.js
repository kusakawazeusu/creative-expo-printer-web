import Button from "@/components/Button";
import { JinHeiFont, NotoSans } from "@/fonts/fonts";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-dvh relative flex flex-col justify-center items-center">
      <div className="absolute top-[60px] left-[60px] w-[20vw] h-[6vw] object-cover">
        <Image src="/logo-white.png" fill alt="logo" />
      </div>

      <h1 className={`text-9xl ${JinHeiFont.className} text-white`}>
        自助掃描機
      </h1>

      <p
        className={`mt-10 text-center text-3xl/11 font-bold text-white ${NotoSans.className}`}
      >
        請選擇你喜歡／想更加了解的商品進行掃描結帳，
        <br />
        看看商品的背後有哪些有趣的發展歷程。
      </p>

      <Link href="/scan">
        <Button className="mt-10">開始掃描</Button>
      </Link>
    </div>
  );
}
