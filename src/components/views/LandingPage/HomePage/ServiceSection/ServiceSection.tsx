import listServices from "./listServices";

const ServiceSection = () => {
  return (
    <section id="services" className="min-h-60 w-full max-w-7xl mx-auto">
      <div className="py-24 lg:py-36 px-4">
        <div className="flex flex-col gap-3 mb-14">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-center">
            Layanan apa yang kamu butuhkan?
          </h2>
          <p className="text-text-abu text-center lg:text-lg font-light">
            Temukan layanan yang sesuai dengan kebutuhanmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {listServices.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow border border-gray-200 transition-all duration-200 hover:border-green-400 hover:shadow-green-400 hover:shadow-lg/30 hover:-translate-y-1">
              <div className="aspect-square w-12 p-2 rounded-xl flex justify-center items-center bg-green-100 text-text-element">
                {item.icon}
              </div>

              <h1 className="font-semibold mt-6 lg:text-lg">
                {item.title}
              </h1>

              <p className="text-text-abu font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection;