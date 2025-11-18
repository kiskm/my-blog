import Link from 'next/link'
import React from 'react'

type ButtonProps = {
    href: string,
    text: string
}

const BackButton = ( props: ButtonProps ) => {
    return (
        <Link href={`${props.href}`}>
            <button 
            className="text-lg border rounded-md px-3 py-2
            bg-white hover:bg-gray-200
            transition duration-300 cursor-pointer"
            >
                {props.text}
            </button>
        </Link>
    )
}

export default BackButton