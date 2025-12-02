import { SessionProvider } from "next-auth/react"
import Header from "@/components/layouts/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Zen_Maru_Gothic } from 'next/font/google'

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['500'],
})

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
    <html lang="ja" className={zenMaruGothic.className}>
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