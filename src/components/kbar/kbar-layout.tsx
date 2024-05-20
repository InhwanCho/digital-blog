'use client';

import { KBarAnimator, KBarPortal, KBarPositioner, KBarSearch, KBarProvider, Action } from "kbar";
import RenderResults from "@/components/kbar/kbar-result";
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes';
import toast from "react-hot-toast";
import {
  FaHome,
  FaBook,
  FaSun,
  FaMoon,
  FaSearch,
} from "react-icons/fa";
import { posts } from "#site/content";
import { formatDate } from "@/lib/utils";

export default function KbarLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const searchIndex = posts.map(post => ({
    id: post.slug,
    name: post.title,
    subtitle: formatDate(post.date),
    perform: () => router.push('/' + post.slug),
    parent: "post",
    section: 'post',
  }));

  const actions: Action[] = [
    {
      id: "homeAction",
      name: "Home",
      shortcut: ["h"],
      keywords: "back",
      section: "Navigation",
      perform: () => router.push("/"),
      icon: <FaHome className="w-6 h-6 mx-3" />,
      subtitle: "메인페이지로 이동하기",
    },
    {
      id: "aboutAction",
      name: "About",
      shortcut: ["a"],
      keywords: "about",
      section: "Navigation",
      icon: <FaBook className="w-6 h-6 mx-3" />,
      perform: () => router.push("/about"),
      subtitle: "About 페이지로 이동하기",
    },
    {
      id: "post",
      name: "Search Post",
      keywords: "serach articles",
      section: "post",
      icon: <FaSearch className="w-6 h-6 mx-3" />,
      subtitle: "포스트 살펴보기",
    },
    {
      id: "darkTheme",
      name: "Dark",
      keywords: "dark theme",
      shortcut: ["d"],
      section: "Theme",
      perform: () => {
        setTheme("dark");
        toast.success(`테마가 다크모드로 변경되었습니다.`, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      },
      icon: <FaMoon className="w-6 h-6 mx-3" />,
      subtitle: "다크모드로 변경하기",
    },
    {
      id: "lightTheme",
      name: "Light",
      keywords: "light theme",
      shortcut: ["l"],
      section: "Theme",
      perform: () => {
        setTheme("light");
        toast.success(`테마가 라이트모드로 변경되었습니다.`, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      },
      icon: <FaSun className="w-6 h-6 mx-3" />,
      subtitle: "라이트모드로 변경하기",
    },
  ];
  const combinedActions = actions.concat(searchIndex);

  return (
    <KBarProvider actions={combinedActions} >
      <KBarPortal>
        <KBarPositioner className="pointer-events-none fixed inset-0 h-full w-full bg-white/60 backdrop-blur-sm dark:bg-black/50">
          <KBarAnimator className="max-w-3xl w-full sm:w-1/2 overflow-hidden rounded-lg shadow-xl border bg-slate-100 dark:bg-slate-900"
            style={{ boxShadow: '0 16px 70px rgb(0 0 0 / 20%)' }}>
            <KBarSearch className="bg-slate-100 dark:bg-slate-900 w-full border-none px-6 py-4  text-slate-600 outline-none placeholder:text-slate-400" 
              defaultPlaceholder="검색어를 입력해주세요."/>
            <div className="kbar-scrollbar pb-4 mt-2">
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}