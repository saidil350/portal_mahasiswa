# Fitur Search & Filter - Portal Mahasiswa

## 🔍 **Fitur Pencarian yang Tersedia:**

### **1. Search Text Real-time**
- **Lokasi**: Kolom pertama di bagian atas tabel
- **Fungsi**: Mencari berdasarkan:
  - Nama mahasiswa
  - NIM (Nomor Induk Mahasiswa)
  - Email mahasiswa
  - Jurusan
- **Cara Kerja**: Pencarian bersifat case-insensitive dan real-time
- **Contoh**: Ketik "Ahmad" akan menampilkan semua mahasiswa dengan nama Ahmad

### **2. Filter Berdasarkan Jurusan**
- **Lokasi**: Dropdown kedua di bagian filter
- **Opsi**: 
  - "Semua Jurusan" (default)
  - Teknik Informatika
  - Sistem Informasi
  - Manajemen
  - Akuntansi
- **Cara Kerja**: Filter akan menampilkan hanya mahasiswa dari jurusan yang dipilih

### **3. Filter Berdasarkan Semester**
- **Lokasi**: Dropdown ketiga di bagian filter
- **Opsi**:
  - "Semua Semester" (default)
  - Semester 1-14 (berdasarkan data yang ada)
- **Cara Kerja**: Filter akan menampilkan hanya mahasiswa dari semester yang dipilih

### **4. Kombinasi Filter**
- **Multi-Filter**: Semua filter dapat dikombinasikan
- **Contoh**: 
  - Search: "Ahmad" + Jurusan: "Teknik Informatika" + Semester: "3"
  - Hasil: Mahasiswa bernama Ahmad dari Teknik Informatika semester 3

### **5. Reset Filter**
- **Lokasi**: Tombol "Hapus Filter" (ikon X)
- **Fungsi**: Mengembalikan semua filter ke kondisi default
- **Efek**: Menampilkan semua data mahasiswa

## 📊 **Indikator Visual:**

### **Filter Summary**
- **Lokasi**: Kotak abu-abu di bawah filter
- **Menampilkan**: Filter yang sedang aktif
- **Format**: Badge dengan warna primary
- **Contoh**: 
  - Pencarian: "Ahmad"
  - Jurusan: Teknik Informatika
  - Semester: 3

### **Counter Data**
- **Lokasi**: Deskripsi tabel
- **Format**: "Menampilkan X dari Y data"
- **Contoh**: "Menampilkan 3 dari 10 data"

### **Empty State**
- **Kondisi 1**: Belum ada data mahasiswa
  - Pesan: "Belum ada data mahasiswa"
- **Kondisi 2**: Filter tidak menghasilkan hasil
  - Pesan: "Tidak ada data yang sesuai dengan filter"

## 🎯 **Cara Penggunaan:**

### **Pencarian Sederhana**
1. Klik kolom search
2. Ketik nama, NIM, email, atau jurusan
3. Hasil akan muncul otomatis

### **Filter Berdasarkan Jurusan**
1. Klik dropdown "Pilih Jurusan"
2. Pilih jurusan yang diinginkan
3. Tabel akan terfilter otomatis

### **Filter Berdasarkan Semester**
1. Klik dropdown "Pilih Semester"
2. Pilih semester yang diinginkan
3. Tabel akan terfilter otomatis

### **Kombinasi Filter**
1. Gunakan search text untuk pencarian umum
2. Pilih jurusan spesifik
3. Pilih semester spesifik
4. Semua filter akan bekerja bersamaan

### **Reset Semua Filter**
1. Klik tombol "Hapus Filter"
2. Semua filter akan dikembalikan ke default
3. Semua data akan ditampilkan kembali

## 🔧 **Teknis:**

### **Komponen yang Digunakan**
- `SearchFilter`: Komponen utama untuk search dan filter
- `Select`: Komponen dropdown custom
- `Input`: Komponen input text
- `Button`: Komponen tombol

### **State Management**
- `searchTerm`: State untuk pencarian text
- `selectedJurusan`: State untuk filter jurusan
- `selectedSemester`: State untuk filter semester
- `filteredMahasiswa`: State untuk data yang sudah difilter

### **Performance**
- Filter berjalan di client-side untuk responsivitas tinggi
- Real-time update tanpa delay
- Optimized re-rendering dengan React hooks

## 📱 **Responsive Design**
- **Desktop**: Filter dalam 4 kolom horizontal
- **Tablet**: Filter dalam 2 kolom
- **Mobile**: Filter dalam 1 kolom vertikal
- **Semua ukuran**: Tombol dan input tetap mudah digunakan

## 🎨 **Styling**
- Menggunakan Tailwind CSS
- Konsisten dengan design system shadcn/ui
- Dark mode support
- Hover dan focus states yang jelas

