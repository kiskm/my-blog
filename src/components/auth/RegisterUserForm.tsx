
'use client';

import UserInfoField from '@/components/user/UserInfoField';
import { createUser } from '@/lib/actions/crudUser';
import Link from 'next/link';
import { useActionState, useState } from 'react';import React from 'react'

const RegisterUserForm = () => {
    // 状態管理
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // 送信処理
    const [ state, formAction ] = useActionState(createUser, {
        success: false, errors: {}
    })
    
    return (
        <div className="container mx-auto px-4 py-8">
            {/* 見出し */}
            <h1 className="text-2xl font-bold mb-4">ユーザーの新規登録</h1>
                <form action={formAction} className="space-y-6" noValidate>
                    {/* 名前 */}
                    <UserInfoField
                    label="お名前"
                    value={userName}
                    id="name"
                    type="text"
                    onChange={setUserName}
                    errorMsg={state.errors.name}
                    />

                    {/* メールアドレス */}
                    <UserInfoField
                    value={email}
                    label="メールアドレス"
                    id="email"
                    type="email"
                    onChange={setEmail}
                    errorMsg={state.errors.email}
                    />

                    {/* パスワード */}
                    <UserInfoField
                    label="パスワード"
                    value={password}
                    id="password"
                    type="password"
                    onChange={setPassword}
                    errorMsg={state.errors.password}
                    />

                    {/* パスワード確認用 */}
                    <UserInfoField
                    label="パスワード(確認)"
                    value={confirmPassword}
                    id="confirmPassword"
                    type="password"
                    onChange={setConfirmPassword}
                    errorMsg={state.errors.confirmPassword}
                    />

                    <div className="grid grid-cols-1 space-y-2
                    md:flex md:justify-center md:space-x-6 md:space-y-0 mt-8">
                        {/* 登録ボタン */}
                        <button type="submit" className="mt-5 w-full md:w-fit
                        bg-black text-white px-8 py-2 rounded
                        hover:bg-gray-800 disabled:bg-gray-400 transition duration-100">
                            登録
                        </button>
                        
                        {/* 登録ボタン */}
                        <Link href="/login">
                            <button className="
                            mt-5 w-full md:w-fit bg-white border px-8 py-2 rounded
                            hover:bg-gray-200 transition duration-100">
                                戻る
                            </button>
                        </Link>
                    </div>
                </form>
        </div>
    )
}

export default RegisterUserForm;