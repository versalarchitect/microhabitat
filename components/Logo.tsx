import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

export function Logo({ size = "md", showText = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-md bg-primary flex items-center justify-center relative",
          sizeClasses[size]
        )}
      >
        <Image
          src="/logo.png"
          alt="MicroHabitat"
          fill
          className="object-contain brightness-0 invert p-1"
          sizes={size === "lg" ? "40px" : size === "md" ? "32px" : "24px"}
        />
      </div>
      {showText && (
        <span className={cn("font-medium tracking-tight", textSizeClasses[size])}>
          MicroHabitat
        </span>
      )}
    </div>
  );
}
