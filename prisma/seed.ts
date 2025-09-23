import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Hapus data lama jika ada
  await prisma.mahasiswa.deleteMany()

  // Tambah data mahasiswa untuk testing
  const mahasiswaData = [
    {
      nama: 'Ahmad Rizki',
      nim: '1234567890',
      email: 'ahmad.rizki@example.com',
      jurusan: 'Teknik Informatika',
      semester: 3
    },
    {
      nama: 'Siti Nurhaliza',
      nim: '1234567891',
      email: 'siti.nurhaliza@example.com',
      jurusan: 'Sistem Informasi',
      semester: 5
    },
    {
      nama: 'Budi Santoso',
      nim: '1234567892',
      email: 'budi.santoso@example.com',
      jurusan: 'Teknik Informatika',
      semester: 7
    },
    {
      nama: 'Dewi Lestari',
      nim: '1234567893',
      email: 'dewi.lestari@example.com',
      jurusan: 'Manajemen',
      semester: 3
    },
    {
      nama: 'Eko Prasetyo',
      nim: '1234567894',
      email: 'eko.prasetyo@example.com',
      jurusan: 'Akuntansi',
      semester: 5
    },
    {
      nama: 'Fita Sari',
      nim: '1234567895',
      email: 'fita.sari@example.com',
      jurusan: 'Teknik Informatika',
      semester: 1
    },
    {
      nama: 'Gita Permata',
      nim: '1234567896',
      email: 'gita.permata@example.com',
      jurusan: 'Sistem Informasi',
      semester: 9
    },
    {
      nama: 'Hadi Wijaya',
      nim: '1234567897',
      email: 'hadi.wijaya@example.com',
      jurusan: 'Manajemen',
      semester: 7
    },
    {
      nama: 'Indra Kurniawan',
      nim: '1234567898',
      email: 'indra.kurniawan@example.com',
      jurusan: 'Akuntansi',
      semester: 3
    },
    {
      nama: 'Joko Susilo',
      nim: '1234567899',
      email: 'joko.susilo@example.com',
      jurusan: 'Teknik Informatika',
      semester: 5
    }
  ]

  for (const data of mahasiswaData) {
    await prisma.mahasiswa.create({
      data
    })
  }

  console.log('Data mahasiswa berhasil ditambahkan!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

