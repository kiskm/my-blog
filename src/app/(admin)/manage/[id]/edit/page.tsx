import EditPostForm from "@/components/posts/EditPostForm"
import { getPostInfo } from "@/lib/info"
import { notFound } from "next/navigation"

// idを引数にする
type Params = {
    params: Promise<{id: string}>
}

const AdminEditPage = async ({ params }: Params) => {
//   const session = await auth()
//         const userId = session?.user?.id
//         if(!session?.user?.email || !userId) {
//             throw new Error('不正なリクエストです')
//         }
//         const { id } = await params
//         const post = await getOwnPost(userId, id)
    
//         if(!post){
//             notFound()
//         }

const { id } = await params
const post = await getPostInfo(id)
        if(!post){
            notFound()
        }

    return (
        <EditPostForm post={post} />
    )
}

export default AdminEditPage