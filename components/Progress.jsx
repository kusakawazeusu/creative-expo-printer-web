import { motion } from "motion/react";

function Progress({ className = "", duration = 0.5 }) {
  return (
    <div
      className={`${className} h-[40px] rounded-full border-2 border-white px-4 py-2`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration, ease: "easeOut" }}
        className="transition-all h-full w-full rounded-full bg-[#4fb7e9] "
      />
    </div>
  );
}

export default Progress;
