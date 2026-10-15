import ScrollReveal from "@/components/animation/ScrollReveal";
import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import { IoMail } from "react-icons/io5"

interface TypeProps {
  nameApp: string;
}
const Footer = (props: TypeProps) => {
  const {
    nameApp
  } = props;

  return (
    <ScrollReveal variant="muncul">
      <footer className="p-4 bg-green-900">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 border-b p-4 border-b-white/50">
            <div className="flex-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-24">
                  <Image src={'/images/logo/logo-app-2.png'} alt="logo" width={720} height={720} className="w-full" />
                </div>
                <h1 className="text-white text-xl lg:text-2xl font-semibold">
                  {nameApp}
                </h1>
              </div>
              <p className="font-light text-white text-sm lg:text-base">
                Platform layanan internal untuk membantu kebutuhan dan kendala karyawan ditangani dengan lebih terarah.
              </p>
            </div>

            <div className="flex-1">
              <h3 className="text-lg lg:text-xl text-white mb-2">
                Navigasi
              </h3>
              <div className="flex flex-col">
                <Link href={"#home"} className="text-white transition hover:text-gray-300">
                  Beranda
                </Link>
                <Link href={"#services"} className="text-white transition hover:text-gray-300">
                  Layanan
                </Link>
                <Link href={"#steps"} className="text-white transition hover:text-gray-300">
                  Cara Kerja
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg lg:text-xl text-white mb-2">
                Terhubung
              </h3>
              <div className="flex gap-2">
                <Link 
                  href={"mailto:farhanmunif233@email.com"} 
                  className="text-white transition hover:text-gray-300"
                >
                  <IoMail className="w-8 h-8" />
                </Link>
                <Link 
                  href={"https://www.linkedin.com/in/farhan-munif-0167992b9/"} 
                  className="text-white transition hover:text-gray-300"
                >
                  <FaLinkedin className="w-8 h-8" />
                </Link>
                <Link 
                  href={"https://github.com/frhn-06/"} 
                  className="text-white transition hover:text-gray-300"
                >
                  <FaGithub className="w-8 h-8" />
                </Link>
                <Link 
                  href={"https://instagram.com/feiiiiiiiiii__/"} 
                  className="text-white transition hover:text-gray-300"
                >
                  <FaInstagram className="w-8 h-8" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-4 px-4">
            <p className="text-xs lg:text-sm text-gray-200 font-light">
              &copy;2026 | HelpDesk - frhn
            </p>
          </div>
        </div>

      </footer>
    </ScrollReveal>
  )
}

export default Footer