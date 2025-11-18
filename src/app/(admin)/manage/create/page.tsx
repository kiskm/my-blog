'use client'
import BackButton from "@/components/layouts/BackButton"
import ToggleButton from "@/components/ui/ToggleButton"
import { createPost } from "@/lib/actions/crudPost"
import { useActionState, useState } from "react"

const AdminCreatePage = () => {
    const [ content, setContent ] = useState('')
    const [ contentLength, setContentLength ] = useState(0)
    const [ title, setTitle ] = useState('')
    const [ published, setPublished ] = useState(true)
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
            <form action={formAction} className="space-y-6">
                {/* タイトル */}
                <div className="flex flex-col space-y-2 w-fit">
                    <label htmlFor="title" className="font-bold">タイトル</label>
                    <input
                    className="rounded-md border h-10 px-2"
                    type="text" id="title" name="title" placeholder="タイトルを入力"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    {state.errors.title && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.title.join(',')}</p>
                    )}
                </div>
                {/* トップ画像 */}
                {/* <div className="flex flex-col space-y-2">
                    <label htmlFor="topImage" className="font-bold">トップ画像</label>
                    <input type="file" id="topImage" accept="image/*" name="topImage"/>
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.topImage.join(',')}</p>
                    )}
                </div> */}
                <div className="flex flex-col space-y-2 w-fit">
                    <label htmlFor="topImage" className="font-bold">
                        トップ画像
                    </label>
                    <input
                        type="file"
                        id="topImage"
                        name="topImage"
                        accept="image/*"
                        className="hidden"
                    />
                    <label
                        htmlFor="topImage"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition"
                    >
                        画像を選択
                    </label>
                </div>
                {/* 内容 */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="content" className="font-bold">内容</label>
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

                {/* 公開設定 */}
                <ToggleButton checked={published} onChange={setPublished} label="published"/>

                {/* 投稿ボタン */}
                <div className="flex justify-center space-x-6 mt-12">
                    <BackButton href="/blog" text="ブログ一覧に戻る" />
                    <button type="submit" disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded" >
                        {isPending ? '投稿中...' : '投稿する'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminCreatePage