'use server'
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { saveImage } from "@/lib/image"
import { postSchema } from "@/validations/post"

type ActionState = {
    success: boolean
    errors: Record<string, string[]>
}

export const createPost = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    // フォームの情報の取得
    const title = await formData.get('title') as string
    const content = await formData.get('content') as string
    const topImageInput = await formData.get('topImage')
    const topImage =  topImageInput instanceof File ? topImageInput : null
    const imageUrl = topImage ? await saveImage(topImage) : null
    if(topImage && !imageUrl) {
        return { success: false, errors: { image: ['画像の保存に失敗しました']}}
    }
    // 公開設定をオフするとnullが送信される
    const published = formData.get('published') === 'true'

    // バリデーション
    const validationResult = postSchema.safeParse({ title, content, topImage })
    if(!validationResult.success) {
        return { success: false, errors: validationResult.error.flatten().fieldErrors }
    }

    // 投稿データの登録
    await prisma.post.create({
        data: {
            title,
            content,
            topImage: imageUrl,
            published,
            // authorId: "cmhtuoumv00005l8jniymbaej"
            authorId: "abcdefghijklmnopqrstuvwxy"
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
    const topImageInput = formData.get('topImage')
    const topImage = topImageInput instanceof File ? topImageInput : null
    const postId = formData.get('postId') as string
    // 公開設定をオフするとnullが送信される
    const published = formData.get('published') === 'true'
    const oldImageUrl = formData.get('oldImageUrl') as string

    // バリデーション
    const validationResult = postSchema.safeParse({ title, content, topImage})
    if(!validationResult.success) {
        return { success: false, errors: validationResult.error.flatten().fieldErrors}
    }

    // 画像保存
    let imageUrl = oldImageUrl
    if(topImage instanceof File && topImage.size > 0 && topImage.name !== 'undefined') {
        // ファイル形式の情報をsaveImageで渡してURLのパスを取得する
        const newImageUrl = await saveImage(topImage)
        if(!newImageUrl) {
            return { success: false, errors: { image: ['画像の保存に失敗しました']}}
        }
        imageUrl = newImageUrl
    }

    // データの更新
    await prisma.post.update({
        where: { id: postId },
        data: {
            title,
            content,
            published,
            topImage: imageUrl,
        }
    })

    redirect('/blog')
}