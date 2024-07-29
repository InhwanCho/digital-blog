import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import NavBar from "@/components/site-header";
import { cn } from "@/lib/utils";
import Footer from "@/components/site-footer";
import localFont from 'next/font/local';
import { Toaster } from "react-hot-toast";
import KbarLayout from "@/components/kbar/kbar-layout";
import { ViewTransitions } from "next-view-transitions";
import { siteConfig } from "@/config/site";


// const roboto = Roboto({ subsets: ["latin"], weight: "300", variable: "--font-sans" });
const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2'
});
// const suit = localFont({ src: './fonts/SUIT-Variable.ttf' });
// const inter = Inter({ weight: ['300', '500'], subsets: ['latin'] });


export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s | ${siteConfig.title}` },
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.applicationName,
  generator: siteConfig.generator,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  formatDetection: siteConfig.formatDetection,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    locale: siteConfig.locale,
    type: "article",
  },
  icons: {
    icon: '/assets/favicons/favicon.ico',
    shortcut: '/assets/favicons/favicon-32x32.png',
    apple: '/assets/favicons/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/assets/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'icon',
        url: '/assets/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        rel: 'icon',
        sizes: '16x16',
        url: '/assets/favicons/favicon-16x16.png',
        type: 'image/png'
      },
      {
        rel: 'apple-touch-icon',
        url: '/assets/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        rel: 'manifest',
        url: '/assets/favicons/site.webmanifest'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="ko" suppressHydrationWarning className="scroll-smooth scroll-pt-[84px]">
        <link rel="icon" href="/assets/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicons/site.webmanifest" />
        {/* 구글 서치 콘솔 소유권 확인 */}
        <meta name="google-site-verification" content="nyC3lHXmyNFN_1SnXGGwy8rqHk2qvwoUQOUTQQAIY-8" />
        <body
          className={cn(
            "min-h-dvh bg-background font-sans antialiased",
            pretendard.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <KbarLayout >
              <NavBar />
              <section className="mx-auto px-4 sm:px-6  xl:px-0">
                <div className="relative flex min-h-dvh flex-col bg-background">
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <Toaster
                    toastOptions={{
                      position: "bottom-center",
                    }}
                  />
                </div>
              </section>
            </KbarLayout>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
