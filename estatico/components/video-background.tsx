"use client"
import type React from "react"
import { useRef, useEffect, useCallback } from "react"

interface VideoBackgroundProps {
  videoSrc: string
  overlayOpacity?: number
  startTime?: number // Tempo inicial em segundos
  endTime?: number // Tempo final em segundos
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  overlayOpacity = 0.5,
  startTime = 70, // 1:10 em segundos
  endTime = 76, // 1:16 em segundos
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Função para iniciar o vídeo no tempo correto
  const startVideoAtTime = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.currentTime = startTime
      video.play().catch((error) => {
        console.error("Erro ao iniciar o vídeo:", error)
      })
    }
  }, [startTime])

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      // Manipula o evento de metadados carregados
      const handleLoadedMetadata = () => {
        if (video.duration < endTime) {
          console.warn(`O tempo final (${endTime}s) é maior que a duração do vídeo (${video.duration}s). Ajustando...`)
          endTime = video.duration
        }
        startVideoAtTime()
      }

      // Controla o loop entre startTime e endTime
      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.currentTime = startTime
          video.play().catch((error) => {
            console.error("Erro ao reiniciar o vídeo:", error)
          })
        }
      }

      // Adiciona listeners
      video.addEventListener("loadedmetadata", handleLoadedMetadata)
      video.addEventListener("timeupdate", handleTimeUpdate)

      // Tenta iniciar o vídeo imediatamente caso já esteja carregado
      if (video.readyState >= 2) {
        handleLoadedMetadata()
      }

      // Limpeza dos listeners
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata)
        video.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [startTime, endTime, startVideoAtTime])

  return (
    <div className="absolute inset-0 z-0">
      <video ref={videoRef} muted playsInline className="w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }} />
    </div>
  )
}

export default VideoBackground
