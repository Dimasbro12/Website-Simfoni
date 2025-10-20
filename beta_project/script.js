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
    footerText.innerHTML = `&copy; ${currentYear} BPS Kota Surabaya. Semua hak dilindungi undang-undang.`;
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

mobiscroll.setOptions({
  theme: "ios",
  themeVariant: "light",
});

var oldEvent;
var tempEvent = {};
var deleteEvent;
var restoreEvent;
var colorPicker;
var tempColor;
var titleInput = document.getElementById("event-title");
var descriptionTextarea = document.getElementById("event-desc");
var allDaySwitch = document.getElementById("event-all-day");
var freeSegmented = document.getElementById("event-status-free");
var busySegmented = document.getElementById("event-status-busy");
var deleteButton = document.getElementById("event-delete");
var colorSelect = document.getElementById("event-color-picker");
var pickedColor = document.getElementById("event-color");
var colorElms = document.querySelectorAll(".crud-color-c");
var travelTime = document.getElementById("travel-time-selection");
var datePickerResponsive = {
  medium: {
    controls: ["calendar"],
    touchUi: false,
  },
};
var datetimePickerResponsive = {
  medium: {
    controls: ["calendar", "time"],
    touchUi: false,
  },
};
var myData = [
  {
    id: 1,
    start: "2025-10-08T13:00",
    end: "2025-10-08T13:45",
    title: "Lunch @ Butcher's",
    description: "",
    allDay: false,
    bufferBefore: 15,
    free: true,
    color: "#009788",
  },
  {
    id: 2,
    start: "2025-10-05T15:00",
    end: "2025-10-05T16:00",
    title: "Conference",
    description: "",
    allDay: false,
    bufferBefore: 30,
    free: false,
    color: "#ff9900",
  },
  {
    id: 3,
    start: "2025-10-04T18:00",
    end: "2025-10-04T22:00",
    title: "Site Visit",
    description: "",
    allDay: false,
    bufferBefore: 60,
    free: true,
    color: "#3f51b5",
  },
  {
    id: 4,
    start: "2025-10-06T10:30",
    end: "2025-10-06T11:30",
    title: "Stakeholder mtg.",
    description: "",
    allDay: false,
    free: false,
    color: "#f44437",
  },
];

function createAddPopup(elm) {
  // Hide delete button inside add popup
  deleteButton.style.display = "none";

  deleteEvent = true;
  restoreEvent = false;

  // Set popup header text and buttons for adding
  popup.setOptions({
    headerText: "New event",
    buttons: [
      "cancel",
      {
        text: "Add",
        keyCode: "enter",
        handler: function () {
          calendar.updateEvent({
            id: tempEvent.id,
            title: tempEvent.title,
            description: tempEvent.description,
            allDay: tempEvent.allDay,
            bufferBefore: travelTime.value,
            start: tempEvent.start,
            end: tempEvent.end,
            color: tempEvent.color,
          });
          // Navigate the calendar to the correct view
          calendar.navigateToEvent(tempEvent);
          deleteEvent = false;
          popup.close();
        },
        cssClass: "mbsc-popup-button-primary",
      },
    ],
  });

  // Fill popup with a new event data
  mobiscroll.getInst(titleInput).value = tempEvent.title;
  mobiscroll.getInst(descriptionTextarea).value = "";
  mobiscroll.getInst(allDaySwitch).checked = false;
  range.setVal([tempEvent.start, tempEvent.end]);
  mobiscroll.getInst(busySegmented).checked = true;
  range.setOptions({ controls: ["date"], responsive: datePickerResponsive });
  pickedColor.style.background = "";
  travelTime.value = 0;

  // Set anchor for the popup
  popup.setOptions({ anchor: elm });

  popup.open();
}

