import type { Metadata } from "next";
import CreatePostForm from "@/components/posts/contents/CreatePostForm";

export const metadata: Metadata = {
  title: "投稿",
  description: "Create New User",
};

const CreatePostPage = () => {
  return <CreatePostForm />;
};

export default CreatePostPage;
