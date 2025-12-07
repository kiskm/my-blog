import BlogContent from "@/components/posts/contents/BlogContent";
import type { Metadata } from "next";

type SearchParams = {
    search?: string;
};

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'Blog',
}

const Blog = ({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) => {
  return (
    <>
      <BlogContent searchParams={searchParams} />
    </>
  );
};

export default Blog;
