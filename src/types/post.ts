export type Post = {
    id: string
    title: string
    category: string
    content: string
    topImage: string | null
    createdAt: Date
    author: {
        name: string
    }
}

export type PostCardProps = { post: Post }