"use client";
import BackButton from "@/components/layouts/BackButton";
import CategorySelect from "@/components/posts/CategorySelect";
import ImageSelect from "@/components/posts/ImageSelect";
import TitleField from "@/components/posts/TitleField";
import ToggleButton from "@/components/layouts/ToggleButton";
import { createPost } from "@/lib/actions/crudPost";
import { useActionState, useState } from "react";

const CreatePostForm = () => {
  // 状態管理
  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(""); // 画像プレビュー
  const [isImageDeleted, setIsImageDeleted] = useState(false); // 画像削除フラグ
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [published, setPublished] = useState(true);

  // 送信処理
  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
    errors: {},
  });

  // 内容変更時の処理
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  // 画像選択時の処理
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // プレビュー用URL生成 ブラウザのメモリに保存される
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setIsImageDeleted(false);
    }
  };

  // 画像削除時の処理
  const handleImageDelete = () => {
    setImagePreview(null);
    setIsImageDeleted(true);
    const fileInput = document.getElementById("topImage") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 見出し */}
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      
      <form action={formAction} className="space-y-6">
        {/* タイトル */}
        <TitleField
          title={title}
          onChange={setTitle}
          errorMsg={state.errors.title}
        />

        {/* トップ画像 */}
        <ImageSelect
          onChange={handleImageChange}
          onClick={handleImageDelete}
          imageUrl={imagePreview}
          alt={title}
          errorMsg={state.errors.topImage}
        />

        {/* カテゴリー */}
        <CategorySelect value="" />

        {/* 内容 */}
        <div className="flex flex-col space-y-2">
          {/* 見出し */}
          <label htmlFor="content" className="font-bold">
            内容
          </label>
          {/* 入力欄 */}
          <textarea
            className="w-full border p-2 min-h-80"
            id="content"
            name="content"
            placeholder="内容を入力"
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.content.join(",")}
            </p>
          )}
          {/* 文字数カウンター */}
          <div className="text-right text-sm text-gray-500 mt-1">
            文字数: {contentLength}
          </div>
        </div>

        {/* 公開設定 */}
        <div className="flex-col justify-start items-center space-y-1">
          <p className="font-bold">公開設定</p>
          <label
            htmlFor="published"
            className="relative inline-block w-14 h-8 cursor-pointer"
          >
            <ToggleButton
              checked={published}
              onChange={setPublished}
              label="published"
            />
          </label>
        </div>

        {/* 投稿ボタン */}
        <div className="grid grid-cols-1 space-y-2
        md:flex md:justify-center md:space-x-6 md:space-y-0 mt-12">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isPending ? "投稿中..." : "投稿する"}
          </button>
          <BackButton href="/blog" text="ブログ一覧に戻る" />
        </div>

        {/* 画像URLの削除フラグ */}
        <input
          type="hidden"
          name="deleteImage"
          value={isImageDeleted ? "true" : "false"}
        />
      </form>
    </div>
  );
};

export default CreatePostForm;
