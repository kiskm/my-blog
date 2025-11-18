import { getPostInfo } from "@/lib/info"
import { enCA } from "date-fns/locale"
import { format } from "date-fns"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"

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
        <div className="container mx-auto px-4 py-8">
            {/* ヘッダ画像 */}
            {post.topImage &&
            <div className="relative w-full h-128">
                <Image src={post.topImage}
                alt={post.title}
                fill
                sizes="100vw"
                className="rounded-t-md object-cover"
                priority
            />
                </div>
            }

            {/* 投稿者名・投稿時間 */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                    投稿者: { post.author.name }
                </p>
                <time className="text-sm text-gray-500">
                    {format(new Date(post.createdAt), 'yyyy/MM/dd', { locale: enCA })}
                </time>
            </div>

            {/* タイトル */}
            <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
            
            {/* 投稿内容 */}
            <div className="prose max-w-none">
                {post.content}
            </div>

            {/* 戻るボタン */}
            <div className="flex justify-center space-x-2 mt-12">
                <button className="text-lg border rounded-md px-3 py-2 bg-white">
                    <Link href="/blog">ブログ一覧に戻る</Link>
                </button>
                <button className="text-lg border rounded-md px-3 py-2 bg-white">
                    <Link href="/">ホームに戻る</Link>
                </button>
            </div>
        </div>
    )
}

export default PostPage