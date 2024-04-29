import { visit } from "unist-util-visit";

// mdx에서 링크(a태그) 새창에서 열기
export default function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && node.properties.href) {
        // 링크가 외부 링크인지 확인합니다 (여기서는 http로 시작하는 것만 검사)
        if (/^https?:\/\//.test(node.properties.href)) {
          node.properties.target = '_blank';
          node.properties.rel = 'noopener noreferrer'; // 보안을 위해 noreferrer 추가
        }
      }
    });
  };
}
