import Image from "next/image";
import { JinHeiFont, NotoSans } from "@/fonts/fonts";

function ScanResultPage() {
  return (
    <div className="h-dvh p-[60px] relative flex flex-col justify-center items-center">
      <Image
        className="absolute top-[60px] left-[60px]"
        src="/logo-white.png"
        height={100}
        width={300}
        alt="logo"
      />

      <h1 className={`text-9xl text-white ${JinHeiFont.className}`}>
        掃描完成！
      </h1>

      <p
        className={`mt-10 text-center text-5xl text-white font-bold ${NotoSans.className}`}
      >
        收據列印中，請稍候 ⋯⋯
      </p>
    </div>
  );
}

export default ScanResultPage;
