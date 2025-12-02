export type Post = {
    id: string
    title: string
    category: string
    content: string
    topImage: string | null
    createdAt: Date
    authorId: string
    author: {
        name: string
    }
}

export type PostCardProps = { post: Post, userId: string }