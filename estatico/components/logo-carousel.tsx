"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const LogoCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let scrollAmount = 0
    const speed = 0.5
    let lastTime = 0
    let animationId: number

    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const deltaTime = timestamp - lastTime
      lastTime = timestamp

      scrollAmount += (speed * deltaTime) / 16

      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0
      }

      carousel.scrollLeft = scrollAmount
      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="w-full flex justify-center items-center">
      <Image src="/images/client-logos.png" alt="Client Logos" width={600} height={50} className="client-logos" />
    </div>
  )
}

export default LogoCarousel
