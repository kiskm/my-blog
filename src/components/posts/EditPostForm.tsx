"use client";
import { updatePost } from "@/lib/actions/crudPost";
import React, { useActionState, useState } from "react";
import BackButton from "../layouts/BackButton";
import ToggleButton from "../layouts/ToggleButton";
import CategorySelect from "./CategorySelect";
import TitleField from "./TitleField";
import ImageSelect from "./ImageSelect";

// 型指定
type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    category: string;
    content: string;
    topImage?: string | null;
    published: boolean;
  };
};

const EditPostForm = ({ post }: EditPostFormProps) => {
  // 状態管理
  const [title, setTitle] = useState(post.title); // タイトル
  const [imagePreview, setImagePreview] = useState(post.topImage); // 画像プレビュー
  const [isImageDeleted, setIsImageDeleted] = useState(false); // 画像削除フラグ
  const [content, setContent] = useState(post.content); // 内容
  const [contentLength, setContentLength] = useState(post.content.length); // 内容の文字数
  const [published, setPublished] = useState(post.published); // 公開設定フラグ

  // 送信処理
  const [state, formAction, isPending] = useActionState(updatePost, {
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
      <h1 className="text-2xl font-bold mb-4">{post?.title}の編集</h1>
      <form action={formAction} className="space-y-4">
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
          alt={post.title}
          errorMsg={state.errors.topImage}
        />

        {/* カテゴリー */}
        <CategorySelect value={post.category} />

        {/* 内容 */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="content" className="font-bold">
            内容
          </label>
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
        </div>

        {/* 内容の文字数カウンター */}
        <div className="text-right text-sm text-gray-500 mt-1">
          文字数: {contentLength}
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

        {/* ボタン */}
        <div className="grid grid-cols-1 space-y-2
        md:flex md:justify-center md:space-x-2 md:space-y-0 mt-6">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded-md
            hover:bg-blue-600 cursor-pointer transition duration-300"
          >
            {isPending ? "更新中..." : "更新する"}
          </button>
          <BackButton href="/blog" text="ブログ一覧に戻る" />
        </div>

        {/* 受信データの保持 */}
        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
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

export default EditPostForm;
