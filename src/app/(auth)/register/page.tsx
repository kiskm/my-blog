import RegisterUserForm from '@/components/auth/RegisterUserForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ユーザーの新規登録',
    description: 'Create New User',
}

const Register = () => {
    return (
        <RegisterUserForm />
    )
}

export default Register;