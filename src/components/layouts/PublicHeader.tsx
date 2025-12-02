'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import HeaderButton from "./HeaderButton"

const PublicHeader = () => {
    const currentUrl = usePathname()
    return (
        <div>
            { currentUrl === "/" ? (
            // ホーム用
            <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-blue-100 to-purple-100
            backdrop-blur-md border-b border-gray-200/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" 
                    className="text-3xl font-bold 
                    bg-purple-600 bg-clip-text text-transparent
                    hover:text-sky-500 transition-all duration-300"
                    >
                        け
                    </Link>
                    
                    <HeaderButton href="/blog" label="ブログ" />
                </div>
            </header>
            ) : (
            // ホーム以外用　fixedを入れず、最上部に固定する
            <header className="z-50 bg-linear-to-r from-blue-100 to-purple-100
            backdrop-blur-md border-b border-gray-200/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" 
                    className="text-3xl font-bold 
                    bg-purple-600 bg-clip-text text-transparent
                    hover:text-sky-500 transition-all duration-300"
                    >
                        け
                    </Link>
                    <div className="flex items-center justify-between">
                        {currentUrl !== "/blog" && (
                        <HeaderButton href="/blog" label="ブログ" />
                        )}
                        <HeaderButton href="/login" label="ログイン" />
                    </div>
                </div>
            </header>
            )}
        </div>
    )
}

export default PublicHeader