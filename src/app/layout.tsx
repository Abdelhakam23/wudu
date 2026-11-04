import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-naskh-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة تعليم الوضوء والصلاة | تعليم تفاعلي موثوق",
  description: "منصة إسلامية تعليمية شاملة لتعليم صفة الوضوء والصلاة خطوة بخطوة بالأدلة النبوية والرسوم التوضيحية لجميع الفئات العمرية.",
  keywords: ["تعلم الوضوء", "تعلم الصلاة", "صفة الصلاة", "أحاديث الطهارة", "خطوات الوضوء", "أركان الصلاة"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexSansArabic.variable} ${notoNaskhArabic.variable}`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
