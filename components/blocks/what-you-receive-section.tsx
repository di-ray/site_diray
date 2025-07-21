"use client"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"

export function WhatYouReceiveSection({ items }) {
  return (
    <section className="bg-dark py-16 md:py-24 ">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">O que você recebe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items && items.map((item, index) => {
              const Icon = Icons[item.icon] || Icons.Gift;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 flex flex-col items-center">
                  <Icon className="text-primary mb-4" size={32} />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  {item.description && item.description.map((desc, i) => (
                    <p key={i} className="text-white font-medium mb-2">{desc}</p>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
