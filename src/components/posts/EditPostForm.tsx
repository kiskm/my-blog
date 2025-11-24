'use client'
import { updatePost } from '@/lib/actions/crudPost';
import Image from 'next/image';
import React, { useActionState, useState } from 'react'
import BackButton from '../layouts/BackButton';

// propsで受け取る 型指定
type EditPostFormProps = {
    post: {
        id: string;
        title: string;
        category: string;
        content: string;
        topImage?: string | null
        published: boolean
    }
}

const EditPostForm = ({post}: EditPostFormProps) => {
    const [ category, setCategory ] = useState(post.category)
    const [ content, setContent ] = useState(post.content)
    const [ contentLength, setContentLength ] = useState(post.content.length)
    const [ published, setPublished ] = useState(post.published)
    const [ imagePreview, setImagePreview ] = useState(post.topImage)
    const [ title, setTitle ] = useState(post.title)
    const [ isImageDeleted, setIsImageDeleted ] = useState(false)
    const [ state, formAction, isPending ] = useActionState(updatePost, {
            success: false, errors: {}
    })

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // プレビュー用URL生成 ブラウザのメモリに保存される
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
            setIsImageDeleted(false)
        }
    }

    const handleImageDelete = () => {
        setImagePreview(null)
        setIsImageDeleted(true)
        const fileInput = document.getElementById('topImage') as HTMLInputElement
        if (fileInput) {
            fileInput.value = ''
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 見出し */}
            <h1 className="text-2xl font-bold mb-4">{post?.title}の編集</h1>
            <form action={formAction} className="space-y-4">
                {/* タイトル */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="title" className="font-bold">タイトル</label>
                    <input
                    className="rounded-md border hover:shadow-2xl h-10"
                    type="text" id="title" name="title" placeholder="タイトルを入力"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    {state.errors.title && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.title.join(',')}</p>
                    )}
                </div>
                {/* トップ画像 */}
                <label htmlFor="topImage" className="font-bold">トップ画像</label>
                <input 
                type="file"
                id="topImage" 
                accept="image/*" 
                name="topImage"
                onChange={handleImageChange}
                />
                {imagePreview && (
                        <div className="mt-2">
                            <Image
                                src={imagePreview}
                                alt={post.title}
                                width={0}
                                height={0}
                                sizes="200px"
                                className="w-[200px] rounded"
                                priority
                            />
                            <button
                                type="button"
                                onClick={handleImageDelete}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                画像を削除
                            </button>
                        </div>
                    )}
                {state.errors.topImage && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.topImage.join(',')}</p>
                )}
                
                {/* カテゴリー */}
                <div className="flex flex-col space-y-2 w-fit">
                    <label htmlFor="category" className="font-bold">
                        カテゴリー
                    </label>
                    <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                        className='py-1 px-2 rounded-md border'>
                        <option value="">--1 つ選択してください--</option>
                        <option value="development">開発</option>
                        <option value="diary">日記</option>
                    </select>
                </div>

                {/* 内容 */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="content" className="font-bold">内容</label>
                    <textarea className="w-full border p-2 min-h-80"
                    id="content" name="content" placeholder="内容を入力"
                    value={content} onChange={handleContentChange}
                    />
                    {state.errors.content && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.content.join(',')}</p>
                    )}
                </div>

                {/* 内容の文字数カウンター */}
                <div className="text-right text-sm text-gray-500 mt-1">
                    文字数: {contentLength}
                </div>

                {/* 公開設定 */}
                <div>
                    <label htmlFor="published" className="relative inline-block w-14 h-8 cursor-pointer">
                    <input 
                        type="checkbox"
                        name="published"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="sr-only peer"
                    />
                    <span className="absolute inset-0 bg-gray-300 rounded-full transition peer-checked:bg-blue-500"></span>
                    <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-6"></span>
                    </label>
                </div>

                {/* ボタン */}
                <div className="flex justify-center space-x-2 mt-6">
                    <button type="submit" disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded" >
                        {isPending ? '更新中...' : '更新する'}
                    </button>
                    <BackButton href="/blog" text="ブログ一覧に戻る" />
                </div>

                {/* 受信データの保持 */}
                <input type="hidden" name="postId" value={post.id} />
                <input type="hidden" name="oldImageUrl" value={post.topImage || ''} />
                <input type="hidden" name="deleteImage" value={isImageDeleted ? 'true' : 'false'} />
            </form>
        </div>
    )
}

export default EditPostForm