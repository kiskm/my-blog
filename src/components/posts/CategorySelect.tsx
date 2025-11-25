// 型指定
type CategorySelectProps = {
    value: string;
}

const CategorySelect = ({ value }: CategorySelectProps) => {
    return (
        <div className="flex flex-col space-y-2 w-fit">
            {/* 見出し */}
            <label htmlFor="category" className="font-bold">
                カテゴリー
            </label>

            {/* プルダウン */}
            <select
                name="category"
                id="category"
                defaultValue={value}
                className="py-1 px-2 rounded-md border"
            >
                <option value="">--1 つ選択してください--</option>
                <option value="development">開発</option>
                <option value="diary">日記</option>
            </select>
        </div>
    );
}

export default CategorySelect;