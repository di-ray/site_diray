"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Simulando envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Limpar formulário e mostrar mensagem de sucesso
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
      })
      setSubmitSuccess(true)

      // Esconder mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitSuccess && (
        <div className="bg-green-900/20 border border-green-500/30 text-green-400 rounded-md p-4 mb-4">
          Mensagem enviada com sucesso! Entrarei em contato em breve.
        </div>
      )}

      {submitError && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 rounded-md p-4 mb-4">{submitError}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1 text-white">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1 text-white">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  )
}

export default ContactForm
