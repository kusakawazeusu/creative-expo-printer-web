"use client";

import Button from "@/components/Button";
import EmptyItem from "@/components/EmptyItem";
import Item from "@/components/Item";
import OutlineButton from "@/components/OutlineButton";
import { NotoSans, Shrikhand } from "@/fonts/fonts";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ITEMS from "@/data/items.json";
import Alert from "@/components/Alert";
import { motion } from "motion/react";

export default function Scan() {
  const [items, setItems] = useState([]);
  const [tempString, setTempString] = useState("");
  const [isShowAlert, setShowAlert] = useState(false);
  const scrollRef = useRef(null);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        console.log(tempString);
        const item = ITEMS.find((item) => item.id === tempString);

        if (item) {
          if (items.find((item) => item.id === tempString)) {
            setShowAlert(true);
          } else {
            setItems((prevItems) => [...prevItems, item]);
          }
        }

        setTempString("");

        if (scrollRef.current) {
          setTimeout(() => {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }, 200);
        }
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
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center h-dvh bg-white p-[60px]"
    >
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
          ref={scrollRef}
          className={`overflow-x-hidden overflow-y-scroll max-h-full h-full ${
            items.length ? "pr-8 pb-8" : ""
          }`}
        >
          {items.length ? (
            items.map((item) => (
              <MotionItem
                key={`imported-item-${item.id}`}
                item={item}
                onDelete={(id) => deleteItem(id)}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
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
    </motion.div>
  );
}

const MotionItem = motion.create(Item);
