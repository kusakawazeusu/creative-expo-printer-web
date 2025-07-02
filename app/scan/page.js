"use client";

import Button from "@/components/Button";
import EmptyItem from "@/components/EmptyItem";
import Item from "@/components/Item";
import OutlineButton from "@/components/OutlineButton";
import { NotoSans, Shrikhand } from "@/fonts/fonts";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DUMMY_ITEMS = [
  {
    id: uuidv4(),
    name: "《噤聲之界：北臺灣客庄與原民的百年纏結和對話》",
  },
  {
    id: uuidv4(),
    name: "《腥紅速寫》",
  },
  {
    id: uuidv4(),
    name: "《魚眼》",
  },
  {
    id: uuidv4(),
    name: "《我知道你沒有說謊》",
  },
  {
    id: uuidv4(),
    name: "《集合！RENDEZVOUS》",
  },
  {
    id: uuidv4(),
    name: "《課金派戀愛》",
  },
  {
    id: uuidv4(),
    name: "《自由的窄廊：國家與社會如何決定自由的命運》",
  },
  {
    id: uuidv4(),
    name: "《社會主義快來吧！》",
  },
  {
    id: uuidv4(),
    name: "《國家的視角：改善人類處境的計畫為何失敗》",
  },
];

export default function Scan() {
  const [items, setItems] = useState(DUMMY_ITEMS);

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col justify-center h-dvh bg-white p-[60px]">
      <div className="flex justify-between items-center">
        <Image src="/logo.png" height={100} width={300} alt="logo" />
        <Link href="/">
          <OutlineButton>
            <ChevronLeft />
            返回首頁
          </OutlineButton>
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border-[3px] border-primary grow overflow-y-hidden py-10 px-10">
        <div className="overflow-y-scroll max-h-full pr-8 pb-8">
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
    </div>
  );
}
