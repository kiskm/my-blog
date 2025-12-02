import { SessionProvider } from "next-auth/react"
import Header from "@/components/layouts/Header";
import "./globals.css";
import type { Metadata } from "next";

// メタデータ
export const metadata: Metadata = {
  title: {
    default: 'け',
    template: '%s | け', // 各ページで「ページ名 | け」
  },
  description: 'けのページ',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body>
        <SessionProvider>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <Header/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;