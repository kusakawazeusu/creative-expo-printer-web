import Image from "next/image";

function EmptyItem() {
  return (
    <div className="flex flex-col items-center justify-center h-full mx-auto opacity-30">
      <Image
        src="/barcode.svg" // Replace with your actual image path
        alt="Empty Barcode"
        width={400}
        height={100}
      />
      <p className="mt-8 font-medium text-black text-5xl">
        請掃描商品卡上的條碼
      </p>
    </div>
  );
}

export default EmptyItem;
