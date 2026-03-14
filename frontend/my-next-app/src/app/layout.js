import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: {
    default: "LMS",
    template: "%s | My Website",
  },

  description: "Learn Web Development with tutorials",

  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Web Development",
    "Programming",
  ],

  authors: [
    { name: "Harsh" }
  ],

  creator: "Harsh",

  openGraph: {
    title: "LMS",
    description: "Learn Web Development",
    url: "https://mywebsite.com",
    siteName: "My Website",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQh3eIYRTgOaIb2NDHqNHnZVAzkz9FMmiV6g&s",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Website",
    description: "Learn Web Development",
    images: ["https://mywebsite.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQh3eIYRTgOaIb2NDHqNHnZVAzkz9FMmiV6g&s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
