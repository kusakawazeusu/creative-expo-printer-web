"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({ className, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-transparent py-2 px-4 relative h-[50px] border-2 border-white w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <div className="w-full h-full overflow-hidden rounded-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-[#4fb7e9] h-full w-full flex-1 transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
