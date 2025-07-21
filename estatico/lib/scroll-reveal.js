export function initScrollReveal() {
  if (typeof window !== "undefined") {
    const revealElements = document.querySelectorAll(".reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          } else {
            entry.target.classList.remove("active")
          }
        })
      },
      { threshold: 0.1 }, // 10% do elemento visível
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }
}
