'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, Plus } from 'lucide-react'
import { MahasiswaForm } from './mahasiswa-form'
import { SearchFilter } from './search-filter'
import { ExportOptions } from './export-options'

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

interface MahasiswaTableProps {
  mahasiswa: Mahasiswa[]
  onRefresh: () => void
}

export function MahasiswaTable({ mahasiswa, onRefresh }: MahasiswaTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMahasiswa, setEditingMahasiswa] = useState<Mahasiswa | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [filteredMahasiswa, setFilteredMahasiswa] = useState<Mahasiswa[]>(mahasiswa)

  const handleCreate = async (data: Omit<Mahasiswa, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/mahasiswa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal menambah data')
      }

      onRefresh()
    } catch (error) {
      console.error('Error creating mahasiswa:', error)
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan')
      throw error
    }
  }

  const handleEdit = async (data: Omit<Mahasiswa, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingMahasiswa) return

    try {
      const response = await fetch(`/api/mahasiswa/${editingMahasiswa.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal mengupdate data')
      }

      setEditingMahasiswa(null)
      onRefresh()
    } catch (error) {
      console.error('Error updating mahasiswa:', error)
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan')
      throw error
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data mahasiswa ini?')) {
      return
    }

    setIsDeleting(id)
    
    try {
      const response = await fetch(`/api/mahasiswa/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal menghapus data')
      }

      onRefresh()
    } catch (error) {
      console.error('Error deleting mahasiswa:', error)
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan')
    } finally {
      setIsDeleting(null)
    }
  }

  const openEditForm = (mahasiswa: Mahasiswa) => {
    setEditingMahasiswa(mahasiswa)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingMahasiswa(null)
  }

  return (
    <>
      <SearchFilter 
        mahasiswa={mahasiswa} 
        onFilteredData={setFilteredMahasiswa}
        filteredData={filteredMahasiswa}
      />
      
      {filteredMahasiswa.length > 0 && (
        <ExportOptions 
          mahasiswa={filteredMahasiswa} 
          title="Daftar Mahasiswa - Portal Mahasiswa"
        />
      )}
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Data Mahasiswa</CardTitle>
              <CardDescription>
                Kelola data mahasiswa dengan mudah - Menampilkan {filteredMahasiswa.length} dari {mahasiswa.length} data
              </CardDescription>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Mahasiswa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Jurusan</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMahasiswa.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    {mahasiswa.length === 0 ? 'Belum ada data mahasiswa' : 'Tidak ada data yang sesuai dengan filter'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMahasiswa.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell>{item.nim}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.jurusan}</TableCell>
                    <TableCell>{item.semester}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditForm(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting === item.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MahasiswaForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingMahasiswa ? handleEdit : handleCreate}
        initialData={editingMahasiswa || undefined}
        title={editingMahasiswa ? 'Edit Mahasiswa' : 'Tambah Mahasiswa Baru'}
        description={editingMahasiswa ? 'Ubah informasi mahasiswa' : 'Masukkan informasi mahasiswa baru'}
      />
    </>
  )
}
