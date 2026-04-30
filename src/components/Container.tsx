import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export default function Container({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

