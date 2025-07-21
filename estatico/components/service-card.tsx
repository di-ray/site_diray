import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

const ServiceCard = ({ title, description, icon: Icon, href }: ServiceCardProps) => {
  return (
    <div className="solution-card bg-white rounded-lg shadow-md p-6">
      <div className="icon-container mb-4 text-primary">
        <Icon size={36} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link href={href} className="animated-underline text-secondary font-medium inline-flex items-center group">
        Saiba mais
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  )
}

export default ServiceCard
