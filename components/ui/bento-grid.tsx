"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BentoItem {
  src: string;
  alt: string;
  /** Optional: override the default position in the grid */
  priority?: boolean;
}

export interface BentoGridProps {
  items: BentoItem[];
  /** Layout pattern - determines how items are arranged */
  layout?: "showcase" | "gallery" | "feature";
  className?: string;
}

/**
 * Bento Grid Layout Patterns:
 *
 * "showcase" (default) - 6 items, asymmetric hero layout:
 * ┌─────────────┬──────┬──────┐
 * │             │  2   │  3   │
 * │     1       ├──────┴──────┤
 * │   (2×2)     │      4      │
 * ├──────┬──────┤    (2×1)    │
 * │  5   │  6   │             │
 * └──────┴──────┴─────────────┘
 *
 * "gallery" - 5 items, balanced grid:
 * ┌──────┬──────┬─────────────┐
 * │  1   │  2   │             │
 * │      │      │     3       │
 * ├──────┴──────┤   (2×2)     │
 * │      4      │             │
 * │    (2×1)    ├──────┬──────┤
 * │             │  5   │  (6) │
 * └─────────────┴──────┴──────┘
 *
 * "feature" - 4 items, large hero focus:
 * ┌─────────────────────┬──────┐
 * │                     │  2   │
 * │         1           ├──────┤
 * │       (3×2)         │  3   │
 * │                     ├──────┤
 * │                     │  4   │
 * └─────────────────────┴──────┘
 */

const layoutConfigs = {
  showcase: {
    gridCols: "grid-cols-2 md:grid-cols-4",
    gridRows: "md:grid-rows-[1fr_1fr_1fr]",
    items: [
      { col: "col-span-2", row: "md:row-span-2", aspect: "aspect-square" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-2", row: "md:row-span-2", aspect: "aspect-[2/1] md:aspect-auto" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
    ],
    minItems: 6,
  },
  gallery: {
    gridCols: "grid-cols-2 md:grid-cols-4",
    gridRows: "md:grid-rows-[1fr_1fr_1fr]",
    items: [
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-2", row: "md:row-span-2", aspect: "aspect-square" },
      { col: "col-span-2", row: "md:row-span-2", aspect: "aspect-[2/1] md:aspect-auto" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
    ],
    minItems: 5,
  },
  feature: {
    gridCols: "grid-cols-2 md:grid-cols-4",
    gridRows: "md:grid-rows-3",
    items: [
      { col: "col-span-2 md:col-span-3", row: "row-span-2 md:row-span-3", aspect: "aspect-[4/3] md:aspect-auto" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-1", row: "md:row-span-1", aspect: "aspect-square" },
      { col: "col-span-2 md:col-span-1", row: "md:row-span-1", aspect: "aspect-[2/1] md:aspect-square" },
    ],
    minItems: 4,
  },
};

export function BentoGrid({
  items,
  layout = "showcase",
  className,
}: BentoGridProps) {
  const config = layoutConfigs[layout];
  const displayItems = items.slice(0, config.items.length);

  return (
    <div
      className={cn(
        "grid gap-3 md:gap-4",
        config.gridCols,
        config.gridRows,
        className
      )}
    >
      {displayItems.map((item, idx) => {
        const position = config.items[idx];
        if (!position) return null;

        return (
          <div
            key={idx}
            className={cn(
              "relative overflow-hidden rounded-md border border-border bg-muted",
              position.col,
              position.row,
              position.aspect
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={item.priority || idx === 0}
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes={
                idx === 0
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 50vw, 25vw"
              }
            />
          </div>
        );
      })}
    </div>
  );
}
