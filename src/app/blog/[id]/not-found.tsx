'use client'
import { redirect } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {

    useEffect(() => {
        setTimeout(() => {
            redirect('/blog')
        }, 3 * 1000)
    })

    return (
        <div className="p-50 w-full text-center text-lg">
            お探しの記事は存在しないか、削除された可能性があります。<br />
            数秒後にブログ一覧に戻ります。
        </div>
    )
}

export default NotFound;