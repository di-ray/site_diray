interface ImageBackgroundProps {
  imageSrc: string
  overlayOpacity?: number
  illumination?: "red" | "purple" | "gradient" | "none"
}

const ImageBackground = ({ imageSrc, overlayOpacity = 0.7, illumination = "none" }: ImageBackgroundProps) => {
  return (
    <div className="absolute w-full h-full overflow-hidden ">
      <div className="absolute inset-0  bg-center" style={{ backgroundImage: `url(${imageSrc})` }}></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>

      {/* Illumination effects */}
      {illumination === "red" && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent opacity-70"></div>
      )}

      {illumination === "purple" && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-70"></div>
      )}

      {illumination === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent opacity-70"></div>
      )}
    </div>
  )
}

export default ImageBackground
