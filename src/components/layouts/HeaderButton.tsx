import Link from 'next/link'

// 型指定
type HeaderButtonProps = {
    href: string,
    label: string
}

const HeaderButton = ({ href, label }: HeaderButtonProps) => {
    return (
        <Link href={href} className="px-3 py-1 rounded hover:bg-purple-200 transition duration-100">
            {label}
        </Link>
    )
}

export default HeaderButton