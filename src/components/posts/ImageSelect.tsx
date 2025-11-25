import Image from "next/image";

// 型指定
type SelectImageProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    imageUrl?: string | null;
    alt: string;
    errorMsg: string[];
}

const ImageSelect = ({onChange, onClick, imageUrl, alt, errorMsg}: SelectImageProps) => {
    return (
        <div className="flex flex-col space-y-2 w-fit">
            {/* 見出し */}
            <label htmlFor="topImage" className="font-bold">トップ画像</label>

            <div className="flex justify-start items-center space-x-2">
                {/* ボタン */}
                <label
                    htmlFor="topImage"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition"
                >
                    画像を選択
                </label>

                {/* ファイル名の表示(クリック無効) */}
                <input 
                    type="file"
                    id="topImage" 
                    accept="image/*" 
                    name="topImage"
                    onChange={onChange}
                    className="border rounded-md px-4 py-2 pointer-events-none"
                />
            </div>

            {/* 画面プレビュー */}
            {imageUrl && (
                <div>
                    <Image
                        src={imageUrl}
                        alt={alt}
                        width={0}
                        height={0}
                        sizes="200px"
                        className="w-[200px] rounded"
                        priority
                    />
                    <button
                        type="button"
                        onClick={onClick}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        画像を削除
                    </button>
                </div>
            )}

            {/* エラーメッセージ */}
            {errorMsg && (
                <p className="text-red-500 text-sm mt-1">{errorMsg.join(',')}</p>
            )}
        </div>
    )
}

export default ImageSelect