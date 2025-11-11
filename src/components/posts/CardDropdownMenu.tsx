'use client'
import Link from 'next/link'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const CardDropdownMenu = ({postId}: {postId: string}) => {
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)

    return (
        <>
            <button className="absolute top-2 right-3" onClick={() => {setIsDropdownOpen(!isDropdownOpen)}}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            {isDropdownOpen && (
                <div className="absolute top-10 right-2 bg-white rounded-lg shadow-lg z-10 min-w-5 overflow-hidden transition-opacity duration-500">
                    <Link href={`/manage/${postId}/edit/`} className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b-1">
                    編集
                    </Link>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b-1">
                    削除
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b-1">
                    共有
                    </button>
                </div>
            )}
        </>
    )
}

export default CardDropdownMenu;