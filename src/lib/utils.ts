import { Post } from "#site/content";
import { type ClassValue, clsx } from "clsx";
import { slug } from "github-slugger";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Categories {
  [key: string]: string[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllCategories(posts: Array<Post>) {
  const categories: Record<string, number> = {};
  posts.forEach((post) => {
    post.categories?.forEach((categorie) => {
      categories[categorie] = (categories[categorie] ?? 0) + 1;
    });
  });
  return categories;
}

export function getCategories(posts: Array<Post>): Categories {
  const categories: Record<string, Set<string>> = {}; // Set을 사용하여 중복 제거

  posts.forEach((post) => {
    const paths = post.categories?.filter((c) => c); // 빈 값 제거 및 구조분해

    if (paths && paths.length > 1) {
      // 첫 번째 경로(최상위 카테고리)를 key로, 두 번째 경로를 value로 사용
      const [topLevelCategory, secondLevelCategory] = paths;

      if (!categories[topLevelCategory]) {
        categories[topLevelCategory] = new Set(); // 중복 방지를 위해 Set 사용
      }

      categories[topLevelCategory].add(secondLevelCategory);
    } else if (paths && paths.length === 1) {
      // 하위 카테고리 없이 최상위 카테고리만 있는 경우 처리
      const [topLevelCategory] = paths;

      if (!categories[topLevelCategory]) {
        categories[topLevelCategory] = new Set();
      }
    }
  });

  // Set을 배열로 변환하여 최종 객체 구성
  const result: Categories = {};
  Object.keys(categories).forEach((key) => {
    result[key] = [...categories[key]];
  });

  return result;
}

export function sortCategoryByCount(categories: Record<string, number>) {
  return Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

export function getPostsByCategorySlug(
  posts: Array<Post>,
  category?: string,
  categories?: string[]
): Array<Post> {
  let filteredPosts = posts.filter((post) => {
    if (!post.published) return false;
    if (!post.categories) return false;

    const slugifiedCategories = post.categories.map((categoryName) =>
      slug(categoryName)
    );

    // category 매개변수를 사용하는 경우
    if (category) {
      return slugifiedCategories.includes(slug(category));
    }

    // categories 매개변수를 사용하는 경우
    if (categories) {
      if (categories.length === 1) {
        // categories 배열의 길이가 1인 경우
        return slugifiedCategories.includes(slug(categories[0]));
      } else if (categories.length >= 2) {
        // categories 배열의 길이가 2 이상인 경우 (여기서는 최대 2개라고 가정)
        const firstCategorySlug = slug(categories[0]);
        const secondCategorySlug = slug(categories[1]);
        if (categories[1] === "all") {
          return slugifiedCategories.includes(slug(categories[0]));
        } else {
          return (
            slugifiedCategories.includes(firstCategorySlug) &&
            slugifiedCategories.includes(secondCategorySlug)
          );
        }
      }
    }

    // 아무 조건도 충족하지 않는 경우, 해당 포스트는 필터링에서 제외
    return false;
  });
  //날짜순으로 포스트 정렬
  return sortPosts(filteredPosts);
}
