document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    const sessionExpiry = localStorage.getItem("adminSessionExpiry")
  
    if (isLoggedIn !== "true" || (sessionExpiry && new Date().getTime() > Number.parseInt(sessionExpiry))) {
      // Session expired or not logged in
      localStorage.removeItem("adminLoggedIn")
      localStorage.removeItem("adminSessionExpiry")
      window.location.href = "admin-login.html"
      return
    }
  
    // Toggle sidebar
    const toggleSidebar = document.getElementById("toggle-sidebar")
    const adminSidebar = document.querySelector(".admin-sidebar")
    const adminMain = document.querySelector(".admin-main")
  
    if (toggleSidebar) {
      toggleSidebar.addEventListener("click", () => {
        adminSidebar.classList.toggle("active")
        adminMain.classList.toggle("sidebar-active")
      })
    }
  
    // Navigation
    const navLinks = document.querySelectorAll(".admin-nav a")
    const sections = document.querySelectorAll(".admin-section")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Remove active class from all links
        navLinks.forEach((link) => {
          link.parentElement.classList.remove("active")
        })
  
        // Add active class to clicked link
        link.parentElement.classList.add("active")
  
        // Hide all sections
        sections.forEach((section) => {
          section.classList.remove("active")
        })
  
        // Show selected section
        const sectionId = link.getAttribute("data-section")
        document.getElementById(`${sectionId}-section`).classList.add("active")
      })
    })
  
    // Logout
    const logoutBtn = document.getElementById("logout-btn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("adminLoggedIn")
        localStorage.removeItem("adminSessionExpiry")
        window.location.href = "admin-login.html"
      })
    }
  
    // Load orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || []
  
    // Update dashboard stats
    updateDashboardStats(orders)
  
    // Load recent orders
    loadRecentOrders(orders)
  
    // Load all orders
    loadAllOrders(orders)
  
    // Order details modal
    const orderDetailsModal = document.getElementById("order-details-modal")
    const closeModalBtns = document.querySelectorAll(".close-modal, .close-modal-btn")
  
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        orderDetailsModal.classList.remove("active")
      })
    })
  
    // Status filter
    const statusFilter = document.getElementById("status-filter")
    if (statusFilter) {
      statusFilter.addEventListener("change", () => {
        loadAllOrders(orders)
      })
    }
  
    // Date filter
    const dateFilter = document.getElementById("date-filter")
    if (dateFilter) {
      dateFilter.addEventListener("change", () => {
        loadAllOrders(orders)
      })
    }
  
    // Search
    const searchBtn = document.getElementById("search-btn")
    const orderSearch = document.getElementById("order-search")
    if (searchBtn && orderSearch) {
      searchBtn.addEventListener("click", () => {
        loadAllOrders(orders)
      })
  
      orderSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          loadAllOrders(orders)
        }
      })
    }
  
    // Update order status
    const updateStatusBtn = document.querySelector(".update-status-btn")
    if (updateStatusBtn) {
      updateStatusBtn.addEventListener("click", () => {
        const orderId = updateStatusBtn.getAttribute("data-order-id")
        const statusSelect = document.getElementById("status-select")
  
        if (orderId && statusSelect) {
          const newStatus = statusSelect.value
  
          // Find the order and update its status
          const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: newStatus }
            }
            return order
          })
  
          // Save updated orders to localStorage
          localStorage.setItem("orders", JSON.stringify(updatedOrders))
  
          // Reload orders
          loadAllOrders(updatedOrders)
          loadRecentOrders(updatedOrders)
  
          // Update dashboard stats
          updateDashboardStats(updatedOrders)
  
          // Close modal
          orderDetailsModal.classList.remove("active")
  
          // Show success message
          showNotification("Order status updated successfully")
        }
      })
    }
  })
  
  // Update dashboard stats
  function updateDashboardStats(orders) {
    const totalOrdersElement = document.getElementById("total-orders")
    const totalRevenueElement = document.getElementById("total-revenue")
    const totalCustomersElement = document.getElementById("total-customers")
    const totalProductsElement = document.getElementById("total-products")
  
    if (totalOrdersElement) {
      totalOrdersElement.textContent = orders.length
    }
  
    if (totalRevenueElement) {
      const totalRevenue = orders.reduce((total, order) => total + order.total, 0)
      totalRevenueElement.textContent = `${totalRevenue.toFixed(2)} dhs`
    }
  
    if (totalCustomersElement) {
      // Get unique customers by email
      const uniqueCustomers = new Set(orders.map((order) => order.customer.email))
      totalCustomersElement.textContent = uniqueCustomers.size
    }
  
    if (totalProductsElement) {
      // Get unique products
      const uniqueProducts = new Set()
      orders.forEach((order) => {
        order.products.forEach((product) => {
          uniqueProducts.add(product.name)
        })
      })
      totalProductsElement.textContent = uniqueProducts.size
    }
  }
  
  // Load recent orders
  function loadRecentOrders(orders) {
    const recentOrdersTable = document.getElementById("recent-orders-table")
  
    if (recentOrdersTable) {
      // Sort orders by date (newest first)
      const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))
  
      // Get the 5 most recent orders
      const recentOrders = sortedOrders.slice(0, 5)
  
      if (recentOrders.length === 0) {
        recentOrdersTable.innerHTML = `
          <tr>
            <td colspan="5" class="text-center">No orders found</td>
          </tr>
        `
        return
      }
  
      recentOrdersTable.innerHTML = recentOrders
        .map(
          (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.customer.name || "N/A"}</td>
          <td>${new Date(order.date).toLocaleDateString()}</td>
          <td>${order.total.toFixed(2)} dhs</td>
          <td><span class="status status-${order.status || "processing"}">${order.status || "Processing"}</span></td>
        </tr>
      `,
        )
        .join("")
    }
  }
  
  // Load all orders
  function loadAllOrders(orders) {
    const ordersTable = document.getElementById("orders-table")
  
    if (ordersTable) {
      // Apply filters
      let filteredOrders = [...orders]
  
      // Status filter
      const statusFilter = document.getElementById("status-filter")
      if (statusFilter && statusFilter.value !== "all") {
        filteredOrders = filteredOrders.filter((order) => (order.status || "processing") === statusFilter.value)
      }
  
      // Date filter
      const dateFilter = document.getElementById("date-filter")
      if (dateFilter) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
  
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
  
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  
        if (dateFilter.value === "today") {
          filteredOrders = filteredOrders.filter((order) => new Date(order.date) >= today)
        } else if (dateFilter.value === "week") {
          filteredOrders = filteredOrders.filter((order) => new Date(order.date) >= weekStart)
        } else if (dateFilter.value === "month") {
          filteredOrders = filteredOrders.filter((order) => new Date(order.date) >= monthStart)
        }
      }
  
      // Search
      const orderSearch = document.getElementById("order-search")
      if (orderSearch && orderSearch.value.trim() !== "") {
        const searchTerm = orderSearch.value.trim().toLowerCase()
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.id.toLowerCase().includes(searchTerm) ||
            (order.customer.name && order.customer.name.toLowerCase().includes(searchTerm)) ||
            (order.customer.email && order.customer.email.toLowerCase().includes(searchTerm)),
        )
      }
  
      // Sort orders by date (newest first)
      filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
  
      if (filteredOrders.length === 0) {
        ordersTable.innerHTML = `
          <tr>
            <td colspan="7" class="text-center">No orders found</td>
          </tr>
        `
        return
      }
  
      ordersTable.innerHTML = filteredOrders
        .map(
          (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.customer.name || "N/A"}</td>
          <td>${new Date(order.date).toLocaleDateString()}</td>
          <td>${order.products.length} item${order.products.length !== 1 ? "s" : ""}</td>
          <td>${order.total.toFixed(2)} dhs</td>
          <td><span class="status status-${order.status || "processing"}">${order.status || "Processing"}</span></td>
          <td>
            <button class="action-btn view-btn" onclick="viewOrderDetails('${order.id}')">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" onclick="editOrder('${order.id}')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteOrder('${order.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `,
        )
        .join("")
    }
  }
  
  // View order details
  function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem("orders")) || []
    const order = orders.find((order) => order.id === orderId)
  
    if (order) {
      const orderDetailsContent = document.getElementById("order-details-content")
      const orderDetailsModal = document.getElementById("order-details-modal")
      const updateStatusBtn = document.querySelector(".update-status-btn")
  
      if (orderDetailsContent && orderDetailsModal) {
        // Set order ID for update button
        if (updateStatusBtn) {
          updateStatusBtn.setAttribute("data-order-id", orderId)
        }
  
        orderDetailsContent.innerHTML = `
          <div class="order-details-section">
            <h4>Order Information</h4>
            <div class="order-details-grid">
              <div>
                <div class="order-details-item">
                  <span>Order ID:</span> ${order.id}
                </div>
                <div class="order-details-item">
                  <span>Date:</span> ${new Date(order.date).toLocaleString()}
                </div>
                <div class="order-details-item">
                  <span>Status:</span> <span class="status status-${order.status || "processing"}">${order.status || "Processing"}</span>
                </div>
              </div>
              <div>
                <div class="order-details-item">
                  <span>Payment Method:</span> ${order.payment}
                </div>
                <div class="order-details-item">
                  <span>Delivery Method:</span> ${order.delivery.method}
                </div>
              </div>
            </div>
          </div>
          
          <div class="order-details-section">
            <h4>Customer Information</h4>
            <div class="order-details-grid">
              <div>
                <div class="order-details-item">
                  <span>Name:</span> ${order.customer.name || "N/A"}
                </div>
                <div class="order-details-item">
                  <span>Email:</span> ${order.customer.email || "N/A"}
                </div>
                <div class="order-details-item">
                  <span>Phone:</span> ${order.customer.phone || "N/A"}
                </div>
              </div>
              <div>
                <div class="order-details-item">
                  <span>City:</span> ${order.customer.city || "N/A"}
                </div>
                <div class="order-details-item">
                  <span>Address:</span> ${order.customer.address || "N/A"}
                </div>
              </div>
            </div>
          </div>
          
          <div class="order-details-section">
            <h4>Products</h4>
            <div class="order-products-list">
              ${order.products
                .map(
                  (product) => `
                <div class="order-product-item">
                  <div class="order-product-img">
                    <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="order-product-details">
                    <h5>${product.name}</h5>
                    <p>Color: ${product.color}, Size: ${product.size}</p>
                    <p>Quantity: ${product.quantity}</p>
                  </div>
                  <div class="order-product-price">${product.price} dhs</div>
                </div>
              `,
                )
                .join("")}
            </div>
            
            <div class="order-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)} dhs</span>
              </div>
              <div class="summary-row">
                <span>Shipping:</span>
                <span>${order.delivery.fee} dhs</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)} dhs</span>
              </div>
            </div>
          </div>
          
          <div class="status-select">
            <label for="status-select">Update Order Status</label>
            <select id="status-select">
              <option value="processing" ${(order.status || "processing") === "processing" ? "selected" : ""}>Processing</option>
              <option value="shipped" ${(order.status || "processing") === "shipped" ? "selected" : ""}>Shipped</option>
              <option value="delivered" ${(order.status || "processing") === "delivered" ? "selected" : ""}>Delivered</option>
              <option value="cancelled" ${(order.status || "processing") === "cancelled" ? "selected" : ""}>Cancelled</option>
            </select>
          </div>
        `
  
        orderDetailsModal.classList.add("active")
      }
    }
  }
  
  // Edit order
  function editOrder(orderId) {
    // In a real application, this would open a form to edit the order
    alert(`Edit order ${orderId} functionality coming soon!`)
  }
  
  // Delete order
  function deleteOrder(orderId) {
    if (confirm("Are you sure you want to delete this order?")) {
      const orders = JSON.parse(localStorage.getItem("orders")) || []
      const updatedOrders = orders.filter((order) => order.id !== orderId)
  
      // Save updated orders to localStorage
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
  
      // Reload orders
      loadAllOrders(updatedOrders)
      loadRecentOrders(updatedOrders)
  
      // Update dashboard stats
      updateDashboardStats(updatedOrders)
  
      // Show success message
      showNotification("Order deleted successfully")
    }
  }
  
  // Show notification
  function showNotification(message, type = "success") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
  
    // Add notification styles
    notification.style.position = "fixed"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.backgroundColor = type === "success" ? "#2ecc71" : "#e74c3c"
    notification.style.color = "white"
    notification.style.padding = "10px 20px"
    notification.style.borderRadius = "5px"
    notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)"
    notification.style.zIndex = "1000"
    notification.style.opacity = "0"
    notification.style.transform = "translateY(20px)"
    notification.style.transition = "opacity 0.3s, transform 0.3s"
  
    // Add to DOM
    document.body.appendChild(notification)
  
    // Trigger animation
    setTimeout(() => {
      notification.style.opacity = "1"
      notification.style.transform = "translateY(0)"
    }, 10)
  
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transform = "translateY(20px)"
  
      // Remove from DOM after animation
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
  