/**
 * Logo carousel animation
 */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("logo-carousel")
  if (!carousel) return

  let scrollAmount = 0
  const speed = 0.5
  let lastTime = 0

  function step(timestamp) {
    if (!lastTime) lastTime = timestamp
    const deltaTime = timestamp - lastTime
    lastTime = timestamp

    scrollAmount += (speed * deltaTime) / 16

    if (scrollAmount >= carousel.scrollWidth / 2) {
      scrollAmount = 0
    }

    carousel.scrollLeft = scrollAmount

    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
})

/**
 * FAQ accordion functionality
 */
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling
      const icon = this.querySelector(".faq-icon")

      // Toggle answer visibility
      answer.classList.toggle("hidden")

      // Rotate icon
      if (answer.classList.contains("hidden")) {
        icon.style.transform = "rotate(0deg)"
      } else {
        icon.style.transform = "rotate(180deg)"
      }
    })
  })
})

/**
 * Scroll reveal animation
 */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal")

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", revealOnScroll)

  // Initial check
  revealOnScroll()
})

/**
 * Header scroll effect
 */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".js-header")
  if (!header) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("bg-white/95", "shadow-sm", "backdrop-blur-lg")
      header.classList.remove("bg-transparent")
    } else {
      header.classList.remove("bg-white/95", "shadow-sm", "backdrop-blur-lg")
      header.classList.add("bg-transparent")
    }
  })
})

/**
 * Mobile menu toggle
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (!menuToggle || !mobileMenu) return

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")

    // Update toggle icon
    const icon = menuToggle.querySelector("svg")
    if (mobileMenu.classList.contains("hidden")) {
      icon.innerHTML =
        '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>'
    } else {
      icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
    }
  })
})

/**
 * Smooth scroll for anchor links
 */
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })

        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobile-menu")
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
          const menuToggle = document.getElementById("mobile-menu-toggle")
          if (menuToggle) {
            const icon = menuToggle.querySelector("svg")
            icon.innerHTML =
              '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>'
          }
        }
      }
    })
  })
})
