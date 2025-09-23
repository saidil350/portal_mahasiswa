'use client'

import { useState, useEffect } from 'react'
import { MahasiswaTable } from '@/components/mahasiswa-table'

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

export default function HomePage() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMahasiswa = async () => {
    try {
      const response = await fetch('/api/mahasiswa')
      if (response.ok) {
        const data = await response.json()
        setMahasiswa(data)
      } else {
        console.error('Gagal mengambil data mahasiswa')
      }
    } catch (error) {
      console.error('Error fetching mahasiswa:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMahasiswa()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Mahasiswa</h3>
          </div>
          <div>
            <div className="text-2xl font-bold">{mahasiswa.length}</div>
            <p className="text-xs text-muted-foreground">
              Data mahasiswa terdaftar
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Jurusan Aktif</h3>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {new Set(mahasiswa.map(m => m.jurusan)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Jurusan berbeda
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Rata-rata Semester</h3>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {mahasiswa.length > 0 
                ? (mahasiswa.reduce((acc, m) => acc + m.semester, 0) / mahasiswa.length).toFixed(1)
                : '0'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Semester rata-rata
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Data Terbaru</h3>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {mahasiswa.length > 0 
                ? new Date(mahasiswa[0]?.createdAt).toLocaleDateString('id-ID')
                : '-'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Tanggal pendaftaran terakhir
            </p>
          </div>
        </div>
      </div>

      <MahasiswaTable mahasiswa={mahasiswa} onRefresh={fetchMahasiswa} />
    </div>
  )
}
