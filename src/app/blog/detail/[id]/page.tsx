import { getPostInfo } from "@/lib/info"
import { enCA } from "date-fns/locale"
import { format } from "date-fns"
import Image from "next/image"
import { notFound } from "next/navigation"
import BackButton from "@/components/layouts/BackButton"
import { getCategory } from "@/constants/category"

type Params = {
    params: Promise<{id: string}>
}

const PostPage = async ({ params }: Params) => {
    const { id } = await params
    const post = await getPostInfo(id)
    if (!post) {
        notFound()
    }
    return (
        <div className="container mx-auto px-4 py-8 space-y-4">
            {/* トップ画像 */}
            {post.topImage ? (
            // 画像あり
            <div className="relative w-full h-80">
                <Image src={post.topImage}
                alt={post.title}
                fill
                sizes="100vw"
                className="rounded-t-md object-cover"
                priority
            />
                </div>
            ) : (
                <div className="relative w-full h-80 bg-white border rounded-t-md text-lg flex items-center justify-center">
                    画像なし
                </div>
            )}

            {/* 投稿者名・投稿時間 */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    投稿者: { post.author.name }
                </p>
                <time className="text-sm text-gray-500">
                    {format(new Date(post.createdAt), 'yyyy/MM/dd', { locale: enCA })}
                </time>
            </div>

            {/* カテゴリー */}
            <div className="w-fit">
                <div className="rounded-lg bg-blue-200 text-xs py-1 px-2">
                    {getCategory(post.category)}
                </div>
            </div>

            {/* タイトル */}
            <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
            
            {/* 投稿内容 */}
            <div className="prose max-w-none">
                {post.content}
            </div>

            {/* 戻るボタン */}
            <div className="flex justify-center space-x-6 mt-12">
                <BackButton href="/blog" text="ブログ一覧に戻る" />
                <BackButton href="/" text="ホームに戻る" />
            </div>
        </div>
    )
}

export default PostPage