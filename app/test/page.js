"use client";

import Button from "@/components/Button";
import { useCallback } from "react";

export default function Home() {
  const testImage = useCallback(async () => {
    fetch("/api/print", {
      method: "POST",
      body: JSON.stringify({ id: "mazu-003" }),
    });
  }, []);

  const testText = useCallback(async () => {
    fetch("/api/test", {
      method: "POST",
    });
  }, []);

  return (
    <div className="h-dvh relative flex flex-col justify-center items-center">
      <Button onClick={testImage}>測試圖片</Button>

      <Button className="mt-10" onClick={testText}>
        測試文字
      </Button>
    </div>
  );
}
