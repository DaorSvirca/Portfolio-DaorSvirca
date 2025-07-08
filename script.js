document.addEventListener("DOMContentLoaded", () => {
  // Initialize feather icons
  feather.replace();

  // Sidebar elements
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const sidebarClose = document.getElementById("sidebarClose");

  // Theme toggle
  const themeToggleBtn = document.getElementById("themeToggle");
  // Color picker
  const colorPickerToggle = document.getElementById("colorPickerToggle");
  const colorPickerDropdown = document.querySelector(".color-picker-dropdown");
  const colorButtons = document.querySelectorAll(".color-btn");

  // Typed text variables
  const typedTextSpan = document.getElementById("typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const words = ["Daor Svirca."];
  let wordIndex = 0;
  let charIndex = 0;
  let typing = true;

  const navLinks = document.querySelectorAll("#navLinks li a");

  // Inject icons in sidebar links dynamically using feather icons
  const iconMap = {
    about: "user",
    skills: "cpu",
    projects: "folder",
    contact: "mail",
  };

  navLinks.forEach((link) => {
    const href = link.getAttribute("href").replace("#", "");
    const iconName = iconMap[href];
    if (iconName) {
      const icon = feather.icons[iconName].toSvg({ class: "sidebar-icon" });
      link.insertAdjacentHTML("afterbegin", icon);
    }
  });

  // Show sidebar (mobile)
  function openSidebar() {
    sidebar.classList.add("show");
    document.body.classList.add("sidebar-visible");
    hamburger.setAttribute("aria-expanded", "true");
  }

  // Hide sidebar (mobile)
  function closeSidebar() {
    sidebar.classList.remove("show");
    document.body.classList.remove("sidebar-visible");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", () => {
    if (sidebar.classList.contains("show")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  sidebarClose.addEventListener("click", closeSidebar);

  // Close sidebar when clicking a nav link (mobile)
  document.querySelectorAll(".sidebar-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });

  // Dark/Light theme toggle
  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark");
      themeToggleBtn.innerHTML = feather.icons.sun.toSvg();
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      themeToggleBtn.innerHTML = feather.icons.moon.toSvg();
      localStorage.setItem("theme", "light");
    }
  }

  // Initialize theme from localStorage or default dark
  let storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") {
    setTheme(false);
  } else {
    setTheme(true);
  }

  themeToggleBtn.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark"));
  });

  // Color picker toggle
  colorPickerToggle.addEventListener("click", () => {
    const expanded = colorPickerToggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      colorPickerDropdown.classList.remove("show");
      colorPickerToggle.setAttribute("aria-expanded", "false");
      colorPickerDropdown.setAttribute("aria-hidden", "true");
    } else {
      colorPickerDropdown.classList.add("show");
      colorPickerToggle.setAttribute("aria-expanded", "true");
      colorPickerDropdown.setAttribute("aria-hidden", "false");
    }
  });

  // Change accent color only (NOT text color)
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const newColor = btn.getAttribute("data-color");
      document.documentElement.style.setProperty("--accent-color", newColor);
      localStorage.setItem("accentColor", newColor);
    });
  });

  // Load stored accent color if any
  const savedAccent = localStorage.getItem("accentColor");
  if (savedAccent) {
    document.documentElement.style.setProperty("--accent-color", savedAccent);
  }

  // Typed Text animation
  function type() {
    if (charIndex < words[wordIndex].length) {
      typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 150);
    } else {
      typing = false;
      setTimeout(erase, 1800);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 90);
    } else {
      typing = true;
      wordIndex++;
      if (wordIndex >= words.length) wordIndex = 0;
      setTimeout(type, 700);
    }
  }

  setTimeout(type, 1500);

  // Scroll fade in for sections
  const sections = document.querySelectorAll("section");
  const fadeInOnScroll = () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });
  };

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); 
});
// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
