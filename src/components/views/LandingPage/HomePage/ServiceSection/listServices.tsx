import { Building2, FileText, Headset, Monitor, Users, Wrench } from "lucide-react";

const listServices = [
    {
        icon: <Monitor className="w-full h-full" />,
        title: "IT & Teknologi",
        description: "Perangkat, aplikasi, dan jaringan."
    },
    {
        icon: <Users className="w-full h-full" />,
        title: "HR & Kepegawaian",
        description: "Administrasi karyawan dan kebutuhan HR."
    },
    {
        icon: <Building2 className="w-full h-full" />,
        title: "Fasilitas Kantor",
        description: "Sarana dan kebutuhan ruang kerja."
    },
    {
        icon: <FileText className="w-full h-full" />,
        title: "Administrasi",
        description: "Dokumen, surat-menyurat, dan administrasi."
    },
    {
        icon: <Wrench className="w-full h-full" />,
        title: "Pemeliharaan",
        description: "Perbaikan dan perawatan fasilitas."
    },
    {
        icon: <Headset className="w-full h-full" />,
        title: "Layanan Lainnya",
        description: "Kebutuhan internal lainnya."
    },
]

export default listServices;