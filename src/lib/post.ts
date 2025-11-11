import { prisma } from '@/lib/prisma'

export const getPosts = async () => {
    return await prisma.post.findMany({
        where: { published: true },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getPost = async (id: string) => {
    return await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
}

export const searchPosts = async (search: string) => {
    // エンコードされたURIコンポーネントを元のフォーマットに戻す
    const decodedSearch = decodeURIComponent(search)
    // 全角スペースを半角スペースに変換
    const normalizedSearch = decodedSearch.replace(/[\s　]+/g, ' ').trim()
    // スペースで分割 (空文字などを除外)
    const searchWords = normalizedSearch.split(' ').filter(Boolean)

    const filters = searchWords.map( word => ({
        OR : [
            { title: { contains: word }},
            { content: { contains: word }},
        ]
    }))

    return await prisma.post.findMany({
        where: {
            AND: filters
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}