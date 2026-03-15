import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sushil Dalavi — AI Research Engineer",
  description:
    "AI Research Engineer building NLP, RAG, and LLM-powered systems for research, healthcare, and social impact. MS in Computer Science at USC.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "NLP",
    "RAG",
    "LLM",
    "Research Engineer",
    "USC",
    "Portfolio",
  ],
  authors: [{ name: "Sushil Dalavi" }],
  openGraph: {
    title: "Sushil Dalavi — AI Research Engineer",
    description:
      "Building intelligent systems for research, healthcare, and social impact.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t){document.documentElement.setAttribute('data-theme',t)}else if(!window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})();`,
          }}
        />
        <a href="#hero" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
