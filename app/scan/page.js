"use client";

import Button from "@/components/Button";
import EmptyItem from "@/components/EmptyItem";
import Item from "@/components/Item";
import OutlineButton from "@/components/OutlineButton";
import { NotoSans, Shrikhand } from "@/fonts/fonts";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ITEMS from "@/data/items.json";
import Alert from "@/components/Alert";

export default function Scan() {
  const [items, setItems] = useState([]);
  const [tempString, setTempString] = useState("");
  const [isShowAlert, setShowAlert] = useState(false);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        const item = ITEMS.find((item) => item.id === tempString);

        if (item) {
          if (items.find((item) => item.id === tempString)) {
            setShowAlert(true);
          } else {
            setItems((prevItems) => [...prevItems, item]);
          }
        }

        setTempString("");
      } else {
        setTempString((prevString) => prevString + event.key);
      }

      setTimeout(() => setTempString(""), 200);
    },
    [items, tempString]
  );

  useEffect(() => {
    window.document.addEventListener("keydown", onKeyDown);

    return () => {
      window.document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col justify-center h-dvh bg-white p-[60px]">
      <div className="flex justify-between items-center">
        <div className="relative w-[20vw] h-[6vw] object-cover">
          <Image src="/logo.png" fill alt="logo" />
        </div>
        <Link href="/">
          <OutlineButton>
            <ChevronLeft />
            返回首頁
          </OutlineButton>
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border-[3px] border-primary grow overflow-y-hidden py-10 px-10">
        <div
          className={`overflow-y-scroll max-h-full h-full ${
            items.length ? "pr-8 pb-8" : ""
          }`}
        >
          {items.length ? (
            items.map((item) => (
              <Item
                key={`imported-item-${item.id}`}
                item={item}
                onDelete={(id) => deleteItem(id)}
              />
            ))
          ) : (
            <EmptyItem />
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <span className="text-primary font-bold text-4xl flex items-center">
          <span
            className={`text-primary font-bold text-4xl ${NotoSans.className}`}
          >
            商品數量：
          </span>
          <strong className={`text-8xl ${Shrikhand.className}`}>
            {items.length}
          </strong>
        </span>

        <Button>完成掃描</Button>
      </div>

      <Alert open={isShowAlert} onClose={() => setShowAlert(false)} />
    </div>
  );
}
