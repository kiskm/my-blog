'use client'
import { authenticate } from '@/lib/actions/authenticate'
import Link from 'next/link'
import { useActionState } from 'react'

const LoginForm = () => {
    const [ state, formAction, isPending ] = useActionState(
        authenticate, {
            success: false,
            errors: {}
        }
    )
  return (
    <>
      <form action={formAction} className="space-y-4">
        {/* メールアドレス */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border rounded px-3 py-2"
          />
          { state.errors.email && (
            <p className="text-red-500 text-sm">{state.errors.email.join(',')}</p>
          )}
        </div>

        {/* パスワード */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border rounded px-3 py-2"
          />
          { state.errors.password && (
            <p className="text-red-500 text-sm">{state.errors.password.join(',')}</p>
          )}
        </div>

        {/* その他のエラーメッセージ */}
        {state.errors.general && (
            <p className="text-red-500 text-sm">{state.errors.general.join(',')}</p>
        )}

        {/* 送信ボタン */}
        <button
        type="submit"
        disabled={isPending}
        className="mt-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>

      {/* 新規登録ボタン */}
      <Link href="/register">
        <button className="mt-5 w-full bg-white py-2 rounded border border-b-gray-200 hover:bg-gray-100">
          新規登録
        </button>
      </Link>
    </>
  )
}

export default LoginForm