"use client"
import type React from "react"
import { useRef, useEffect, useCallback } from "react"

interface VideoBackgroundProps {
  videoSrc: string
  overlayOpacity?: number
  startTime?: number
  endTime?: number
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  overlayOpacity = 0.5,
  startTime = 70,
  endTime = 76,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

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
      const handleLoadedMetadata = () => {
        if (video.duration < endTime) {
          console.warn(`O tempo final (${endTime}s) é maior que a duração do vídeo (${video.duration}s). Ajustando...`)
          endTime = video.duration
        }
        startVideoAtTime()
      }

      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.currentTime = startTime
          video.play().catch((error) => {
            console.error("Erro ao reiniciar o vídeo:", error)
          })
        }
      }

      video.addEventListener("loadedmetadata", handleLoadedMetadata)
      video.addEventListener("timeupdate", handleTimeUpdate)

      if (video.readyState >= 2) {
        handleLoadedMetadata()
      }

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