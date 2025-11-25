'use client'
import { Session } from "next-auth"
import Link from "next/link"

const isLoginHeader = ({ session }: {session: Session}) => {
    return (
        <div>
            <header className="z-50 bg-linear-to-r from-blue-100 to-purple-100 backdrop-blur-md border-b border-gray-200/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" 
                    className="text-3xl font-bold 
                    bg-purple-600 bg-clip-text text-transparent
                    hover:text-sky-500 transition-all duration-300"
                    >
                        け
                    </Link>
                    <div className="space-x-12 items-center">
                        <Link href="/blog" className="hover:text-purple-900 transition-all duration-300">ブログ</Link>
                    </div>
                    <div>{session.user?.name}さん</div>
                </div>
            </header>
        </div>
    )
}

export default isLoginHeader