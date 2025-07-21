import Image from "next/image"

interface TestimonialCardProps {
  content: string
  author: {
    name: string
    role: string
    company: string
    image: string
  }
}

const TestimonialCard = ({ content, author }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary/20"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
        </svg>
      </div>
      <p className="text-dark mb-6 italic">{content}</p>
      <div className="flex items-center">
        <div className="mr-4">
          <Image
            src={author.image || "/placeholder.svg"}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div>
          <h4 className="font-bold">{author.name}</h4>
          <p className="text-sm text-muted-foreground">
            {author.role}, {author.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
