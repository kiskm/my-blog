import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({   
    // セッションの設定
    session: {
        strategy: "jwt", // JWT使用(デフォルト)
        maxAge: 30 * 24 * 60 * 60, // 30日間有効
    },
    
    // 認証プロバイダーの指定
    providers: [
        Credentials({
            // Credentials(メール・パスワード)の使用
            name: "Credentials", // プロバイダー名
            credentials: {
                email: {
                    label: "Email", // フォームのラベル
                    type: "email",  // inputのtype属性
                    placeholder: "user@example.com" // オプション
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "パスワードを入力",
                }
            },
            // 認証処理
            authorize: async (credentials) => {
                // 入力値のチェック
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("メールアドレスとパスワードを入力してください")
                }

                try {
                    // ユーザー検索
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string }
                    })

                    if (!user) throw new Error("メールアドレスまたはパスワードが正しくありません")

                    // パスワードの検証
                    const isValid =  await bcrypt.compare(
                            credentials.password as string, // 平文パスワード
                            user.password                   // ハッシュ化パスワード
                    )

                    if (!isValid) throw new Error("メールアドレスまたはパスワードが正しくありません")

                    // 認証成功・ユーザー情報を返す
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    }
                // エラー
                } catch (error) {
                    console.error("認証エラー:", error)
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: '/login',
    },

    // コールバック
    callbacks: {
        // トークンにユーザー情報を追加
        async jwt({ token, user }) {
            // ログイン時にuserが渡される
            if (user) {
                // それ以降はtokenのみ
                token.id = user.id
            }
            return token
        },
        // セッションにユーザー情報を追加
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
        return session
        },
    },
})