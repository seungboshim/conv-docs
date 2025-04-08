import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '코딩 규칙 문서',
  description: '코딩 규칙 문서를 마크다운 형식으로 보여주는 웹사이트입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=42dot+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="min-h-screen bg-white tracking-tight">{children}</div>
      </body>
    </html>
  );
}
