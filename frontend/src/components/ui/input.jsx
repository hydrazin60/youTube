import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-zinc-500 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-white " + // base styling
          "focus:outline-none focus:ring-0 focus:border-blue-500", // focus styling
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
