// 型指定
type TitleFieldProps = {
    title: string;
    onChange: (value: string) => void;
    errorMsg: string[];
}

const TitleField = ({ title, onChange, errorMsg }: TitleFieldProps) => {
    return (
        <div className="flex flex-col space-y-1 w-fit">
            {/* 見出し */}
            <label htmlFor="title" className="font-bold">タイトル</label>

            {/* 入力欄 */}
            <input
            className="rounded-md border h-10 px-2"
            type="text" id="title" name="title" placeholder="タイトルを入力"
            value={title} onChange={(e) => onChange(e.target.value)}
            />

            {/* エラーメッセージ */}
            {errorMsg && (
            <p className="text-red-500 text-sm mt-1">{errorMsg.join(',')}</p>
            )}
        </div>
    )
}

export default TitleField