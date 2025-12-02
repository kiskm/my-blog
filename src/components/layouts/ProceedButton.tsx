import Link from 'next/link'

type ButtonProps = {
    id: string,
    text: string
}

const ProceedButton = ( { id, text }: ButtonProps ) => {
    return (
        <Link key={id} href={`/manage/${id}/edit`}>
            <button 
            className="text-lg border rounded-md px-3 py-2
            bg-sky-500 hover:bg-sky-600
            transition duration-300 cursor-pointer"
            >
                {text}
            </button>
        </Link>
    )
}

export default ProceedButton