import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-yellow-400 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold">ImageCloud</h1>
            <nav>
              <Link href="/" className="text-black hover:text-gray-800 ml-4">Home</Link>
              <Link href="/gallery" className="text-black hover:text-gray-800 ml-4">Gallery</Link>
              {session ? (
                <>
                  <Link href="/upload" className="text-black hover:text-gray-800 ml-4">Upload</Link>
                  <Link href="/api/auth/signout" className="text-black hover:text-gray-800 ml-4">Sign Out</Link>
                </>
              ) : (
                <Link href="/api/auth/signin" className="text-black hover:text-gray-800 ml-4">Sign In</Link>
              )}
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}