'use server'
import { auth } from '@/auth'

const IsLogin = async () => {
    const session = await auth()

    return (
        <div>
            {session && (
            <div>{session.user?.name}さん</div>
            )}
        </div>

    )
}

export default IsLogin