// Admin credentials - CHANGE THESE FOR SECURITY
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "Fashion@Hub2023"

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem("adminLoggedIn")
  if (isLoggedIn === "true") {
    window.location.href = "admin-dashboard.html"
  }

  // Admin login form
  const adminLoginForm = document.getElementById("adminLoginForm")
  const loginError = document.getElementById("login-error")

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value
      const remember = document.getElementById("remember").checked

      // Simple authentication (in a real app, this would be done on the server)
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set login status in localStorage
        localStorage.setItem("adminLoggedIn", "true")

        // Set session expiry (24 hours by default, 30 days if remember me is checked)
        const expiryTime = remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
        const expiryDate = new Date().getTime() + expiryTime
        localStorage.setItem("adminSessionExpiry", expiryDate)

        // Redirect to admin dashboard
        window.location.href = "admin-dashboard.html"
      } else {
        // Show error message
        loginError.textContent = "Invalid username or password"
        loginError.style.display = "block"
      }
    })
  }
})
