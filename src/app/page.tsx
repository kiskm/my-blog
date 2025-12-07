import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ようこそ',
  description: 'Hello',
}

export default function Home() {
  return (
    <div className="flex justify-center p-50">
      <h1 className="w-full text-center text-9xl">
        ようこそ
      </h1>
    </div>
  );
}