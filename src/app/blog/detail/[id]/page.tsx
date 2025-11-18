import { getPostInfo } from "@/lib/info"
import { enCA } from "date-fns/locale"
import { format } from "date-fns"
import Image from "next/image"
import { notFound } from "next/navigation"
import BackButton from "@/components/layouts/BackButton"

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
            {/* トップ画像 */}
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
            <div className="flex justify-center space-x-6 mt-12">
                <BackButton href="/blog" text="ブログ一覧に戻る" />
                <BackButton href="/" text="ホームに戻る" />
            </div>
        </div>
    )
}

export default PostPage