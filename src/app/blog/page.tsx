import { getPosts, searchPosts } from "@/lib/post";
import { Post } from "@/types/post";
import Card from "@/components/posts/Card";
import Link from "next/link";

type SearchParams = {
  search?: string;
};

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || "";

  const posts = query
    ? ((await searchPosts(query)) as Post[]) // 記事の型設定(複数)
    : ((await getPosts()) as Post[]); // 記事の型設定(複数)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Article List</h1>
        <Link href="/manage/create">
          <button className="rounded-md
          bg-black text-white
          hover:bg-gray-800 hover:text-gray-200 cursor-pointer transition-all duration-300
          px-3 py-1">
            New
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
            <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
