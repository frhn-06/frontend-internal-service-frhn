import ScrollReveal from "@/components/animation/ScrollReveal";
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface TypeProps {
  name: string;
}
const CTASection = (props: TypeProps) => {
  const {
    name
  } = props;

  return(
    <div className="py-24 lg:py-36 px-4">
      <ScrollReveal variant="membesar">
        <div className="w-full max-w-3xl mx-auto rounded-2xl bg-background-element p-8 flex flex-col items-center gap-2">
          <h1 className="text-lg lg:text-xl font-semibold text-white">
            Ada kebutuhan atau kendala?  
          </h1>
          <p className="text-white mb-4">
            Ajukan tiket melalui {name} - Internal Service dan pantau proses penanganannya dengan mudah.
          </p>
          <Link href={'/auth/register'} className="bg-white px-3 py-2 rounded-lg font-medium text-text-element transition hover:bg-white/90 active:bg-white">
            Mulai Ajukan Ticket <MoveRight className="inline" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  )
}

export default CTASection;