import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata = {
  metadataBase: new URL("https://ichrd.kr"),
  title: { default: `${site.name} | ICHRD`, template: `%s | ${site.name}` },
  description: site.intro,
  openGraph: { title: site.name, description: site.tagline, url: "https://ichrd.kr", locale: "ko_KR", type: "website" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Archivo Black 은 히어로 캔버스가 직접 쓰는 글꼴이라 그대로 둡니다 */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" />
        {/* sohne-var 대체 — 라틴 문자는 Inter Tight, 한글은 Pretendard 가 받습니다 */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400&display=swap"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
