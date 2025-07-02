import { NotoSans } from "@/fonts/fonts";

function OutlineButton({ children, className = "" }) {
  return (
    <button
      className={`${className} ${NotoSans.className} btn font-medium leading-0 bg-white hover:bg-gray-200 border-2 border-primary text-primary text-2xl py-2 px-6 rounded-[9999px] transition-all duration-200 flex items-center`}
    >
      {children}
    </button>
  );
}

export default OutlineButton;
