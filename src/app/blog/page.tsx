import { getPosts, searchPosts } from "@/lib/post";
import { Post } from "@/types/post";
import Card from "@/components/posts/Card";

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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Article List</h1>
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
