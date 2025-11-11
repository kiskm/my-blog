'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
    const currentUrl = usePathname()
    return (
        <div>
            { currentUrl === "/" ?
            <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-blue-100 to-purple-100 backdrop-blur-md border-b border-gray-200/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-3xl font-bold bg-purple-600 bg-clip-text text-transparent">
                        け
                    </div>
                    <div>
                        <a href="/blog" className="hover:text-purple-900 transition-all duration-300">ブログ</a>
                    </div>
                </div>
            </header>
            :
            // fixedを入れない
            <header className="z-50 bg-linear-to-r from-blue-100 to-purple-100 backdrop-blur-md border-b border-gray-200/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-3xl font-bold bg-purple-600 bg-clip-text text-transparent">
                        け
                    </div>
                    <div className="space-x-12 items-center">
                        <Link href="/" className="hover:text-purple-900 transition-all duration-300">ホーム</Link>
                        <Link href="/blog" className="hover:text-purple-900 transition-all duration-300">ブログ</Link>
                    </div>
                </div>
            </header>
            }
        </div>
    )
}

export default Header