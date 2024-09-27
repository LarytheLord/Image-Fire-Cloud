import Image from 'next/image'
import Link from 'next/link'
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">ImageCloud</h1>
          <nav>
            <Link href="/upload" className="text-black hover:text-gray-800 ml-4">Upload</Link>
            <Link href="/gallery" className="text-black hover:text-gray-800 ml-4">Gallery</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-16 px-4">
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-8">Your Images Matter</h2>
          <p className="text-xl mb-8">Store, optimize, and categorize your images with AI-powered technology</p>
          <Button size="lg">
            <Link href="/upload">Get Started</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Smart Storage</h3>
            <p>Our AI automatically categorizes and optimizes your images for efficient storage.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Easy Access</h3>
            <p>Access your images from anywhere, anytime, on any device.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Size Optimization</h3>
            <p>We intelligently reduce image sizes without compromising quality.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Importance Ranking</h3>
            <p>Our AI ranks your images based on content and usage patterns.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 ImageCloud. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}