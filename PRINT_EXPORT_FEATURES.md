# Fitur Print & Export - Portal Mahasiswa

## 🖨️ **Fitur Print & Export yang Tersedia:**

### **1. Print Document**
- **Lokasi**: Tombol "Print" di bagian Export Options
- **Fungsi**: Mencetak daftar mahasiswa ke printer
- **Format**: HTML dengan styling yang rapi
- **Fitur**:
  - Header dengan judul dan tanggal
  - Ringkasan data (total, jurusan, semester, rata-rata)
  - Tabel dengan data lengkap
  - Footer dengan informasi sistem

### **2. Export ke CSV**
- **Lokasi**: Tombol "Export CSV" di bagian Export Options
- **Fungsi**: Download file CSV untuk dibuka di Excel/Google Sheets
- **Format**: CSV (Comma Separated Values)
- **Fitur**:
  - Header dengan nama kolom
  - Data mahasiswa dalam format tabel
  - Nama file dengan tanggal otomatis
  - Encoding UTF-8 untuk karakter Indonesia

### **3. Export ke TXT**
- **Lokasi**: Tombol "Export TXT" di bagian Export Options
- **Fungsi**: Download file text dengan format yang rapi
- **Format**: Plain Text (.txt)
- **Fitur**:
  - Header dengan informasi lengkap
  - Ringkasan data
  - Tabel dengan alignment yang rapi
  - Footer dengan informasi sistem

## 📍 **Lokasi Fitur Export:**

### **Export Options Card**
- **Posisi**: Di antara Search Filter dan Data Table
- **Kondisi**: Hanya muncul jika ada data mahasiswa
- **Layout**: Card dengan header "Export Data"

### **Export di Filter Results**
- **Posisi**: Di bagian bawah Search Filter
- **Kondisi**: Hanya muncul jika ada hasil filter
- **Fungsi**: Export data yang sudah difilter

## 🎯 **Cara Menggunakan:**

### **Print Document**
1. Klik tombol "Print (X)" di Export Options
2. Browser akan membuka window print preview
3. Pilih printer dan pengaturan yang diinginkan
4. Klik "Print" untuk mencetak

### **Export ke CSV**
1. Klik tombol "Export CSV"
2. File akan otomatis terdownload
3. Buka file dengan Excel, Google Sheets, atau aplikasi spreadsheet lainnya
4. Data siap untuk dianalisis atau diproses lebih lanjut

### **Export ke TXT**
1. Klik tombol "Export TXT"
2. File akan otomatis terdownload
3. Buka dengan text editor atau aplikasi lainnya
4. Format text yang rapi untuk dokumentasi

## 📋 **Format Output:**

### **Print Document**
```
┌─────────────────────────────────────────┐
│           Daftar Mahasiswa              │
│        Portal Mahasiswa                 │
│     Dicetak pada: Senin, 25 Desember... │
├─────────────────────────────────────────┤
│ Ringkasan Data:                         │
│ • Total Mahasiswa: 10                  │
│ • Jurusan: Teknik Informatika, SI...   │
│ • Semester: 1, 3, 5, 7, 9              │
│ • Rata-rata Semester: 5.2              │
├─────────────────────────────────────────┤
│ No │ Nama     │ NIM      │ Email │ ... │
├────┼──────────┼──────────┼───────┼─────┤
│ 1  │ Ahmad... │ 123456...│ ahm...│ ... │
│ 2  │ Siti...  │ 123456...│ sit...│ ... │
└────┴──────────┴──────────┴───────┴─────┘
```

### **CSV Format**
```csv
No,Nama Lengkap,NIM,Email,Jurusan,Semester
1,"Ahmad Rizki","1234567890","ahmad.rizki@example.com","Teknik Informatika",3
2,"Siti Nurhaliza","1234567891","siti.nurhaliza@example.com","Sistem Informasi",5
```

### **TXT Format**
```
Daftar Mahasiswa
Dicetak pada: Senin, 25 Desember 2023
Total Mahasiswa: 10
Jurusan: Teknik Informatika, Sistem Informasi, Manajemen, Akuntansi
Semester: 1, 3, 5, 7, 9
Rata-rata Semester: 5.2

No    Nama Lengkap                   NIM             Email                           Jurusan               Semester
==============================================================================================================
1     Ahmad Rizki                   1234567890      ahmad.rizki@example.com         Teknik Informatika    3
2     Siti Nurhaliza                1234567891      siti.nurhaliza@example.com      Sistem Informasi      5
```

## 🎨 **Styling Print:**

### **CSS Print Styles**
- **Page Size**: A4 dengan margin 1cm
- **Font**: Segoe UI dengan ukuran 12px
- **Colors**: Blue theme untuk header dan accent
- **Table**: Border dan alternating row colors
- **Responsive**: Auto-fit untuk berbagai ukuran kertas

### **Print Features**
- **Color Adjustment**: Exact color printing
- **Page Breaks**: Automatic page breaks untuk data panjang
- **Header/Footer**: Consistent pada setiap halaman
- **Background**: Preserved colors dan styling

## 🔧 **Teknis:**

### **Komponen yang Digunakan**
- `ExportOptions`: Komponen utama untuk semua fitur export
- `PrintMahasiswa`: Komponen khusus untuk print (legacy)
- CSS Print Media Queries untuk styling

### **File Generation**
- **CSV**: Blob dengan MIME type `text/csv`
- **TXT**: Blob dengan MIME type `text/plain`
- **Print**: HTML content di window baru

### **Browser Compatibility**
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Download**: Automatic file download dengan nama unik
- **Print**: Native browser print dialog

### **Performance**
- **Client-side**: Semua proses di browser
- **No Server**: Tidak memerlukan server untuk export
- **Fast**: Instant download dan print preview

## 📱 **Responsive Design**
- **Desktop**: Export options dalam horizontal layout
- **Tablet**: Export options dalam grid layout
- **Mobile**: Export options dalam vertical stack
- **Print**: Optimized untuk A4 paper size

## 🚀 **Use Cases:**

### **Administrasi**
- Cetak daftar mahasiswa untuk rapat
- Export data untuk laporan semester
- Backup data dalam format CSV

### **Analisis Data**
- Export ke Excel untuk analisis
- Import ke sistem lain via CSV
- Dokumentasi dalam format TXT

### **Laporan**
- Print untuk arsip fisik
- Export untuk laporan digital
- Sharing data dengan pihak terkait
