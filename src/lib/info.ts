import { prisma } from "@/lib/prisma"

export const getPostInfo = async (postId: string) => {
    return await prisma.post.findFirst({
        where: {
            AND: [
                // { authorId: userId },
                { id: postId }
            ]
        },
        select: {
            id: true,
            title: true,
            category: true,
            content: true,
            topImage: true,
            author: true,
            published: true,
            createdAt: true,
            updatedAt: true
        }
    })
}