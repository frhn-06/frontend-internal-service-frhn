import { CheckCircle, ClipboardList, UserPlus, Wrench } from "lucide-react";

const listSteps = [
  {
    number: "01",
    icon: <UserPlus className="w-full h-full" />,
    title: "Daftar & Ajukan",
    description:
      "Buat akun, login, lalu ajukan tiket berisi kendala atau kebutuhanmu.",
  },
  {
    number: "02",
    icon: <ClipboardList className="w-full h-full" />,
    title: "Proses Penanganan",
    description:
      "Agent menangani tiket atau meminta informasi dan tindakan tambahan darimu.",
  },
  {
    number: "03",
    icon: <Wrench className="w-full h-full" />,
    title: "Uji Solusi",
    description:
      "Coba solusi dari agent. Jika kendala belum teratasi, minta penanganan ulang.",
  },
  {
    number: "04",
    icon: <CheckCircle className="w-full h-full" />,
    title: "Konfirmasi Selesai",
    description:
      "Jika solusi berhasil, tutup tiket untuk mengakhiri proses penanganan.",
  },
];


export default listSteps;