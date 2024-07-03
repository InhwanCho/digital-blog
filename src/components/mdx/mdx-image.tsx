import Image from "next/image";
import { ReactNode } from "react";

interface MdxImageProps {
  src: string;
  alt: string;
  width: number;
  children?: ReactNode;
  location?: "default" | "left"; // "default"는 중앙, "left"는 왼쪽 정렬
  layout?: "fixed" | "responsive" | "intrinsic" | "fill" | "none"
}

export function MdxImage({
  children,
  location = "default",
  src,
  alt,
  width = 600,
  layout,
  ...props
}: MdxImageProps) {
  // 이미지 비율을 유지하기 위한 높이 계산 (16:9 가정)
  const height = width / (16 / 9);

  return (
    <div
      className={`flex ${location === "default" ? "justify-center" : "justify-start"} border rounded-md my-4`}
      {...props}
    >
      <Image
        unoptimized
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout={layout}
        className="my-6"
      />
    </div>
  );
}