import { writeFile } from "fs/promises"
import path from "path"

export const saveImage = async (file: File): Promise<string | null> => {
    // フォームから渡ってくるデータ形式
    const buffer = Buffer.from(await file.arrayBuffer())
    // 「保存したタイミングのタイムスタンプ＋ファイル名」で重複しないファイル名を設定
    const fileName = `${Date.now()}_${file.name}`
    // プロジェクトフォルダのパス/public/imagesからアップロードする
    const uploadDir = path.join(process.cwd(), 'public/images')

    try {
        // 完全なパスを作る
        const filePath = path.join(uploadDir, fileName)
        // 保存
        await writeFile(filePath, buffer)
        // 以下ファイルの文字情報を戻し、データベースに保存する
        return `/images/${fileName}`
    } catch(error) {
        console.error("画像保存エラー:", error);
        return null;
    }
}