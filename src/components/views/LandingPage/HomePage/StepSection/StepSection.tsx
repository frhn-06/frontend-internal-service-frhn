import ScrollReveal from "@/components/animation/ScrollReveal";
import listSteps from "./listSteps";

const StepSection = () => {
  return (
    <section id="steps" className="min-h-60 w-full max-w-7xl mx-auto">
      <div className="py-24 lg:py-36 px-4">
        <ScrollReveal variant="keatas">
          <div className="flex flex-col gap-3 mb-14">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-center">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-text-abu text-center lg:text-lg font-light">
              Layanan yang mudah, dari awal hingga selesai.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listSteps.map((item, i) => (
              <ScrollReveal key={i} variant="item" controlledByParent>
                <div>
                  <div className="mx-auto mb-1 aspect-square w-12 p-2 rounded-xl flex justify-center items-center bg-green-100 text-text-element">
                    {item.icon}
                  </div>
                  <h3 className="lg:text-lg text-center font-semibold">
                    {item.number}
                  </h3>
                  <h4 className="lg:text-lg text-center font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-xs lg:text-sm text-center text-text-abu">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default StepSection;