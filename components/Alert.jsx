import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { NotoSans } from "@/fonts/fonts";
import { X } from "lucide-react";

function Alert({ open, onClose }) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-4xl border-none shadow-none flex flex-col items-center justify-center p-8">
        <AlertDialogTitle className="hidden" />
        <X
          onClick={onClose}
          className="absolute right-4 top-4"
          size={64}
          strokeWidth={1}
        />
        <Image alt="icon" src="/alert-icon.svg" width={200} height={200} />
        <p
          className={`text-center font-bold text-3xl leading-12 ${NotoSans.className}`}
        >
          你已經掃描過此商品
          <br />
          請選擇新商品進行掃描
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