function createEditPopup(args) {
  var ev = args.event;

  // Show delete button inside edit popup
  deleteButton.style.display = "block";

  deleteEvent = false;
  restoreEvent = true;

  // Set popup header text and buttons for editing
  popup.setOptions({
    headerText: "Edit event",
    buttons: [
      "cancel",
      {
        text: "Save",
        keyCode: "enter",
        handler: function () {
          var date = range.getVal();
          var eventToSave = {
            id: ev.id,
            title: titleInput.value,
            description: descriptionTextarea.value,
            allDay: mobiscroll.getInst(allDaySwitch).checked,
            bufferBefore: travelTime.value,
            start: date[0],
            end: date[1],
            free: mobiscroll.getInst(freeSegmented).checked,
            color: ev.color,
          };
          // Update event with the new properties on save button click
          calendar.updateEvent(eventToSave);
          // Navigate the calendar to the correct view
          calendar.navigateToEvent(eventToSave);
          restoreEvent = false;
          popup.close();
        },
        cssClass: "mbsc-popup-button-primary",
      },
    ],
  });

  // Fill popup with the selected event data
  mobiscroll.getInst(titleInput).value = ev.title || "";
  mobiscroll.getInst(descriptionTextarea).value = ev.description || "";
  mobiscroll.getInst(allDaySwitch).checked = ev.allDay || false;
  range.setVal([ev.start, ev.end]);
  pickedColor.style.background = ev.color || "";
  travelTime.value = ev.bufferBefore !== undefined ? ev.bufferBefore : 0;

  if (ev.free) {
    mobiscroll.getInst(freeSegmented).checked = true;
  } else {
    mobiscroll.getInst(busySegmented).checked = true;
  }

  // Change range settings based on the allDay
  range.setOptions({
    controls: ev.allDay ? ["date"] : ["datetime"],
    responsive: ev.allDay ? datePickerResponsive : datetimePickerResponsive,
  });

  // Set anchor for the popup
  popup.setOptions({ anchor: args.domEvent.currentTarget });
  popup.open();
}

var calendar = mobiscroll.eventcalendar("#demo-add-delete-event", {
  clickToCreate: "double",
  dragToCreate: true,
  dragToMove: true,
  dragToResize: true,
  view: {
    calendar: { labels: true },
  },
  data: myData,
  onEventClick: function (args) {
    oldEvent = Object.assign({}, args.event);
    tempEvent = args.event;

    if (!popup.isVisible()) {
      createEditPopup(args);
    }
  },
  onEventCreated: function (args) {
    popup.close();
    // Store temporary event
    tempEvent = args.event;
    createAddPopup(args.target);
  },
  onEventDeleted: function (args) {
    mobiscroll.snackbar({
      button: {
        action: function () {
          calendar.addEvent(args.event);
        },
        text: "Undo",
      },
      message: "Event deleted",
    });
  },
});

var popup = mobiscroll.popup("#demo-add-popup", {
  display: "bottom",
  contentPadding: false,
  fullScreen: true,
  onClose: function () {
    if (deleteEvent) {
      calendar.removeEvent(tempEvent);
    } else if (restoreEvent) {
      calendar.updateEvent(oldEvent);
    }
  },
  responsive: {
    medium: {
      display: "anchored",
      width: 400,
      fullScreen: false,
      touchUi: false,
    },
  },
});

titleInput.addEventListener("input", function (ev) {
  // Update current event's title
  tempEvent.title = ev.target.value;
});

descriptionTextarea.addEventListener("change", function (ev) {
  // Update current event's title
  tempEvent.description = ev.target.value;
});

allDaySwitch.addEventListener("change", function () {
  var checked = this.checked;

  var travelTimeGroup = document.querySelector("#travel-time-group");
  if (checked) {
    travelTimeGroup.style.display = "none";
    travelTime.value = 0;
  } else {
    travelTimeGroup.style.display = "flex";
  }

  // Change range settings based on the allDay
  range.setOptions({
    controls: checked ? ["date"] : ["datetime"],
    responsive: checked ? datePickerResponsive : datetimePickerResponsive,
  });

  // Update current event's allDay property
  tempEvent.allDay = checked;
});

var range = mobiscroll.datepicker("#event-date", {
  controls: ["date"],
  select: "range",
  startInput: "#start-input",
  endInput: "#end-input",
  showRangeLabels: false,
  touchUi: true,
  responsive: datePickerResponsive,
  onChange: function (args) {
    var date = args.value;
    // Update event's start date
    tempEvent.start = date[0];
    tempEvent.end = date[1];
  },
});

