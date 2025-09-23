'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select-simple'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter, X } from 'lucide-react'

interface Mahasiswa {
  id: number
  nama: string
  nim: string
  email: string
  jurusan: string
  semester: number
  createdAt: string
  updatedAt: string
}

interface SearchFilterProps {
  mahasiswa: Mahasiswa[]
  onFilteredData: (filteredData: Mahasiswa[]) => void
}

export function SearchFilter({ mahasiswa, onFilteredData }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJurusan, setSelectedJurusan] = useState<string>('all')
  const [selectedSemester, setSelectedSemester] = useState<string>('all')

  // Get unique jurusan and semester values
  const uniqueJurusan = Array.from(new Set(mahasiswa.map(m => m.jurusan)))
  const uniqueSemester = Array.from(new Set(mahasiswa.map(m => m.semester))).sort((a, b) => a - b)

  // Filter function
  const applyFilters = () => {
    let filtered = mahasiswa

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.jurusan.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Jurusan filter
    if (selectedJurusan !== 'all') {
      filtered = filtered.filter(m => m.jurusan === selectedJurusan)
    }

    // Semester filter
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(m => m.semester === parseInt(selectedSemester))
    }

    onFilteredData(filtered)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedJurusan('all')
    setSelectedSemester('all')
    onFilteredData(mahasiswa)
  }

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters()
  }, [searchTerm, selectedJurusan, selectedSemester, mahasiswa])

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari nama, NIM, email, atau jurusan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Jurusan Filter */}
          <Select value={selectedJurusan} onValueChange={setSelectedJurusan}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Jurusan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jurusan</SelectItem>
              {uniqueJurusan.map((jurusan) => (
                <SelectItem key={jurusan} value={jurusan}>
                  {jurusan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Semester Filter */}
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Semester</SelectItem>
              {uniqueSemester.map((semester) => (
                <SelectItem key={semester} value={semester.toString()}>
                  Semester {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Hapus Filter
          </Button>
        </div>

        {/* Filter Summary */}
        {(searchTerm || selectedJurusan !== 'all' || selectedSemester !== 'all') && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter aktif:</span>
              {searchTerm && (
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                  Pencarian: "{searchTerm}"
                </span>
              )}
              {selectedJurusan !== 'all' && (
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                  Jurusan: {selectedJurusan}
                </span>
              )}
              {selectedSemester !== 'all' && (
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                  Semester: {selectedSemester}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
