"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitLead } from "@/lib/actions"

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void
  service?: string
  source?: string
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  company: string
  service?: string
  source?: string
  budget?: string
}

const LeadForm = ({ onSubmit, service = "", source = "Website" }: LeadFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service,
    source,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      // Enviar para o servidor
      const result = await submitLead(formData)

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Dados enviados com sucesso! Entraremos em contato em breve.",
        })

        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service,
          source,
        })

        // Chamar callback
        onSubmit(formData)
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "Erro ao enviar seus dados. Por favor, tente novamente.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Erro ao enviar seus dados. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-dark/50 p-6 rounded-lg border border-primary/20 mb-6 animate-fadeIn">
      <h3 className="text-xl font-bold mb-4 text-white">Preencha seus dados para visualizar o orçamento</h3>

      {submitStatus.success && (
        <div className="bg-green-900/20 border border-green-500/30 text-green-400 rounded-md p-4 mb-4">
          {submitStatus.message}
        </div>
      )}

      {submitStatus.success === false && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 rounded-md p-4 mb-4">
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
              Nome Completo*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
              E-mail*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-white text-sm font-medium mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-white text-sm font-medium mb-1">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-105"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar dados"}
        </Button>

        <p className="text-white/60 text-xs text-center">
          Seus dados estão seguros e não serão compartilhados com terceiros. Ao enviar, você concorda com nossa{" "}
          <a href="/politica-de-privacidade" className="text-primary underline">
            Política de Privacidade
          </a>
          .
        </p>
      </form>
    </div>
  )
}

export default LeadForm