document.querySelectorAll("input[name=event-status]").forEach(function (elm) {
  elm.addEventListener("change", function () {
    // Update current event's free property
    tempEvent.free = mobiscroll.getInst(freeSegmented).checked;
  });
});

deleteButton.addEventListener("click", function () {
  // Delete current event on button click
  calendar.removeEvent(tempEvent);

  // Save a local reference to the deleted event
  var deletedEvent = tempEvent;

  popup.close();

  mobiscroll.snackbar({
    button: {
      action: function () {
        calendar.addEvent(deletedEvent);
      },
      text: "Undo",
    },
    message: "Event deleted",
  });
});

colorPicker = mobiscroll.popup("#demo-event-color", {
  display: "bottom",
  contentPadding: false,
  showArrow: false,
  showOverlay: false,
  buttons: [
    "cancel",
    {
      text: "Set",
      keyCode: "enter",
      handler: function () {
        setSelectedColor();
      },
      cssClass: "mbsc-popup-button-primary",
    },
  ],
  responsive: {
    medium: {
      display: "anchored",
      anchor: document.getElementById("event-color-cont"),
      buttons: {},
    },
  },
});

function selectColor(color, setColor) {
  var selectedElm = document.querySelector(".crud-color-c.selected");
  var newSelected = document.querySelector('.crud-color-c[data-value="' + color + '"]');

  if (selectedElm) {
    selectedElm.classList.remove("selected");
  }
  if (newSelected) {
    newSelected.classList.add("selected");
  }
  if (setColor) {
    pickedColor.style.background = color || "";
  }
}

function setSelectedColor() {
  tempEvent.color = tempColor;
  pickedColor.style.background = tempColor;
  colorPicker.close();
}

colorSelect.addEventListener("click", function () {
  selectColor(tempEvent.color || "");
  colorPicker.open();
});

colorElms.forEach(function (elm) {
  elm.addEventListener("click", function () {
    tempColor = elm.getAttribute("data-value");
    selectColor(tempColor);

    if (!colorPicker.s.buttons.length) {
      setSelectedColor();
    }
  });
});

// calender

mobiscroll.setOptions({
  theme: "ios",
  themeVariant: "light",
});

var oldEvent;
var tempEvent = {};
var deleteEvent;
var restoreEvent;
var colorPicker;
var tempColor;
var titleInput = document.getElementById("event-title");
var descriptionTextarea = document.getElementById("event-desc");
var allDaySwitch = document.getElementById("event-all-day");
var freeSegmented = document.getElementById("event-status-free");
var busySegmented = document.getElementById("event-status-busy");
var deleteButton = document.getElementById("event-delete");
var colorSelect = document.getElementById("event-color-picker");
var pickedColor = document.getElementById("event-color");
var colorElms = document.querySelectorAll(".crud-color-c");
var travelTime = document.getElementById("travel-time-selection");
var datePickerResponsive = {
  medium: {
    controls: ["calendar"],
    touchUi: false,
  },
};
var datetimePickerResponsive = {
  medium: {
    controls: ["calendar", "time"],
    touchUi: false,
  },
};
var myData = [
  {
    id: 1,
    start: "2025-10-08T13:00",
    end: "2025-10-08T13:45",
    title: "Lunch @ Butcher's",
    description: "",
    allDay: false,
    bufferBefore: 15,
    free: true,
    color: "#009788",
  },
  {
    id: 2,
    start: "2025-10-05T15:00",
    end: "2025-10-05T16:00",
    title: "Conference",
    description: "",
    allDay: false,
    bufferBefore: 30,
    free: false,
    color: "#ff9900",
  },
  {
    id: 3,
    start: "2025-10-04T18:00",
    end: "2025-10-04T22:00",
    title: "Site Visit",
    description: "",
    allDay: false,
    bufferBefore: 60,
    free: true,
    color: "#3f51b5",
  },
  {
    id: 4,
    start: "2025-10-06T10:30",
    end: "2025-10-06T11:30",
    title: "Stakeholder mtg.",
    description: "",
    allDay: false,
    free: false,
    color: "#f44437",
  },
];

