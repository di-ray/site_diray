export const initScrollReveal = () => {
  const revealElements = document.querySelectorAll(".reveal")

  const reveal = () => {
    const windowHeight = window.innerHeight
    for (let i = 0; i < revealElements.length; i++) {
      const element = revealElements[i] as HTMLElement
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
    }
  }

  window.addEventListener("scroll", reveal)
  reveal() // Initial check

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", reveal)
  }
}
