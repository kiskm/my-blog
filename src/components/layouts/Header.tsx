'use server'

import PublicHeader from "@/components/layouts/PublicHeader"
import IsLoginHeader from "@/components/layouts/IsLoginHeader"
import { auth } from "@/auth"

const Header = async () => {
    const session = await auth()
    return (
        <div>
            {session? (
            <IsLoginHeader session={session} />
            ) : (
            <PublicHeader/>
        )
        }
        </div>
    )
}

export default Header