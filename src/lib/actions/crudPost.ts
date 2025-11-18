'use server'

// import { postSchema } from "@/validations/post"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { saveImage } from "@/lib/image"

type ActionState = {
    success: boolean
    errors: Record<string, string[]>
}

export const createPost = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    const title = await formData.get('title') as string
    const content = await formData.get('content') as string
    const topImageInput = await formData.get('topImage')
    const topImage =  topImageInput instanceof File ? topImageInput : null

    const imageUrl = topImage ? await saveImage(topImage) : null
    if(topImage && !imageUrl) {
        return { success: false, errors: { image: ['画像の保存に失敗しました']}}
    }
    console.log(title)
    console.log(content)
    console.log(imageUrl)
    await prisma.post.create({
        data: {
            title,
            content,
            topImage: imageUrl,
            published: true,
            authorId: "cmhtuoumv00005l8jniymbaej"
        }
    })

    redirect('/blog')
}

export const updatePost = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {

    // フォームの情報を取得
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const topImage = formData.get('topImage') as string
    // const topImage = topImageInput instanceof File ? topImageInput : null
    const postId = formData.get('postId') as string
    const published = formData.get('published') === 'true'

    // バリデーション
    // const validationResult = postSchema.safeParse({ title, content, topImage})
    // if(!validationResult.success) {
    //     return { success: false, errors: validationResult.error.flatten().fieldErrors}
    // }

    // 画像保存

    // DB更新保存
    await prisma.post.update({
        where: { id: postId },
        data: {
            title,
            content,
            published: true,
            topImage: topImage,
        }
    })

    redirect('/blog')
}