import { JinHeiFont } from "@/fonts/fonts";

function Button({ children, className = "" }) {
  return (
    <button
      className={`${className} ${JinHeiFont.className} bg-[#eb6954] hover:bg-[#e85037] active:bg-[#e64329] text-6xl py-3 px-[60px] rounded-[9999px] transition-all duration-200 text-white`}
    >
      {children}
    </button>
  );
}

export default Button;
