'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Printer, Download, FileText } from 'lucide-react'

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

interface ExportOptionsProps {
  mahasiswa: Mahasiswa[]
  title?: string
}

export function ExportOptions({ mahasiswa, title = "Daftar Mahasiswa" }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handlePrint = () => {
    if (!mahasiswa.length) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const currentDate = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

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
            <div style="text-align: center; padding: 40px; color: #666; font-style: italic;">
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

    printWindow.document.write(printContent)
    printWindow.document.close()

    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  const handleExportCSV = () => {
    if (!mahasiswa.length) return

    setIsExporting(true)

    try {
      // Create CSV content
      const headers = ['No', 'Nama Lengkap', 'NIM', 'Email', 'Jurusan', 'Semester']
      const csvContent = [
        headers.join(','),
        ...mahasiswa.map((item, index) => [
          index + 1,
          `"${item.nama}"`,
          `"${item.nim}"`,
          `"${item.email}"`,
          `"${item.jurusan}"`,
          item.semester
        ].join(','))
      ].join('\n')

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      
      const currentDate = new Date().toISOString().split('T')[0]
      link.setAttribute('download', `daftar-mahasiswa-${currentDate}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      alert('Gagal mengexport data ke CSV')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportTXT = () => {
    if (!mahasiswa.length) return

    setIsExporting(true)

    try {
      const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      let txtContent = `${title}\n`
      txtContent += `Dicetak pada: ${currentDate}\n`
      txtContent += `Total Mahasiswa: ${mahasiswa.length}\n`
      txtContent += `Jurusan: ${Array.from(new Set(mahasiswa.map(m => m.jurusan))).join(', ')}\n`
      txtContent += `Semester: ${Array.from(new Set(mahasiswa.map(m => m.semester))).sort((a, b) => a - b).join(', ')}\n`
      txtContent += `Rata-rata Semester: ${mahasiswa.length > 0 ? (mahasiswa.reduce((acc, m) => acc + m.semester, 0) / mahasiswa.length).toFixed(1) : '0'}\n\n`
      
      txtContent += `${'No'.padEnd(5)} ${'Nama Lengkap'.padEnd(30)} ${'NIM'.padEnd(15)} ${'Email'.padEnd(30)} ${'Jurusan'.padEnd(20)} ${'Semester'.padEnd(8)}\n`
      txtContent += `${'='.repeat(110)}\n`
      
      mahasiswa.forEach((item, index) => {
        txtContent += `${(index + 1).toString().padEnd(5)} ${item.nama.padEnd(30)} ${item.nim.padEnd(15)} ${item.email.padEnd(30)} ${item.jurusan.padEnd(20)} ${item.semester.toString().padEnd(8)}\n`
      })

      txtContent += `\n\nPortal Mahasiswa - Sistem Manajemen Data Mahasiswa\n`
      txtContent += `Dokumen ini diekspor secara otomatis pada ${currentDate}`

      // Create and download file
      const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      
      const dateStr = new Date().toISOString().split('T')[0]
      link.setAttribute('download', `daftar-mahasiswa-${dateStr}.txt`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting TXT:', error)
      alert('Gagal mengexport data ke TXT')
    } finally {
      setIsExporting(false)
    }
  }

  if (mahasiswa.length === 0) {
    return null
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Export Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex items-center gap-2"
            disabled={isExporting}
          >
            <Printer className="h-4 w-4" />
            Print ({mahasiswa.length})
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="flex items-center gap-2"
            disabled={isExporting}
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExportTXT}
            className="flex items-center gap-2"
            disabled={isExporting}
          >
            <FileText className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export TXT'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
