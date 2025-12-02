'use client'
import { enCA } from "date-fns/locale"
import { format } from "date-fns"
import Image from "next/image"
import BackButton from "@/components/layouts/BackButton"
import { getCategory } from "@/constants/category"
import ProceedButton from "@/components/layouts/ProceedButton"
import DeleteButton from "@/components/layouts/DeleteButton"
import { useState } from "react"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { deletePost } from "@/lib/actions/crudPost"

// 型指定
type PostDetailProps = {
    post: {
        id: string;
        title: string;
        category: string;
        content: string;
        topImage?: string | null;
        published: boolean;
        authorId: string;
        author: {
            name: string;
        };
        createdAt: Date;
    };
    userId?: string
};


const PostDetail = ({ post, userId }: PostDetailProps) => {
    // 状態管理
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)

    // 削除確認後の処理
    const handleDeleteConfirm = async () => {
        // 削除処理
        await deletePost(post.id)
        setIsDeleteModalOpen(false)
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-4">
            {/* トップ画像 */}
            {post.topImage ? (
            // 画像あり
            <div className="relative w-full h-80">
                <Image src={post.topImage}
                alt={post.title}
                fill
                sizes="100vw"
                className="rounded-t-md object-cover"
                priority
            />
                </div>
            ) : (
                <div className="relative w-full h-80 bg-white border rounded-t-md text-lg flex items-center justify-center">
                    画像なし
                </div>
            )}

            {/* 投稿者名・投稿時間 */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    投稿者: { post.author.name }
                </p>
                <time className="text-sm text-gray-500">
                    {format(new Date(post.createdAt), 'yyyy/MM/dd', { locale: enCA })}
                </time>
            </div>

            {/* カテゴリー */}
            <div className="w-fit">
                <div className="rounded-lg bg-blue-200 text-xs py-1 px-2">
                    {getCategory(post.category)}
                </div>
            </div>

            {/* タイトル */}
            <div className='flex justify-between items-center space-x-1'>
                <h1 className="text-2xl font-bold my-2">{post?.title}</h1>
                <div className="flex-1 border-b border-gray-300"></div>
            </div>
            
            {/* 投稿内容 */}
            <div className="prose max-w-none">
                {post.content}
            </div>

            {/* ボタン */}
            <div className="flex justify-center space-x-6 mt-12">
                {/* ログイン状態のみ表示 */}
                {userId === post.authorId && (
                    <>
                        {/* 編集ボタン */}
                        <ProceedButton id={post.id} text="記事を編集" />

                        {/* 削除ボタン */}
                        <DeleteButton
                        id={post.id}
                        text="記事を削除"
                        onClick={() => setIsDeleteModalOpen(true)}
                        />
                    </>
                )}
                
                {/* 戻るボタン */}
                <BackButton href="/blog" text="ブログ一覧に戻る" />
                <BackButton href="/" text="ホームに戻る" />
            </div>

            {/* 確認モーダル */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={post.title}
            />
        </div>
    )
}

export default PostDetail