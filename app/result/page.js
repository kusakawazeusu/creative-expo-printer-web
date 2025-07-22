"use client";

import Image from "next/image";
import { JinHeiFont, NotoSans } from "@/fonts/fonts";
import Progress from "@/components/Progress";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function ScanResultPage() {
  const [isFinished, setFinished] = useState(false);

  useEffect(() => {
    setTimeout(() => setFinished(true), 1000);
  }, []);

  if (isFinished) {
    return (
      <div className="h-dvh p-[60px] relative flex flex-col justify-center items-center">
        <div className="absolute top-[60px] left-[60px] w-[20vw] h-[6vw] object-cover">
          <Image src="/logo-white.png" fill alt="logo" />
        </div>

        <h1 className={`text-6xl text-white ${JinHeiFont.className}`}>
          請取出你的收據
        </h1>

        <Image
          className="mt-8"
          src="/printer.svg"
          height={200}
          width={240}
          alt="printer"
        />
      </div>
    );
  }

  return (
    <div className="h-dvh p-[60px] relative flex flex-col justify-center items-center">
      <div className="absolute top-[60px] left-[60px] w-[20vw] h-[6vw] object-cover">
        <Image src="/logo-white.png" fill alt="logo" />
      </div>

      <h1 className={`text-8xl text-white ${JinHeiFont.className}`}>
        掃描完成！
      </h1>

      <p
        className={`mt-8 text-center text-5xl text-white font-bold ${NotoSans.className}`}
      >
        收據列印中，請稍候 ⋯⋯
      </p>

      <Progress
        className="mt-8 w-[720px]"
        onAnimationEnd={() => setFinished(true)}
      />

      <Suspense>
        <ApiCall />
      </Suspense>
    </div>
  );
}

export default ScanResultPage;

function ApiCall() {
  const searchParams = useSearchParams();

  const print = useCallback(async (id) => {
    const response = await fetch("/api/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      return;
    }

    window.history.replaceState(null, "", window.location.pathname);

    print(id);
  }, [print, searchParams]);

  return null;
}
