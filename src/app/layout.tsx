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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Header/>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;