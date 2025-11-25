import { SessionProvider } from "next-auth/react"
import Header from "@/components/layouts/Header";
import "./globals.css";

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