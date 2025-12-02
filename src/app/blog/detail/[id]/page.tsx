'use server'
import { getPostInfo } from "@/lib/info"
import { notFound } from "next/navigation"
import PostDetail from "@/components/posts/PostDetail"
import type { Metadata } from "next"
import { auth } from "@/auth"

// 型指定
type Params = {
    params: Promise<{id: string}>
}

// メタデータ
export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { id } = await params
    const post = await getPostInfo(id)
    return {
        title: post?.title
    }
}

const PostPage = async ({ params }: Params) => {
    const session = await auth()

    const { id } = await params
    const post = await getPostInfo(id)
    if (!post) {
        notFound()
    }
    return (
        <PostDetail post={post} userId={session?.user?.id} />
    )
}

export default PostPage