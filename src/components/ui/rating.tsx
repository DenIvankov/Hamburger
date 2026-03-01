"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingProps = {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Rating({
  value,
  max = 5,
  size = "sm",
  className,
}: RatingProps) {
  const percent = Math.max(0, Math.min(value / max, 1)) * 100;

  // размеры как в shadcn
  const pixelSize = size === "sm" ? 14 : size === "lg" ? 22 : 18;

  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {/* пустая */}
      <Star
        style={{ width: pixelSize, height: pixelSize }}
        className="text-gray-300"
      />

      {/* заполнение */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        <Star
          style={{ width: pixelSize, height: pixelSize }}
          className="fill-yellow-400 text-yellow-400"
        />
      </div>
    </div>
  );
}
