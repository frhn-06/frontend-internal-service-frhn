# HelpDesk Internal Service — Frontend

Frontend untuk **Internal Service**, sebuah platform layanan internal perusahaan yang memudahkan employee mengajukan permintaan layanan, berkomunikasi dengan agent melalui sistem tiket, dan memantau proses penanganan secara realtime.

Aplikasi ini menyediakan dashboard sesuai role, manajemen tiket, notifikasi realtime, serta fitur AI Generate Reply untuk membantu agent menyusun draf balasan.

## Preview Aplikasi

### Dashboard Admin

![Dashboard Admin](/public/images/readme/dashboard.png)

### Halaman Login

![Manajemen Tiket Employee](/public/images/readme/ticket.png)

### Percakapan Tiket dan AI Generate Reply

![Percakapan Tiket dan AI Generate Reply](/public/images/readme/message.png)

## Fitur Utama

- **Autentikasi:** Login dan registrasi employee.
- **Role-Based Access:** Halaman dan fitur berdasarkan role Admin, Agent, dan Employee.
- **Dashboard:** Menampilkan statistik dan informasi tiket sesuai role.
- **Manajemen Tiket:** Membuat tiket, mengambil tiket, memperbarui status, dan memantau penanganan.
- **Percakapan Tiket:** Komunikasi antara employee dan agent dalam satu konteks tiket.
- **Notifikasi Realtime:** Menerima notifikasi aktivitas melalui Socket.IO.
- **AI Generate Reply:** Membantu agent menyusun draf balasan.
- **Manajemen Data:** Pengelolaan department, kategori layanan, agent, dan employee oleh Admin.
- **Responsive UI:** Antarmuka yang dirancang untuk berbagai ukuran layar.

## Teknologi yang Digunakan

| Teknologi               | Kegunaan                           |
| ----------------------- | ---------------------------------- |
| Next.js 16 (App Router) | Framework frontend                 |
| React 19                | Membangun antarmuka                |
| TypeScript              | Type safety                        |
| Tailwind CSS v4         | Styling                            |
| HeroUI                  | Komponen UI                        |
| NextAuth.js v5          | Autentikasi                        |
| TanStack React Query    | Pengelolaan server state dan cache |
| Axios                   | HTTP requests ke backend           |
| React Hook Form         | Pengelolaan form                   |
| Yup                     | Validasi form                      |
| Socket.IO Client        | Komunikasi realtime                |
| Motion                  | Animasi UI                         |
| Lucide React            | Ikon                               |
| React Icons             | Koleksi ikon tambahan              |
| Recharts                | Visualisasi data                   |
| React CountUp           | Animasi angka statistik            |
| clsx                    | Pengelolaan conditional class      |
| tailwind-merge          | Menggabungkan class Tailwind       |

## Role dan Fitur

### Admin

- Dashboard
- Melihat dan memantau tiket
- Manajemen department
- Manajemen kategori layanan
- Manajemen agent
- Manajemen employee
- Profil

### Agent

- Dashboard dan statistik tiket
- Melihat serta menangani tiket
- Berkomunikasi dengan employee
- Menerima notifikasi realtime
- Menggunakan AI Generate Reply untuk membantu menyusun balasan
- Profil

### Employee

- Dashboard
- Membuat dan memantau tiket
- Berkomunikasi dengan agent
- Melihat notifikasi realtime
- Memperbarui status tiket sesuai alur yang tersedia
- Profil

## Prasyarat

Pastikan perangkat telah memiliki:

- Node.js versi 22 atau versi kompatibel.
- npm.
- Git.
- Backend Internal Service yang dapat diakses.

## Instalasi

Clone repository frontend:

```bash
git clone https://github.com/frhn-06/frontend-internal-service-frhn
cd frontend-internal-service-frhn
npm install
```

## Konfigurasi Environment

Buat file `.env.local` di root project, sejajar dengan `package.json`.

```env
NEXT_PUBLIC_API_URL=
AUTH_SECRET=
NEXT_PUBLIC_API_URL_LOCAL=
NEXT_PUBLIC_URL_SOCKET_BACKEND=
```

Keterangan:

| Variabel                         | Kegunaan                                                                |
| -------------------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`            | URL API backend untuk lingkungan utama.                                 |
| `AUTH_SECRET`                    | Secret untuk kebutuhan autentikasi NextAuth.                            |
| `NEXT_PUBLIC_API_URL_LOCAL`      | URL API backend untuk pengembangan lokal, sesuai implementasi aplikasi. |
| `NEXT_PUBLIC_URL_SOCKET_BACKEND` | URL backend untuk koneksi Socket.IO.                                    |

Isi nilai setiap variabel sesuai konfigurasi lokal atau production.

**Keamanan:** Jangan mengunggah `.env.local` ke repository. Jangan memasukkan secret atau kredensial sensitif ke README. Variabel berawalan `NEXT_PUBLIC_` dapat terekspos ke browser sehingga tidak boleh berisi informasi rahasia.

## Menjalankan Aplikasi

Jalankan development server:

```bash
npm run dev
```

Secara default, aplikasi dapat diakses melalui:

`http://localhost:3000`

Untuk membuat build production:

```bash
npm run build
```

Untuk menjalankan build production secara lokal:

```bash
npm run start
```

Untuk menjalankan pemeriksaan ESLint:

```bash
npm run lint
```

## Integrasi Backend

Frontend menggunakan REST API untuk mengambil dan mengirim data ke backend Internal Service. Socket.IO digunakan untuk mendukung komunikasi dan notifikasi realtime.

- **Backend API:** `https://backend-internal-service.vercel.app/api`
- **Swagger UI:** `https://backend-internal-service.vercel.app/api-doc`

Pastikan URL API dan Socket.IO telah dikonfigurasi dengan benar sebelum menjalankan aplikasi.

## Akun Demo

Akun berikut dapat digunakan untuk mencoba aplikasi pada lingkungan demo.

| Role     | Username     | Email                | Password      |
| -------- | ------------ | -------------------- | ------------- |
| Admin    | `Admin`      | `admin@gmail.com`    | `Admin123`    |
| Agent    | `Agent IT 1` | `agentit1@gmail.com` | `Agentit123`  |
| Employee | `Employee`   | `employee@gmail.com` | `Employee123` |

Gunakan akun demo hanya pada lingkungan yang memang disediakan untuk demonstrasi. Pastikan akun tersebut tidak memiliki akses ke data sensitif.

## Deployment

- **Frontend:** `https://frontend-internal-service-frhn.vercel.app`
- **Backend API:** `https://backend-internal-service.vercel.app/api`
- **Dokumentasi API:** `https://backend-internal-service.vercel.app/api-doc`

Frontend dapat di-deploy menggunakan Vercel atau platform lain yang mendukung Next.js.

Pastikan seluruh environment variables telah dikonfigurasi melalui pengaturan environment pada platform deployment.

## Lisensi

Lisensi belum ditentukan.
