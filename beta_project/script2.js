// =================================
// MOBILE MENU & DROPDOWN FUNCTIONALITY
// =================================

// Get DOM elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Handle dropdown toggles in mobile
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    // Mobile dropdown functionality
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("active");

        // Close other dropdowns
        dropdowns.forEach((other) => {
          if (other !== dropdown) {
            other.classList.remove("active");
          }
        });
      }
    });
  });
});
// Close mobile menu when clicking on a regular link
document.querySelectorAll(".nav-menu > li > a:not(.dropdown-toggle)").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking on dropdown items
document.querySelectorAll(".dropdown-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    // Also close the dropdown
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// =================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =================================

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Stop observing after animation is triggered
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// =================================
// INTERACTIVE EFFECTS
// =================================

// Enhanced stat card hover effects
document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
    this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// CTA button enhanced effects
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)";
  });

  ctaButton.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
}

// =================================
// PARALLAX EFFECTS
// =================================

// Subtle parallax effect for hero section
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }

  ticking = false;
}

function requestParallaxUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener("scroll", requestParallaxUpdate);

// =================================
// PAGE LOADING EFFECTS
// =================================

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// =================================
// DYNAMIC CONTENT UPDATES
// =================================

// Dynamic year update in footer
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector(".footer-bottom p");

  if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} BPS Kota Malang. Semua hak dilindungi undang-undang.`;
  }
});

// =================================
// PERFORMANCE OPTIMIZATIONS
// =================================

// Throttle scroll events for better performance
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, 100);

window.addEventListener("scroll", throttledScrollHandler);

// =================================
// ACCESSIBILITY IMPROVEMENTS
// =================================

// Add keyboard navigation for mobile menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Focus management for mobile menu
hamburger.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    navMenu.querySelector("a").focus();
  }
});

// =================================
// ERROR HANDLING
// =================================

// Global error handler for better user experience
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error);
  // You can add user-friendly error messaging here
});

// Handle missing elements gracefully
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Element with selector "${selector}" not found`);
    return null;
  }
}

// =================================
// UTILITY FUNCTIONS
// =================================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// =================================
// INITIALIZATION
// =================================

// Initialize all functionality when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Virtual Simfoni BPS Kota Surabaya website loaded successfully");

  // Add any initialization code here
  // All event listeners are already set up above
});
// ...existing code...

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel__slide");
  const navButtons = document.querySelectorAll(".carousel__navigation-button");
  const viewport = document.querySelector(".carousel__viewport");

  // Update active navigation dot
  function updateActiveNav() {
    const scrollLeft = viewport.scrollLeft;
    const slideWidth = slides[0].offsetWidth;
    const currentSlide = Math.round(scrollLeft / slideWidth);

    navButtons.forEach((button, index) => {
      button.style.backgroundColor = index === currentSlide ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)";
    });
  }

  // Listen for scroll events
  if (viewport) {
    viewport.addEventListener("scroll", updateActiveNav);
    // Initialize
    updateActiveNav();
  }

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!viewport || slides.length === 0) return;
    const currentScroll = viewport.scrollLeft;
    const slideWidth = slides[0].offsetWidth;

    if (e.key === "ArrowLeft") {
      viewport.scrollTo({
        left: Math.max(0, currentScroll - slideWidth),
        behavior: "smooth",
      });
    } else if (e.key === "ArrowRight") {
      viewport.scrollTo({
        left: Math.min((slides.length - 1) * slideWidth, currentScroll + slideWidth),
        behavior: "smooth",
      });
    }
  });

  // Navigation button click handlers
  navButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (!slides.length || !viewport) return;
      const slideWidth = slides[0].offsetWidth;
      viewport.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    });
  });
});
function toggleDropdown(element) {
  // Close all other dropdowns first
  const allDropdowns = document.querySelectorAll(".dropdown-content");
  const allToggles = document.querySelectorAll(".dropdown-toggle");

  allDropdowns.forEach((dropdown) => {
    if (dropdown !== element.nextElementSibling) {
      dropdown.classList.remove("show");
    }
  });

  allToggles.forEach((toggle) => {
    if (toggle !== element) {
      toggle.classList.remove("active");
    }
  });

  // Toggle current dropdown
  const dropdownContent = element.nextElementSibling;
  dropdownContent.classList.toggle("show");
  element.classList.toggle("active");
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    const allDropdowns = document.querySelectorAll(".dropdown-content");
    const allToggles = document.querySelectorAll(".dropdown-toggle");

    allDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });

    allToggles.forEach((toggle) => {
      toggle.classList.remove("active");
    });
  }
});

// =================================
// CARD SCROLL ANIMATION
// =================================
const observerOptionsCard = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptionsCard);

// Observe all cards with .system-card or .special-card class
document.querySelectorAll(".system-card, .special-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";
  cardObserver.observe(card);
});
