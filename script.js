// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      // For sidebar sections, just scroll within sidebar
      if (target.closest(".sidebar")) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      } else {
        // For main content, scroll the main area
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Add CSS for scrolled navbar
const style = document.createElement("style")
style.textContent = `
    .navbar.scrolled {
        background-color: rgba(33, 37, 41, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`
document.head.appendChild(style)

// Animated counters for statistics
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Animate progress bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar")

  progressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width + "%"
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Trigger specific animations
      if (entry.target.id === "about") {
        setTimeout(animateCounters, 500)
      }

      if (entry.target.id === "skills") {
        setTimeout(animateProgressBars, 500)
      }
    }
  })
}, observerOptions)

// Observe sections for fade-in animation
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in")
  observer.observe(section)
})

// Contact form handling
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const message = document.getElementById("message").value.trim()

      // Simple validation
      if (!name || !email || !message) {
        showNotification("Please fill in all fields! 📝", "warning")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showNotification("Please enter a valid email address! 📧", "warning")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        showNotification("Thank you for your message! I'll get back to you soon! 🚀", "success")
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Scroll to top button
const scrollTopBtn = document.createElement("a")
scrollTopBtn.href = "#home"
scrollTopBtn.className = "scroll-top"
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
document.body.appendChild(scrollTopBtn)

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }
})

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-content h1")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 50)
  }
})

// Particle background effect (optional)
function createParticles() {
  const heroSection = document.querySelector(".hero-section")
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles-container"
  particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float-particle ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `
    particlesContainer.appendChild(particle)
  }

  heroSection.appendChild(particlesContainer)
}

// Add particle animation CSS
const particleStyle = document.createElement("style")
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
    }
`
document.head.appendChild(particleStyle)

// Initialize particles
createParticles()

// Active navigation link highlighting
function initializeActiveNavigation() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  // Update active nav on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section[id], .sidebar-section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Add active link styles
const navStyle = document.createElement("style")
navStyle.textContent = `
    .navbar-nav .nav-link.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
`
document.head.appendChild(navStyle)

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".cute-notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `cute-notification cute-notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  // Add notification styles
  const notificationStyles = `
        .cute-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 15px;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
            border-left: 4px solid var(--primary-color);
        }
        
        .cute-notification-success {
            border-left-color: var(--success-color);
        }
        
        .cute-notification-warning {
            border-left-color: var(--warning-color);
        }
        
        .cute-notification-danger {
            border-left-color: var(--danger-color);
        }
        
        .cute-notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-message {
            color: var(--dark-color);
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--gray-600);
            cursor: pointer;
            margin-left: 1rem;
            padding: 0;
            font-size: 0.8rem;
            transition: color 0.2s ease;
        }
        
        .notification-close:hover {
            color: var(--dark-color);
        }
    `

  // Add styles if not already added
  if (!document.querySelector("#notification-styles")) {
    const styleSheet = document.createElement("style")
    styleSheet.id = "notification-styles"
    styleSheet.textContent = notificationStyles
    document.head.appendChild(styleSheet)
  }

  // Add to DOM and show
  document.body.appendChild(notification)

  // Trigger animation
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 300)
    }
  }, 5000)
}

// Add some fun interactions
function addFunInteractions() {
  // Add hover effect to profile image
  const profileImg = document.querySelector(".profile-img")
  if (profileImg) {
    profileImg.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(5deg)"
    })

    profileImg.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
    })
  }

  // Add click effect to social links
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `

      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = e.clientX - rect.left - size / 2 + "px"
      ripple.style.top = e.clientY - rect.top - size / 2 + "px"

      this.style.position = "relative"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple animation CSS
  const rippleStyle = document.createElement("style")
  rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(rippleStyle)
}

// Initialize fun interactions
addFunInteractions()

// Add some easter eggs
let clickCount = 0
document.querySelector(".profile-img")?.addEventListener("click", () => {
  clickCount++
  if (clickCount === 5) {
    showNotification("🎉 You found the easter egg! You're awesome!", "success")
    clickCount = 0
  }
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Press 'h' to go to home
  if (e.key === "h" && !e.ctrlKey && !e.metaKey) {
    const homeSection = document.querySelector("#home")
    if (homeSection && !document.activeElement.matches("input, textarea")) {
      homeSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Press 'c' to focus contact form
  if (e.key === "c" && !e.ctrlKey && !e.metaKey) {
    const nameInput = document.querySelector("#name")
    if (nameInput && !document.activeElement.matches("input, textarea")) {
      nameInput.focus()
    }
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all animations and interactions
  initializeSkillBars()
  initializeContactForm()
  initializeActiveNavigation()

  console.log("🎉 Cute portfolio loaded successfully!")
})

// Animate skill bars when they come into view
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  // Create intersection observer for skill bars
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target
          const width = skillBar.getAttribute("data-width")

          // Animate the skill bar
          setTimeout(() => {
            skillBar.style.width = width + "%"
          }, 200)

          // Stop observing this element
          skillObserver.unobserve(skillBar)
        }
      })
    },
    {
      threshold: 0.5,
    },
  )

  // Observe all skill bars
  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
}

// Mobile sidebar functionality
function initializeMobileSidebar() {
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.querySelector(".sidebar")
  const contentArea = document.querySelector(".content-area")

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("show")

      // Update toggle icon
      const icon = this.querySelector("i")
      if (sidebar.classList.contains("show")) {
        icon.className = "fas fa-times"
      } else {
        icon.className = "fas fa-bars"
      }
    })

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 991.98) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove("show")
          sidebarToggle.querySelector("i").className = "fas fa-bars"
        }
      }
    })
  }
}

console.log("Portfolio loaded successfully! 🚀")
