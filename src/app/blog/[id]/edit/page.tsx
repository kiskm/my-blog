import EditPostForm from "@/components/posts/contents/EditPostForm";
import { auth } from "@/auth";
import { getPostInfo } from "@/lib/info";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// idを引数にする
type Params = {
    params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> => {
    const post = await getPostInfo(params.id);
    return {
        title: `${post?.title}の編集`,
    };
};

const EditPage = async ({ params }: Params) => {
  // 不正なリクエストを防ぐ
    const session = await auth();
    const userId = session?.user?.id;
    if (!session?.user?.email || !userId) {
        throw new Error("不正なリクエストです");
    }

    // 投稿IDがなければNotFound画面に遷移
    const { id } = await params;
    const post = await getPostInfo(id);
    if (!post) {
        notFound();
    }

    return <EditPostForm post={post} />;
};

export default EditPage;