function createAddPopup(elm) {
  // Hide delete button inside add popup
  deleteButton.style.display = "none";

  deleteEvent = true;
  restoreEvent = false;

  // Set popup header text and buttons for adding
  popup.setOptions({
    headerText: "New event",
    buttons: [
      "cancel",
      {
        text: "Add",
        keyCode: "enter",
        handler: function () {
          calendar.updateEvent({
            id: tempEvent.id,
            title: tempEvent.title,
            description: tempEvent.description,
            allDay: tempEvent.allDay,
            bufferBefore: travelTime.value,
            start: tempEvent.start,
            end: tempEvent.end,
            color: tempEvent.color,
          });
          // Navigate the calendar to the correct view
          calendar.navigateToEvent(tempEvent);
          deleteEvent = false;
          popup.close();
        },
        cssClass: "mbsc-popup-button-primary",
      },
    ],
  });

  // Fill popup with a new event data
  mobiscroll.getInst(titleInput).value = tempEvent.title;
  mobiscroll.getInst(descriptionTextarea).value = "";
  mobiscroll.getInst(allDaySwitch).checked = false;
  range.setVal([tempEvent.start, tempEvent.end]);
  mobiscroll.getInst(busySegmented).checked = true;
  range.setOptions({ controls: ["date"], responsive: datePickerResponsive });
  pickedColor.style.background = "";
  travelTime.value = 0;

  // Set anchor for the popup
  popup.setOptions({ anchor: elm });

  popup.open();
}

function createEditPopup(args) {
  var ev = args.event;

  // Show delete button inside edit popup
  deleteButton.style.display = "block";

  deleteEvent = false;
  restoreEvent = true;

  // Set popup header text and buttons for editing
  popup.setOptions({
    headerText: "Edit event",
    buttons: [
      "cancel",
      {
        text: "Save",
        keyCode: "enter",
        handler: function () {
          var date = range.getVal();
          var eventToSave = {
            id: ev.id,
            title: titleInput.value,
            description: descriptionTextarea.value,
            allDay: mobiscroll.getInst(allDaySwitch).checked,
            bufferBefore: travelTime.value,
            start: date[0],
            end: date[1],
            free: mobiscroll.getInst(freeSegmented).checked,
            color: ev.color,
          };
          // Update event with the new properties on save button click
          calendar.updateEvent(eventToSave);
          // Navigate the calendar to the correct view
          calendar.navigateToEvent(eventToSave);
          restoreEvent = false;
          popup.close();
        },
        cssClass: "mbsc-popup-button-primary",
      },
    ],
  });

  // Fill popup with the selected event data
  mobiscroll.getInst(titleInput).value = ev.title || "";
  mobiscroll.getInst(descriptionTextarea).value = ev.description || "";
  mobiscroll.getInst(allDaySwitch).checked = ev.allDay || false;
  range.setVal([ev.start, ev.end]);
  pickedColor.style.background = ev.color || "";
  travelTime.value = ev.bufferBefore !== undefined ? ev.bufferBefore : 0;

  if (ev.free) {
    mobiscroll.getInst(freeSegmented).checked = true;
  } else {
    mobiscroll.getInst(busySegmented).checked = true;
  }

  // Change range settings based on the allDay
  range.setOptions({
    controls: ev.allDay ? ["date"] : ["datetime"],
    responsive: ev.allDay ? datePickerResponsive : datetimePickerResponsive,
  });

  // Set anchor for the popup
  popup.setOptions({ anchor: args.domEvent.currentTarget });
  popup.open();
}

var calendar = mobiscroll.eventcalendar("#demo-add-delete-event", {
  clickToCreate: "double",
  dragToCreate: true,
  dragToMove: true,
  dragToResize: true,
  view: {
    calendar: { labels: true },
  },
  data: myData,
  onEventClick: function (args) {
    oldEvent = Object.assign({}, args.event);
    tempEvent = args.event;

    if (!popup.isVisible()) {
      createEditPopup(args);
    }
  },
  onEventCreated: function (args) {
    popup.close();
    // Store temporary event
    tempEvent = args.event;
    createAddPopup(args.target);
  },
  onEventDeleted: function (args) {
    mobiscroll.snackbar({
      button: {
        action: function () {
          calendar.addEvent(args.event);
        },
        text: "Undo",
      },
      message: "Event deleted",
    });
  },
});

