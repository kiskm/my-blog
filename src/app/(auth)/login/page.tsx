import LoginForm from "@/components/auth/LoginForm"

const LoginPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">ログイン</h1>
            <LoginForm/>
        </div>
    )
}

export default LoginPage