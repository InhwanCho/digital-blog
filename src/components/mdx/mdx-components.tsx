import * as runtime from "react/jsx-runtime";
import { Callout } from "@/components/mdx/callout";
import dynamic from 'next/dynamic';
// import CodeBlock from "@/components/mdx/mdx-code-block";
import { MdxImage } from "@/components/mdx/mdx-image";
import { MdxVideo } from "@/components/mdx/mdx-video";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const CodeBlock = dynamic(() => import('@/components/mdx/mdx-code-block'), {
  ssr: false, // 클라이언트 사이드에서만 렌더링
});

const components = {
  pre: CodeBlock,
  // Image,
  Callout,
  MdxImage,
  MdxVideo
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
