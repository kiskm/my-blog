'use server';

import { signIn } from '@/auth';
import { loginSchema } from '@/validations/user';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation'



type AuthState = {
    success: boolean
    errors: {
        email?: string[]
        password?: string[]
        general?: string[]
    }
}

export const authenticate = async (
    prevState: AuthState,
    formData: FormData,
): Promise<AuthState> => {
    // バリデーション
    const validatedFields = loginSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
    })

    // バリデーションエラー
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    // 認証処理
    try {
        await signIn('credentials', {
        email,
        password,
        redirect: false
        });

    } catch (error) {
        if (error instanceof AuthError) {
        switch (error.type) {
            case 'CredentialsSignin':
                return {
                    success: false,
                    errors: {
                        general: ['メールアドレスまたはパスワードが正しくありません。']
                    },
                }
            default:
                return {
                    success: false,
                    errors: {
                        general: ['ログインに失敗しました。もう一度お試しください。']
                    }
                }
            }
        }
    }
    // 認証成功時にリダイレクト
    redirect('/blog')
}