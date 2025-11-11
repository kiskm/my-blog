'use client'
import { updatePost } from '@/lib/actions/crudPost';
import React, { useActionState, useState } from 'react'

// propsで受け取る 型指定
type EditPostFormProps = {
    post: {
        id: string;
        title: string;
        content: string;
        topImage?: string | null
        published: boolean
    }
}

const EditPostForm = ({post}: EditPostFormProps) => {
    const [ content, setContent ] = useState(post.content)
    const [ contentLength, setContentLength ] = useState(post.content.length)
    const [ title, setTitle ] = useState(post.title)
    const [ state, formAction, isPending ] = useActionState(updatePost, {
            success: false, errors: {}
    })

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setContentLength(value.length)
}

    return (
        <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">{post?.title}の編集</h1>
                <form action={formAction} className="space-y-4">
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
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.topImage.join(',')}</p>
                    )}
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
                    <button type="submit" disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded" >
                        {isPending ? '更新中...' : '更新する'}
                    </button>
                    <input type="hidden" name="postId" value={post.id} />
                    <input type="hidden" name="topImage" value={post.topImage || ''} />
                </form>
            </div>
    )
}

export default EditPostForm