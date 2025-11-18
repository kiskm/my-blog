'use client'
import { createPost } from "@/lib/actions/crudPost"
import { useActionState, useState } from "react"

const AdminCreatePage = () => {
    const [ content, setContent ] = useState('')
    const [ contentLength, setContentLength ] = useState(0)
    const [ title, setTitle ] = useState('')
    const [ state, formAction, isPending ] = useActionState(createPost, {
            success: false, errors: {}
    })

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setContentLength(value.length)
}

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
            <form action={formAction} className="space-y-4">
                {/* タイトル */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="title">タイトル</label>
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
                <div>
                    <label htmlFor="topImage">トップ画像</label>
                    <input type="file" id="topImage" accept="image/*" name="topImage"/>
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.topImage.join(',')}</p>
                    )}
                </div>
                {/* 内容 */}
                <div className="flex flex-col space-y-1">
                    <label htmlFor="content">内容</label>
                    <textarea className="w-full border p-2 min-h-80"
                    id="content" name="content" placeholder="内容を入力"
                    value={content} onChange={handleContentChange}
                    />
                    {state.errors.content && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.content.join(',')}</p>
                    )}
                </div>
                <div className="text-right text-sm text-gray-500 mt-1">
                    文字数: {contentLength}
                </div>
                {/* 投稿ボタン */}
                <button type="submit" disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded" >
                    {isPending ? '投稿中...' : '投稿する'}
                </button>
            </form>
        </div>
    )
}

export default AdminCreatePage