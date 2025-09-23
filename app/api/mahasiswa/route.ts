import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Ambil semua data mahasiswa
export async function GET() {
  try {
    const mahasiswa = await prisma.mahasiswa.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(mahasiswa)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data mahasiswa' },
      { status: 500 }
    )
  }
}

// POST - Tambah data mahasiswa baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, nim, email, jurusan, semester } = body

    // Validasi input
    if (!nama || !nim || !email || !jurusan || !semester) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    const mahasiswa = await prisma.mahasiswa.create({
      data: {
        nama,
        nim,
        email,
        jurusan,
        semester: parseInt(semester)
      }
    })

    return NextResponse.json(mahasiswa, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'NIM atau Email sudah digunakan' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Gagal menambah data mahasiswa' },
      { status: 500 }
    )
  }
}
