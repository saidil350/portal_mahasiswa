'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

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

interface PrintMahasiswaProps {
  mahasiswa: Mahasiswa[]
  title?: string
}

export function PrintMahasiswa({ mahasiswa, title = "Daftar Mahasiswa" }: PrintMahasiswaProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (!printRef.current) return

    // Buat window baru untuk print
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    // Get current date
    const currentDate = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // HTML content untuk print
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            @page {
              size: A4;
              margin: 1cm;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size: 12px;
              line-height: 1.4;
              color: #333;
              margin: 0;
              padding: 0;
            }
            
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            
            .header h1 {
              font-size: 24px;
              font-weight: bold;
              margin: 0 0 10px 0;
              color: #2563eb;
            }
            
            .header .date {
              font-size: 14px;
              color: #666;
            }
            
            .summary {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #2563eb;
            }
            
            .summary h3 {
              margin: 0 0 10px 0;
              font-size: 16px;
              color: #2563eb;
            }
            
            .summary p {
              margin: 5px 0;
              font-size: 14px;
            }
            
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            
            .table th {
              background-color: #2563eb;
              color: white;
              padding: 12px 8px;
              text-align: left;
              font-weight: bold;
              border: 1px solid #ddd;
            }
            
            .table td {
              padding: 10px 8px;
              border: 1px solid #ddd;
              vertical-align: top;
            }
            
            .table tr:nth-child(even) {
              background-color: #f8f9fa;
            }
            
            .table tr:hover {
              background-color: #e9ecef;
            }
            
            .no-data {
              text-align: center;
              padding: 40px;
              color: #666;
              font-style: italic;
            }
            
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 10px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 15px;
            }
            
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
              
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${title}</h1>
            <div class="date">Dicetak pada: ${currentDate}</div>
          </div>
          
          <div class="summary">
            <h3>Ringkasan Data</h3>
            <p><strong>Total Mahasiswa:</strong> ${mahasiswa.length}</p>
            <p><strong>Jurusan:</strong> ${Array.from(new Set(mahasiswa.map(m => m.jurusan))).join(', ')}</p>
            <p><strong>Semester:</strong> ${Array.from(new Set(mahasiswa.map(m => m.semester))).sort((a, b) => a - b).join(', ')}</p>
            <p><strong>Rata-rata Semester:</strong> ${mahasiswa.length > 0 ? (mahasiswa.reduce((acc, m) => acc + m.semester, 0) / mahasiswa.length).toFixed(1) : '0'}</p>
          </div>
          
          ${mahasiswa.length === 0 ? `
            <div class="no-data">
              Belum ada data mahasiswa untuk dicetak
            </div>
          ` : `
            <table class="table">
              <thead>
                <tr>
                  <th style="width: 5%">No</th>
                  <th style="width: 25%">Nama Lengkap</th>
                  <th style="width: 15%">NIM</th>
                  <th style="width: 25%">Email</th>
                  <th style="width: 20%">Jurusan</th>
                  <th style="width: 10%">Semester</th>
                </tr>
              </thead>
              <tbody>
                ${mahasiswa.map((item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.nama}</td>
                    <td>${item.nim}</td>
                    <td>${item.email}</td>
                    <td>${item.jurusan}</td>
                    <td style="text-align: center">${item.semester}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `}
          
          <div class="footer">
            <p>Portal Mahasiswa - Sistem Manajemen Data Mahasiswa</p>
            <p>Dokumen ini dicetak secara otomatis pada ${currentDate}</p>
          </div>
        </body>
      </html>
    `

    // Tulis content ke window baru
    printWindow.document.write(printContent)
    printWindow.document.close()

    // Tunggu sebentar untuk memastikan content sudah dimuat, lalu print
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  return (
    <Button
      variant="outline"
      onClick={handlePrint}
      className="flex items-center gap-2"
      disabled={mahasiswa.length === 0}
    >
      <Printer className="h-4 w-4" />
      Print ({mahasiswa.length})
    </Button>
  )
}
