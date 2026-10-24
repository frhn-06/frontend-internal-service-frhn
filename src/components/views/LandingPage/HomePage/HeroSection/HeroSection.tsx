import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/animation/ScrollReveal";

interface TypeProps {
  name: string;
}
const HeroSection = (props: TypeProps) => {
  const {
    name
  } = props;
  return (
    <section className="min-h-180 w-full max-w-9xl mx-auto bg-[url(/images/landing-page/bg-hero.png)] bg-cover relative">
      <div className="inset-0 absolute bg-radial-[at_25%_25%] from-white/30 to-zinc-900/60 to-75%">

      </div>
      <div className="h-full w-full max-w-7xl mx-auto relative">
        <div className="py-46 lg:py-56 px-4 flex flex-col lg:flex-row gap-12">
          <ScrollReveal className="flex-1" variant="kekanan">
            <div className="bg-black/40 p-2 rounded-xl">
              <h3 className="text-green-800 md:text-lg lg:text-xl bg-green-100 px-3 py-1 rounded-xl">
                {name.toUpperCase()} - INTERNAL SERVICE
              </h3>
              <h1 className="text-2xl md:text-3xl lg:text-4xl my-4 font-medium text-gray-100">
                Semua kebutuhan internal, dalam satu tempat
              </h1>
              <p className="lg:text-lg text-gray-300">
                Sampaikan kendala dan ajukan permintaan layanan dengan lebih mudah.
              </p>
              <Link href={"/auth/login"} className="block w-fit mt-6 lg:text-lg px-2 py-1 rounded-lg bg-background-element text-white hover:bg-background-element-hover active:bg-background-element">
                Ajukan permintaan
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal className="flex-1" variant="kekiri">
            <div>
              <Image 
                src={'/images/landing-page/logo-hero.png'} 
                alt="logo" 
                height={1080} 
                width={1080} 
                className="w-2/3 max-w-100 mx-auto Animasi-logo-hero" 
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;