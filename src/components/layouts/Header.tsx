'use client'
import { usePathname } from "next/navigation"

const Header = () => {
    const currentUrl = usePathname()
    return (
        <div>
            { currentUrl === "/" ?
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
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
            <header className="z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-3xl font-bold bg-purple-600 bg-clip-text text-transparent">
                        け
                    </div>
                    <div>
                        <a href="/blog" className="hover:text-purple-900 transition-all duration-300">ブログ</a>
                    </div>
                </div>
            </header>
            }
        </div>
    )
}

export default Header