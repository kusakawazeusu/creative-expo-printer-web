"use client";

import Button from "@/components/Button";
import { JinHeiFont, NotoSans } from "@/fonts/fonts";
import Link from "next/link";
import Image from "next/image";
import { TypeWritterText } from "@/components/TypeWritterText";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const onNextPage = useCallback(() => {
    setVisible(false);

    setTimeout(() => router.push("/scan"), 500);
  }, [router]);

  const testPrint = useCallback(async () => {
    fetch("/api/test", { method: "POST" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-dvh relative flex flex-col justify-center items-center"
        >
          <div className="absolute top-[60px] left-[60px] w-[20vw] h-[6vw] object-cover">
            <Image src="/logo-white.png" fill alt="logo" />
          </div>

          <h1 className={`text-9xl ${JinHeiFont.className} text-white`}>
            自助掃描機
          </h1>

          <TypeWritterText
            className={`whitespace-break-spaces mt-10 text-center text-3xl/11 font-bold text-white ${NotoSans.className}`}
            text={`請選擇你喜歡／想更加了解的商品進行掃描結帳，\n看看商品的背後有哪些有趣的發展歷程。`}
          />

          <Button className="mt-10" onClick={onNextPage}>
            開始掃描
          </Button>

          <Button className="mt-10" onClick={testPrint}>
            測試
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
