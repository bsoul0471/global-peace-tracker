"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": `${angle}deg`,
      top: -5,
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
      animationDuration: `${Math.random() * (maxDuration - minDuration) + minDuration}s`,
    } as React.CSSProperties));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full bg-foreground/20 shadow-[0_0_0_1px_hsl(var(--foreground)/0.05)]",
            "before:content-[''] before:absolute before:top-1/2 before:-z-10 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-foreground/30 before:to-transparent",
            className
          )}
          style={style}
        />
      ))}
    </>
  );
};
