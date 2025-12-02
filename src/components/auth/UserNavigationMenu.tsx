'use client'
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react"

const UserNavigationMenu = ({ userName }: { userName?: string }) => {
    // 状態管理
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)

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

    return (
        <nav ref={menuRef} className="relative">
            <button className="
            px-3 py-1 rounded
            hover:bg-purple-200 transition duration-100 cursor-pointer" onClick={() => {setIsDropdownOpen(!isDropdownOpen)}}>
                {userName}さん
            </button>
            {isDropdownOpen && (
                <div 
                className="
                absolute top-full right-0
                bg-white rounded z-10 whitespace-nowrap border border-gray-200
                transition duration-200 overflow-hidden
                animate-in fade-in">
                    <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: '/login' })}>
                    ログアウト
                    </button>
                </div>
            )}
        </nav>
    )
}

export default UserNavigationMenu

