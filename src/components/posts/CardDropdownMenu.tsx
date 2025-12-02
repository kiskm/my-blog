'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { deletePost } from '@/lib/actions/crudPost';
import DeleteConfirmModal from './DeleteConfirmModal';

const CardDropdownMenu = ({
    postId, postTitle, authorId, userId
    }: {
        postId: string, postTitle: string, authorId: string, userId: string
    }) => {
    // 状態管理
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)

    // メニューの領域外をクリックした時、メニューを閉じる
    const menuRef = useRef<HTMLDivElement>(null)
    useEffect(()=> {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        if (isDropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    // 削除ボタン押下時の処理
    const handleDeleteClick = () => {
        setIsDropdownOpen(false); // ドロップダウンを閉じる
        setIsDeleteModalOpen(true); // モーダルを開く
    }
    
    // 削除確認後の処理
    const handleDeleteConfirm = async () => {
        // 削除処理
        await deletePost(postId)
        setIsDeleteModalOpen(false)
    }

    return (
        <nav ref={menuRef}>
            <button className="absolute top-2 right-3 cursor-pointer group" onClick={() => {setIsDropdownOpen(!isDropdownOpen)}}>
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute inset-0
                    bg-gray-200 rounded-full
                    opacity-0 group-hover:opacity-80 transition duration-200"></div>
                    <FontAwesomeIcon icon={faEllipsisVertical} className="z-10" />
                </div>
            </button>
            {isDropdownOpen && (
                <div 
                className="absolute top-10 right-2
                bg-white rounded-lg shadow-lg z-10 min-w-5
                overflow-hidden transition-all duration-100
                animate-in fade-in">
                    {authorId == userId && (
                        <>
                            <Link href={`/manage/${postId}/edit/`} className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b">
                            編集
                            </Link>
                            <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 border-b"
                            onClick={handleDeleteClick}>
                            削除
                            </button>
                        </>
                    )}
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
        </nav>
    )
}

export default CardDropdownMenu;