var popup = mobiscroll.popup("#demo-add-popup", {
  display: "bottom",
  contentPadding: false,
  fullScreen: true,
  onClose: function () {
    if (deleteEvent) {
      calendar.removeEvent(tempEvent);
    } else if (restoreEvent) {
      calendar.updateEvent(oldEvent);
    }
  },
  responsive: {
    medium: {
      display: "anchored",
      width: 400,
      fullScreen: false,
      touchUi: false,
    },
  },
});

titleInput.addEventListener("input", function (ev) {
  // Update current event's title
  tempEvent.title = ev.target.value;
});

descriptionTextarea.addEventListener("change", function (ev) {
  // Update current event's title
  tempEvent.description = ev.target.value;
});

allDaySwitch.addEventListener("change", function () {
  var checked = this.checked;

  var travelTimeGroup = document.querySelector("#travel-time-group");
  if (checked) {
    travelTimeGroup.style.display = "none";
    travelTime.value = 0;
  } else {
    travelTimeGroup.style.display = "flex";
  }

  // Change range settings based on the allDay
  range.setOptions({
    controls: checked ? ["date"] : ["datetime"],
    responsive: checked ? datePickerResponsive : datetimePickerResponsive,
  });

  // Update current event's allDay property
  tempEvent.allDay = checked;
});

var range = mobiscroll.datepicker("#event-date", {
  controls: ["date"],
  select: "range",
  startInput: "#start-input",
  endInput: "#end-input",
  showRangeLabels: false,
  touchUi: true,
  responsive: datePickerResponsive,
  onChange: function (args) {
    var date = args.value;
    // Update event's start date
    tempEvent.start = date[0];
    tempEvent.end = date[1];
  },
});

document.querySelectorAll("input[name=event-status]").forEach(function (elm) {
  elm.addEventListener("change", function () {
    // Update current event's free property
    tempEvent.free = mobiscroll.getInst(freeSegmented).checked;
  });
});

deleteButton.addEventListener("click", function () {
  // Delete current event on button click
  calendar.removeEvent(tempEvent);

  // Save a local reference to the deleted event
  var deletedEvent = tempEvent;

  popup.close();

  mobiscroll.snackbar({
    button: {
      action: function () {
        calendar.addEvent(deletedEvent);
      },
      text: "Undo",
    },
    message: "Event deleted",
  });
});

colorPicker = mobiscroll.popup("#demo-event-color", {
  display: "bottom",
  contentPadding: false,
  showArrow: false,
  showOverlay: false,
  buttons: [
    "cancel",
    {
      text: "Set",
      keyCode: "enter",
      handler: function () {
        setSelectedColor();
      },
      cssClass: "mbsc-popup-button-primary",
    },
  ],
  responsive: {
    medium: {
      display: "anchored",
      anchor: document.getElementById("event-color-cont"),
      buttons: {},
    },
  },
});

function selectColor(color, setColor) {
  var selectedElm = document.querySelector(".crud-color-c.selected");
  var newSelected = document.querySelector('.crud-color-c[data-value="' + color + '"]');

  if (selectedElm) {
    selectedElm.classList.remove("selected");
  }
  if (newSelected) {
    newSelected.classList.add("selected");
  }
  if (setColor) {
    pickedColor.style.background = color || "";
  }
}

function setSelectedColor() {
  tempEvent.color = tempColor;
  pickedColor.style.background = tempColor;
  colorPicker.close();
}

colorSelect.addEventListener("click", function () {
  selectColor(tempEvent.color || "");
  colorPicker.open();
});

colorElms.forEach(function (elm) {
  elm.addEventListener("click", function () {
    tempColor = elm.getAttribute("data-value");
    selectColor(tempColor);

    if (!colorPicker.s.buttons.length) {
      setSelectedColor();
    }
  });
});
function showSection(sectionID) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionID).style.display = "block";
}
