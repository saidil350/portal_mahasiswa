import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Ambil data mahasiswa berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID tidak valid' },
        { status: 400 }
      )
    }

    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { id }
    })

    if (!mahasiswa) {
      return NextResponse.json(
        { error: 'Data mahasiswa tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json(mahasiswa)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data mahasiswa' },
      { status: 500 }
    )
  }
}

// PUT - Update data mahasiswa
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID tidak valid' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { nama, nim, email, jurusan, semester } = body

    // Validasi input
    if (!nama || !nim || !email || !jurusan || !semester) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    const mahasiswa = await prisma.mahasiswa.update({
      where: { id },
      data: {
        nama,
        nim,
        email,
        jurusan,
        semester: parseInt(semester)
      }
    })

    return NextResponse.json(mahasiswa)
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'NIM atau Email sudah digunakan' },
        { status: 400 }
      )
    }
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Data mahasiswa tidak ditemukan' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal mengupdate data mahasiswa' },
      { status: 500 }
    )
  }
}

// DELETE - Hapus data mahasiswa
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID tidak valid' },
        { status: 400 }
      )
    }

    await prisma.mahasiswa.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Data mahasiswa berhasil dihapus' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Data mahasiswa tidak ditemukan' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal menghapus data mahasiswa' },
      { status: 500 }
    )
  }
}
