import CTASection from "./CTASection";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import StepSection from "./StepSection";

interface TypeProps {
  name: string;
}

const HomePage = (props: TypeProps) => {
  const {
    name
  } = props;

  return (
    <div id="home" className="bg-blue-50/50">
      <HeroSection name={name} />

      <ServiceSection />

      <StepSection />

      <CTASection name={name} />
    </div>
  )
}

export default HomePage;