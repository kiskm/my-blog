import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const main = async () => {
    // クリーンアップ
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcrypt.hash('password123', 12)


    // ダミー画像URL
    const dummyImages = [
        'https://picsum.photos/seed/post1/600/400',
        'https://picsum.photos/seed/post2/600/400',
    ]
    
    // ユーザー作成
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
            posts: {
                create: [
                    {
                        title: 'テスト１',
                        category: 'diary',
                        content: 'テストテストテストテストテストテストテストテストテストテストテスト',
                        topImage: dummyImages[0],
                        published: true
                    },{
                        title: '虚無',
                        category: 'diary',
                        content: 'それが虚無ならば虚無自身がこのとほりで　ある程度まではみんなに共通いたします　（すべてがわたくしの中のみんなであるやうに　みんなのおのおののなかのすべてですから）',
                        topImage: dummyImages[1],
                        published: true
                    }
                ]

            }
        }
    })

    console.log({user})
}

main()
    .catch((e)=> {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })