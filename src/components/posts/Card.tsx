import { formatDistanceToNow } from "date-fns";
import { enCA } from "date-fns/locale";
import { PostCardProps } from "@/types/post";
import Image from "next/image";
import CardDropdownMenu from "@/components/posts/CardDropdownMenu";
import Link from "next/link";
import { getCategory } from "@/constants/category";

const Card = ({ post }: PostCardProps) => {
  return (
      <div className="relative rounded-xl bg-white border hover:shadow-lg transition-shadow duration-700">
        <div className="flex justify-center">
          {post.topImage ? (
            // 画像あり
            <div className="relative w-full h-48">
              <div className="absolute top-2 left-2 rounded-lg bg-blue-200 text-xs py-1 px-2 z-5">
                {getCategory(post.category)}
              </div>
              <Link key={post.id} href={`/blog/detail/${post.id}`}>
                <Image
                  src={post.topImage}
                  alt={post.title}
                  fill // 画面いっぱいに表示する
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // レスポンシブ対応
                  className="rounded-t-md object-cover" // 上の方の角を丸くする アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小
                  priority // 画像の優先度を高くする
                />
              </Link>
              <CardDropdownMenu postId={post.id} postTitle={post.title} />
            </div>
          ) : (
            // 画像なし
            <div className="relative w-full h-48">
              <div className="absolute top-2 left-2 rounded-lg bg-blue-200 text-xs py-1 px-2 z-5">
                {getCategory(post.category)}
              </div>
              <Link key={post.id} href={`/blog/detail/${post.id}`}>
                <div className="h-48 w-full bg-white rounded-lg text-lg flex items-center justify-center">
                  画像なし
                </div>
              </Link>
              <CardDropdownMenu postId={post.id} postTitle={post.title} />
            </div>
          )}
        </div>
        <Link key={post.id} href={`/blog/detail/${post.id}`}>
          <div className="space-y-2 p-3">
            <div className="mb-2 text-lg font-bold text-gray-700">{post.title}</div>
            <div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author.name}</span>
                <time>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: enCA,
                  })}
                </time>
              </div>
            </div>
          </div>
        </Link>
      </div>
  );
};

export default Card;
