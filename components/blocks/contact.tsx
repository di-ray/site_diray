"use client"
import { tinaField } from "tinacms/dist/react"
import ContactForm from "@/components/contact-form"

export const ContactSection = (props) => {
  return (
    <section id="contato" className="py-20 md:py-32 architecture-bg">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="reveal">
            <h2
              data-tina-field={tinaField(props, "heading")}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              {props.heading}
            </h2>
            <p data-tina-field={tinaField(props, "subheading")} className="text-lg mb-8 text-white/80">
              {props.subheading}
            </p>
            <div className="space-y-6">
              {props.whatsapp && (
                <div className="flex items-start">
                  <div className="icon-container mr-4 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>{" "}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-white">Whatsapp</h3>
                    <p data-tina-field={tinaField(props, "whatsapp")} className="text-white/80">
                      {props.whatsapp}
                    </p>
                  </div>
                </div>
              )}
              {props.email && (
                <div className="flex items-start">
                  <div className="icon-container mr-4 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>{" "}
                      <polyline points="22,6 12,13 2,6"></polyline>{" "}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-white">E-mail</h3>
                    <p data-tina-field={tinaField(props, "email")} className="text-white/80">
                      {props.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-dark/50 rounded-lg border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
