import Link from "next/link";
import Image from "next/image";

interface TypeProps {
  name: string;
}
const HeroSection = (props: TypeProps) => {
  const {
    name
  } = props;
  return (
    <section className="min-h-60 w-full max-w-7xl mx-auto">
      <div className="py-24 lg:py-36 px-4 flex flex-col lg:flex-row gap-12">
        <div className="w-full flex-1">
          <h3 className="text-green-800 text-lg lg:text-xl bg-green-100 px-3 py-1 rounded-xl">
            {name.toUpperCase()} - INTERNAL SERVICE
          </h3>
          <h1 className="text-3xl lg:text-4xl my-4 font-medium">
            Semua kebutuhan internal, dalam satu tempat
          </h1>
          <p className="text-text-abu lg:text-lg">
            Sampaikan kendala dan ajukan permintaan layanan dengan lebih mudah.
          </p>
          <Link href={"/auth/login"} className="block w-fit mt-6 lg:text-lg px-2 py-1 rounded-lg bg-background-element text-white hover:bg-background-element-hover active:bg-background-element">
            Ajukan permintaan
          </Link>
        </div>

        <div className="flex-1">
          <Image 
            src={'/images/landing-page/logo-hero.png'} 
            alt="logo" 
            height={1080} 
            width={1080} 
            className="w-2/3 max-w-140 mx-auto" 
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection;