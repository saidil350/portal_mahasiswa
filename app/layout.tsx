import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal Mahasiswa - CRUD Next.js',
  description: 'Aplikasi CRUD mahasiswa menggunakan Next.js dan shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-foreground">
                Portal Mahasiswa
              </h1>
              <p className="text-muted-foreground mt-2">
                Sistem manajemen data mahasiswa
              </p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
