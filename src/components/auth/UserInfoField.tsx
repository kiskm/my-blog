// 型指定
type userInfoFieldProps = {
    label: string;
    value: string;
    id: string;
    type: string;
    onChange: (value: string) => void;
    errorMsg: string[];
}

const UserInfoField = ({ label, value, id, type, onChange, errorMsg }: userInfoFieldProps) => {
    const placeholder = `${label}を入力` as string
    return (
        <div className="flex flex-col space-y-1 w-full">
            {/* 見出し */}
            <label htmlFor={id} className="font-bold">{label}</label>

            {/* 入力欄 */}
            <input
            className="rounded-md border h-10 px-2"
            type={type} id={id} name={id} placeholder={placeholder}
            value={value} onChange={(e) => onChange(e.target.value)}
            />

            {/* エラーメッセージ */}
            {errorMsg && (
            <p className="text-red-500 text-sm mt-1">{errorMsg[0]}</p>
            )}
        </div>
    )
}

export default UserInfoField