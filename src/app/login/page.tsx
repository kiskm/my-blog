import LoginForm from "@/components/auth/LoginForm"

const LoginPage = () => {
    return (
        <div className="container mx-auto max-w-md mt-10">
            <h1 className="text-2xl font-bold mb-6">ログイン</h1>
            <LoginForm/>
        </div>
    )
}

export default LoginPage