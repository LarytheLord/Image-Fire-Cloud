import { useState, useEffect } from 'react'
import Image from 'next/image'
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"


interface ImageData {
  id: number
  filename: string
  category: string
  importance: number
}

export default function Gallery() {
  const [images, setImages] = useState<ImageData[]>([])
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('importance')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchImages()
  }, [currentPage])

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/images?page=${currentPage}&limit=12`)
      if (response.ok) {
        const data = await response.json()
        setImages(data.images)
        setTotalPages(data.totalPages)
      } else {
        console.error('Failed to fetch images')
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const filteredAndSortedImages = images
    .filter(image => image.category.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'importance') {
        return b.importance - a.importance
      } else {
        return a.filename.localeCompare(b.filename)
      }
    })

  return (
    <div className="container mx-auto mt-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Image Gallery</h1>
      <div className="mb-4 flex gap-4">
        <Input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="importance">Importance</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedImages.map(image => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={`/uploads/${image.filename}`}
              alt={image.filename}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{image.filename}</h3>
              <p className="text-sm text-gray-600">Category: {image.category}</p>
              <p className="text-sm text-gray-600">Importance: {image.importance}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="self-center">{currentPage} / {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}