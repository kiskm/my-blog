'use client'
import Link from 'next/link'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { deletePost } from '@/lib/actions/crudPost';
import DeleteConfirmModal from './DeleteConfirmModal';

const CardDropdownMenu = ({postId, postTitle}: {postId: string, postTitle: string}) => {
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)

    const handleDeleteClick = () => {
        setIsDropdownOpen(false); // ドロップダウンを閉じる
        setIsDeleteModalOpen(true); // モーダルを開く
    }
    
    const handleDeleteConfirm = async () => {
        // 削除処理
        await deletePost(postId)
        setIsDeleteModalOpen(false)
    }

    return (
        <>
            <button className="absolute top-2 right-3 cursor-pointer" onClick={() => {setIsDropdownOpen(!isDropdownOpen)}}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            {isDropdownOpen && (
                <div 
                className="absolute top-10 right-2
                bg-white rounded-lg shadow-lg z-10 min-w-5
                overflow-hidden transition-all duration-200
                animate-in fade-in">
                    <Link href={`/manage/${postId}/edit/`} className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b">
                    編集
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 border-b"
                    onClick={handleDeleteClick}>
                    削除
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b">
                    共有
                    </button>
                </div>
            )}
            {/* 確認モーダル */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={postTitle}
            />
        </>
    )
}

export default CardDropdownMenu;