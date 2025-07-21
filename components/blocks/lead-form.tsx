"use client"

import { useState } from "react"

export interface LeadFormProps {
  title?: string
  description?: string
  service?: string
  source?: string
  showBudgetField?: boolean
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  company: string
  message?: string
  service?: string
  source?: string
  budget?: string
}

export function LeadForm({ 
  title = "Entre em contato", 
  description = "Preencha o formulário abaixo e entraremos em contato em breve.",
  service = "", 
  source = "Website",
  showBudgetField = false
}: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    service,
    source,
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      // Simular envio para API (você pode implementar a lógica real aqui)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        })

        // Limpar formulário após sucesso
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          service,
          source,
          budget: "",
        })
      } else {
        throw new Error('Erro no envio')
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 md:py-32 bg-dark section-illumination-red">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-white/80 mb-8">
                {description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="icon-container text-primary mt-1">
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">WhatsApp</h4>
                    <p className="text-white/80">+55 (11) 99638-6103</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="icon-container text-primary mt-1">
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
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">E-mail</h4>
                    <p className="text-white/80">contato@diray.com.br</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark/50 p-6 rounded-lg border border-primary/20">
                <h4 className="text-lg font-bold text-white mb-3">Horário de Atendimento</h4>
                <p className="text-white/80">Segunda a Sexta: 9h às 18h</p>
                <p className="text-white/80">Sábado: 9h às 12h</p>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-dark/50 backdrop-blur-sm p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300">
              {submitStatus.success && (
                <div className="form-success mb-6 animate-fadeIn">
                  {submitStatus.message}
                </div>
              )}

              {submitStatus.success === false && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 rounded-md p-4 mb-6 animate-fadeIn">
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="form-container space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-field">
                    <label htmlFor="name" className="form-label">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" className="form-label">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-field">
                    <label htmlFor="phone" className="form-label">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="company" className="form-label">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                {showBudgetField && (
                  <div className="form-field">
                    <label htmlFor="budget" className="form-label">
                      Orçamento Estimado
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Selecione uma faixa</option>
                      <option value="ate-10k">Até R$ 10.000</option>
                      <option value="10k-25k">R$ 10.000 - R$ 25.000</option>
                      <option value="25k-50k">R$ 25.000 - R$ 50.000</option>
                      <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                      <option value="acima-100k">Acima de R$ 100.000</option>
                    </select>
                  </div>
                )}

                <div className="form-field">
                  <label htmlFor="message" className="form-label">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="form-input"
                    placeholder="Conte-nos sobre seu projeto, necessidades ou dúvidas..."
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit cta-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </button>

                <p className="text-white/60 text-xs text-center">
                  Seus dados estão seguros e não serão compartilhados com terceiros. Ao enviar, você concorda com nossa{" "}
                  <a href="/politica-de-privacidade" className="text-primary hover:underline animated-underline">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}