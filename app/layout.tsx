import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { absoluteUrl } from "@/lib/assetPath"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const siteUrl = absoluteUrl("/")
const title = "Sushil Dalavi — AI Engineer"
const description =
  "AI Engineer at USC Annenberg Norman Lear Center architecting production AI systems: AWS data platforms, hybrid retrieval, LLM inference, and multi-modal ML at scale. MS CS at USC, class of 2026."

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#050607" },
  ],
  colorScheme: "dark light",
}

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s · Sushil Dalavi",
  },
  description,
  applicationName: "Sushil Dalavi · Portfolio",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "Sushil Dalavi",
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM Systems",
    "Retrieval-Augmented Generation",
    "Hybrid Retrieval",
    "MLOps",
    "Distributed Workflows",
    "Temporal",
    "AWS",
    "SageMaker",
    "Bedrock",
    "USC",
    "Norman Lear Center",
    "Portfolio",
  ],
  authors: [{ name: "Sushil Dalavi", url: siteUrl }],
  creator: "Sushil Dalavi",
  publisher: "Sushil Dalavi",
  referrer: "origin-when-cross-origin",
  category: "technology",
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Sushil Dalavi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@sushildalavi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sushil Dalavi",
  alternateName: "Sushil",
  url: siteUrl,
  image: `${siteUrl}opengraph-image`,
  jobTitle: "AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "USC Annenberg Norman Lear Center",
    url: "https://learcenter.org/",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Southern California",
      url: "https://www.usc.edu/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of Mumbai",
    },
  ],
  email: "mailto:sdalavi@usc.edu",
  sameAs: [
    "https://github.com/sushildalavi",
    "https://linkedin.com/in/sushildalavi",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  description,
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Distributed Systems",
    "Natural Language Processing",
    "MLOps",
    "Data Engineering",
    "Python",
    "AWS",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sushil Dalavi",
  url: siteUrl,
  publisher: {
    "@type": "Person",
    name: "Sushil Dalavi",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
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
