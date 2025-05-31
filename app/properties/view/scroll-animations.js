"use client"

// This script will be loaded on the client side to handle scroll animations
document.addEventListener("DOMContentLoaded", () => {
  // Scroll progress indicator
  const scrollProgress = document.getElementById("scroll-progress")
  const scrollToTop = document.getElementById("scroll-to-top")

  // Intersection Observer for subtle enhancements
  const fadeElements = document.querySelectorAll(".reveal-section")
  const propertyItems = document.querySelectorAll(".property-card")
  const detailElements = document.querySelectorAll(".property-detail-animation")
  const amenityItems = document.querySelectorAll(".amenity-item")

  // Create observer for fade-in elements
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe fade elements
  fadeElements.forEach((el) => {
    fadeObserver.observe(el)
  })

  // Create a separate observer for property items
  const propertyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
  )

  // Observe property items
  propertyItems.forEach((el) => {
    propertyObserver.observe(el)
  })

  // Create observer for detail elements with staggered animation
  const detailObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe detail elements
  detailElements.forEach((el) => {
    detailObserver.observe(el)
  })

  // Create observer for amenity items with staggered animation
  const amenityObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on index
          setTimeout(() => {
            entry.target.classList.add("visible")
          }, index * 100)

          // Stop observing after animation
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe amenity items
  amenityItems.forEach((el) => {
    amenityObserver.observe(el)
  })

  // Handle scroll events
  window.addEventListener("scroll", () => {
    // Update scroll progress
    if (scrollProgress) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercentage = (scrollTop / scrollHeight) * 100
      scrollProgress.style.width = `${scrollPercentage}%`
    }

    // Show/hide scroll to top button
    if (scrollToTop) {
      if (document.documentElement.scrollTop > 300) {
        scrollToTop.classList.add("visible")
      } else {
        scrollToTop.classList.remove("visible")
      }
    }
  })

  // Scroll to top button click handler
  if (scrollToTop) {
    scrollToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Handle image loading
  const propertyImages = document.querySelectorAll(".property-image")
  propertyImages.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded")
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded")
      })
    }
  })

  // Initialize image gallery navigation
  const galleryNavButtons = document.querySelectorAll(".image-gallery-nav")
  galleryNavButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent triggering parent click events
    })
  })
})
