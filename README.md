# Portal Mahasiswa - CRUD Next.js dengan shadcn/ui

Aplikasi CRUD (Create, Read, Update, Delete) untuk mengelola data mahasiswa menggunakan Next.js 14, TypeScript, Prisma, dan shadcn/ui.

## Fitur

- ✅ **CRUD Lengkap**: Create, Read, Update, Delete data mahasiswa
- 🔍 **Search & Filter**: Pencarian berdasarkan nama, NIM, email, jurusan
- 🎯 **Filter Advanced**: Filter berdasarkan jurusan dan semester
- 🖨️ **Print & Export**: Print document, export CSV, export TXT
- 🎨 **UI Modern**: Menggunakan shadcn/ui dengan desain yang clean
- 📱 **Responsive**: Tampilan yang optimal di desktop dan mobile
- 🗄️ **Database**: Menggunakan Prisma dengan SQLite
- ⚡ **TypeScript**: Full type safety
- 🔄 **Real-time**: Data terupdate secara real-time

## Teknologi yang Digunakan

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **SQLite** - Database (development)
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Styling
- **Radix UI** - Headless UI components

## Struktur Proyek

```
portal_mahasiswa/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── mahasiswa/     # CRUD API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── mahasiswa-form.tsx # Form untuk create/edit
│   ├── mahasiswa-table.tsx # Tabel data mahasiswa
│   ├── search-filter.tsx # Komponen search dan filter
│   ├── export-options.tsx # Komponen print dan export
│   └── print-mahasiswa.tsx # Komponen print (legacy)
├── lib/                   # Utility functions
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
└── public/               # Static assets
```

## Instalasi dan Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd portal_mahasiswa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Tambah data demo (opsional)**
   ```bash
   npm run db:seed
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka browser**
   ```
   http://localhost:3000
   ```

## API Endpoints

### Mahasiswa

- `GET /api/mahasiswa` - Ambil semua data mahasiswa
- `POST /api/mahasiswa` - Tambah mahasiswa baru
- `GET /api/mahasiswa/[id]` - Ambil data mahasiswa berdasarkan ID
- `PUT /api/mahasiswa/[id]` - Update data mahasiswa
- `DELETE /api/mahasiswa/[id]` - Hapus data mahasiswa

### Contoh Request Body

```json
{
  "nama": "John Doe",
  "nim": "1234567890",
  "email": "john@example.com",
  "jurusan": "Teknik Informatika",
  "semester": 3
}
```

## Database Schema

```prisma
model Mahasiswa {
  id        Int      @id @default(autoincrement())
  nama      String
  nim       String   @unique
  email     String   @unique
  jurusan   String
  semester  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("mahasiswa")
}
```

## Scripts

- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run start` - Jalankan production server
- `npm run lint` - Jalankan ESLint
- `npm run db:seed` - Tambah data demo untuk testing

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

MIT License