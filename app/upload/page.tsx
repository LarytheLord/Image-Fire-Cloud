'use client'

import { useState } from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        alert('File uploaded successfully')
        setFile(null)
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Upload failed')
    }
  }

  return (
    <div className="container mx-auto mt-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Upload Image</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
        <label htmlFor="imageUpload" className="block mb-2">Select an image to upload:</label>
          <input 
            id="imageUpload"
            type="file"
            accept="image/*"
            aria-label="Image file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-yellow-50 file:text-yellow-700
              hover:file:bg-yellow-100"
          />
        </div>
        <Button type="submit" disabled={!file}>
          Upload
        </Button>
      </form>
    </div>
  )
}