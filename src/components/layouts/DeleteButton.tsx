'use client'
import Link from 'next/link'

type DeleteButtonProps = {
    id: string,
    text: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton = ( { id, text, onClick }: DeleteButtonProps ) => {
    return (
        <Link key={id} href={`/blog/detail/${id}`}>
            <button
            onClick={onClick}
            className="text-lg border rounded-md px-3 py-2
            bg-red-500 hover:bg-red-600
            transition duration-300 cursor-pointer"
            >
                {text}
            </button>
        </Link>
    )
}

export default DeleteButton