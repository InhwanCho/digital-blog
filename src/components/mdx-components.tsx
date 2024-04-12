import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "@/components/callout";
import CodeBlock from "./mdx-code-block";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  pre:CodeBlock,
  Image,
  Callout,
};

interface MdxProps {
  code: string;
}
 
export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
