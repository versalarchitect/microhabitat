import { cn } from "../../lib/utils";

export interface ImageGridItem {
  src: string;
  alt: string;
}

export interface ImageGridProps {
  images: ImageGridItem[];
  cols?: 2 | 3 | 4;
  aspectRatio?: "square" | "video" | "4/3";
  className?: string;
}

export function ImageGrid({
  images,
  cols = 4,
  aspectRatio = "square",
  className,
}: ImageGridProps) {
  const colsClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    "4/3": "aspect-[4/3]",
  };

  return (
    <div className={cn("grid gap-4", colsClass[cols], className)}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className={cn(aspectClass[aspectRatio], "rounded-md overflow-hidden")}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  );
}
