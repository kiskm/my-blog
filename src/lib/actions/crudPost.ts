'use server'
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { saveImage } from "@/lib/image"
import { postSchema } from "@/validations/post"
import { error } from "console"
import { auth } from "@/auth"

type ActionState = {
    success: boolean
    errors: Record<string, string[]>
}

// 記事の作成
export const createPost = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    // フォームの情報の取得
    const title = await formData.get('title') as string
    const category = await formData.get('category') as string
    const content = await formData.get('content') as string
    const topImageInput = await formData.get('topImage')
    // topImageがFileオブジェクトかつ中身が空でないかを判定
    const topImage = ( topImageInput instanceof File && topImageInput.size > 0 ) ? topImageInput : null
    const imageUrl = topImage ? await saveImage(topImage) : null
    if(topImage && !imageUrl) {
        return { success: false, errors: { image: ['画像の保存に失敗しました']}}
    }

    // 公開設定をオフするとnullが送信される
    const published = formData.get('published') === 'on'

    // バリデーション
    const validationResult = postSchema.safeParse({ title, content, topImage })
    if(!validationResult.success) {
        return { success: false, errors: validationResult.error.flatten().fieldErrors }
    }

    const session = await auth();
    const userId = session?.user?.id
    if(!session?.user?.email || !userId) {
        throw new Error('不正なリクエスト')
    }

    // データの登録
    await prisma.post.create({
        data: {
            title,
            category,
            content,
            topImage: imageUrl,
            published,
            authorId: userId
        }
    })

    redirect('/blog')
}

// 記事の更新
export const updatePost = async (
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> => {

    // フォームの情報を取得
    const title = formData.get('title') as string
    const category = await formData.get('category') as string
    const content = formData.get('content') as string
    const deleteImage = formData.get('deleteImage') === 'true'
    const topImageInput = formData.get('topImage')
    // topImageがFileオブジェクトかつ中身が空でないかを判定
    const topImage = ( topImageInput instanceof File && topImageInput.size > 0 ) ? topImageInput : null
    const postId = formData.get('postId') as string
    // 公開設定をオフするとnullが送信される
    const published = formData.get('published') === 'on'
    const oldImageUrl = formData.get('oldImageUrl') as string

    // バリデーション
    const validationResult = postSchema.safeParse({ title, content, topImage})
    if(!validationResult.success) {
        return { success: false, errors: validationResult.error.flatten().fieldErrors}
    }

    // 画像保存
    // 画像削除のフラグがtrueの場合、nullにする
    let imageUrl = oldImageUrl
    if (deleteImage) {
        imageUrl = ''
    } else if (topImage instanceof File && topImage.size > 0 && topImage.name !== 'undefined') {
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
            category,
            content,
            published,
            topImage: imageUrl,
        }
    })

    redirect('/blog')
}

// 記事の削除
export const deletePost = async (postId: string)
: Promise<ActionState> => {
    // データの削除
    await prisma.post.delete({
        where: {id: postId}
    })

    redirect('/blog')
}