import { getPostInfo } from "@/lib/info"
import { notFound } from "next/navigation"
import PostDetail from "@/components/posts/PostDetail"

// 型指定
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
        <PostDetail post={post} />
    )
}

export default PostPage