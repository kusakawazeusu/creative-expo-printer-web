"use client";

import Image from "next/image";
import { JinHeiFont, NotoSans } from "@/fonts/fonts";
import Progress from "@/components/Progress";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import OutlineButton from "@/components/OutlineButton";

function ScanResultPage() {
  const [isFinished, setFinished] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (isFinished) {
    return (
      <div className="h-dvh p-[60px] relative flex flex-col justify-center items-center">
        <div
          className="absolute top-[60px] left-[60px] flex justify-between items-center"
          style={{ width: "calc(100% - 120px)" }}
        >
          <div className="w-[20vw] h-[6vw] object-cover relative">
            <Image src="/logo-white.png" fill alt="logo" />
          </div>

          <Link href="/">
            <OutlineButton className="text-white border-white !bg-primary">
              <ChevronLeft />
              返回首頁
            </OutlineButton>
          </Link>
        </div>

        <h1 className={`text-6xl text-white ${JinHeiFont.className}`}>
          請取出你的收據
        </h1>

        <span className="absolute top-0 right-0 text-red-600">
          {errorMessage}
        </span>

        <Image
          className="mt-8"
          src="/printer.png"
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

      <ProgressBar onFinished={() => setFinished(true)} />

      <Suspense>
        <ApiCall onError={setErrorMessage} />
      </Suspense>
    </div>
  );
}

export default ScanResultPage;

function ProgressBar({ onFinished }) {
  const searchParams = useSearchParams();
  const timeoutRef = useRef(null);

  let duration = 0.5;
  if (searchParams.get("id")) {
    duration = searchParams.get("id").split(",").length * 0.7;
  }

  useEffect(() => {
    if (!timeoutRef.current) {
      console.log("duration", duration);
      timeoutRef.current = setTimeout(onFinished, duration * 1000);
    }
  }, [onFinished, duration]);

  return <Progress duration={duration} className="mt-8 w-[720px]" />;
}

function ApiCall({ onError }) {
  const searchParams = useSearchParams();

  const print = useCallback(
    async (id) => {
      const response = await fetch("/api/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.json();
        onError(error.message);
        console.error(error.message);
      }
    },
    [onError]
  );

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
