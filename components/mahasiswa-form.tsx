'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Mahasiswa {
  id?: number
  nama: string
  nim: string
  email: string
  jurusan: string
  semester: number
}

interface MahasiswaFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Mahasiswa, 'id'>) => Promise<void>
  initialData?: Mahasiswa
  title: string
  description: string
}

export function MahasiswaForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData,
  title,
  description 
}: MahasiswaFormProps) {
  const [formData, setFormData] = useState<Omit<Mahasiswa, 'id'>>({
    nama: initialData?.nama || '',
    nim: initialData?.nim || '',
    email: initialData?.email || '',
    jurusan: initialData?.jurusan || '',
    semester: initialData?.semester || 1
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await onSubmit(formData)
      setFormData({
        nama: '',
        nim: '',
        email: '',
        jurusan: '',
        semester: 1
      })
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'semester' ? parseInt(value) || 1 : value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="nim">NIM</Label>
              <Input
                id="nim"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="jurusan">Jurusan</Label>
              <Input
                id="jurusan"
                name="jurusan"
                value={formData.jurusan}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                name="semester"
                type="number"
                min="1"
                max="14"
                value={formData.semester}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
