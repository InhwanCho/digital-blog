import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import "@/css/globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import NavBar from "@/components/site-header";
import { cn } from "@/lib/utils";
import Footer from "@/components/site-footer";
import localFont from 'next/font/local';
import { Toaster } from "react-hot-toast";
import KbarLayout from "@/components/kbar/kbar-layout";
import { ViewTransitions } from "next-view-transitions";


// const roboto = Roboto({ subsets: ["latin"], weight: "300", variable: "--font-sans" });
const pretendard = localFont({
  src: './fonts/PretendardVariable.ttf'
});
// const suit = localFont({ src: './fonts/SUIT-Variable.ttf' });
// const inter = Inter({ weight: ['300', '500'], subsets: ['latin'] });


export const metadata: Metadata = {
  title: "블로그 생성 중",
  description: "설명",
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
      <html lang="en" suppressHydrationWarning className="scroll-smooth scroll-pt-20">
        <link rel="icon" href="/static/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />

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
              <section className="mx-auto max-w-4xl xl:max-w-5xl px-4 sm:px-6  xl:px-0">
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
