import SocialButtons from "./social-buttons"

interface ContactSectionProps {
  title?: string
  description?: string
  className?: string
  illumination?: "red" | "purple" | "gradient" | "none"
}

const ContactSection = ({
  title = "Entre em contato",
  description = "Estou pronto para ajudar sua empresa a alcançar o próximo nível.",
  className = "",
  illumination = "none",
}: ContactSectionProps) => {
  let illuminationClass = ""

  switch (illumination) {
    case "red":
      illuminationClass = "section-illumination-red"
      break
    case "purple":
      illuminationClass = "section-illumination-purple"
      break
    case "gradient":
      illuminationClass = "section-illumination-gradient"
      break
    default:
      illuminationClass = ""
  }

  return (
    <section id="contato" className={`py-20 md:py-32 bg-dark ${illuminationClass} ${className}`}>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-fadeIn">{title}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-white animate-fadeInUp delay-100">{description}</p>
        <SocialButtons />
      </div>
    </section>
  )
}

export default ContactSection
