'use client'
import { signOut } from "next-auth/react"

const LogoutButton = () => {
    return (
        <button onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-500 text-white px-4 py-2 rounded-md my-3 w-fit"
        >
            ログアウト
        </button>
    )
}

export default LogoutButton