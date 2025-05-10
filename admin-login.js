document.addEventListener("DOMContentLoaded", () => {
    // WhatsApp configuration - CHANGE THIS TO YOUR NUMBER
    const WHATSAPP_PHONE = "+212661069158" // Replace with your phone number in international format without + (e.g., 212612345678 for Morocco)
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
  
    // Product Management
    const productsTable = document.getElementById("products-table")
    const addProductBtn = document.getElementById("add-product-btn")
    const productFormModal = document.getElementById("product-form-modal")
    const productForm = document.getElementById("product-form")
    const saveProductBtn = document.getElementById("save-product-btn")
    const productFormTitle = document.getElementById("product-form-title")
  
    // Load products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || []
  
    // Initialize with some sample products if none exist
    if (products.length === 0) {
      products = [
        {
          id: "prod-" + Math.random().toString(36).substr(2, 9),
          name: "Classic Oxford Shirt",
          category: "shirts",
          price: 199,
          oldPrice: 249,
          image:
            "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
          description: "A classic Oxford shirt perfect for any occasion.",
          status: "active",
          badge: "new",
        },
        {
          id: "prod-" + Math.random().toString(36).substr(2, 9),
          name: "Premium Hoodie",
          category: "hoodies",
          price: 299,
          oldPrice: 349,
          image:
            "https://images.unsplash.com/photo-1606913419164-a8fc807ae4a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
          description: "A premium quality hoodie for ultimate comfort.",
          status: "active",
          badge: "sale",
        },
      ]
      localStorage.setItem("products", JSON.stringify(products))
    }
  
    // Load products
    loadProducts(products)
  
    // Add product button
    if (addProductBtn) {
      addProductBtn.addEventListener("click", () => {
        // Reset form
        productForm.reset()
        document.getElementById("product-id").value = ""
        productFormTitle.textContent = "Add New Product"
  
        // Show modal
        productFormModal.classList.add("active")
      })
    }
  
    // Close product form modal
    const closeProductModalBtns = productFormModal.querySelectorAll(".close-modal, .close-modal-btn")
    closeProductModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        productFormModal.classList.remove("active")
      })
    })
  
    // Save product
    if (saveProductBtn) {
      saveProductBtn.addEventListener("click", () => {
        // Get form data
        const formData = new FormData(productForm)
        const productData = {
          name: formData.get("name"),
          category: formData.get("category"),
          price: Number.parseFloat(formData.get("price")),
          oldPrice: formData.get("oldPrice") ? Number.parseFloat(formData.get("oldPrice")) : null,
          image: formData.get("image"),
          description: formData.get("description"),
          status: formData.get("status"),
          badge: formData.get("badge"),
        }
  
        // Validate form
        if (!productData.name || !productData.category || !productData.price || !productData.image) {
          showNotification("Please fill in all required fields", "error")
          return
        }
  
        const productId = document.getElementById("product-id").value
  
        if (productId) {
          // Update existing product
          productData.id = productId
          const updatedProducts = products.map((product) => {
            if (product.id === productId) {
              return productData
            }
            return product
          })
          products = updatedProducts
          showNotification("Product updated successfully")
        } else {
          // Add new product
          productData.id = "prod-" + Math.random().toString(36).substr(2, 9)
          products.push(productData)
          showNotification("Product added successfully")
        }
  
        // Save to localStorage
        localStorage.setItem("products", JSON.stringify(products))
  
        // Reload products
        loadProducts(products)
  
        // Close modal
        productFormModal.classList.remove("active")
      })
    }
  
    // Category filter
    const categoryFilter = document.getElementById("category-filter")
    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => {
        filterProducts()
      })
    }
  
    // Product search
    const productSearchBtn = document.getElementById("product-search-btn")
    const productSearch = document.getElementById("product-search")
    if (productSearchBtn && productSearch) {
      productSearchBtn.addEventListener("click", () => {
        filterProducts()
      })
  
      productSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          filterProducts()
        }
      })
    }
  
    // Filter products
    function filterProducts() {
      let filteredProducts = [...products]
  
      // Category filter
      const categoryFilter = document.getElementById("category-filter")
      if (categoryFilter && categoryFilter.value !== "all") {
        filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter.value)
      }
  
      // Search
      const productSearch = document.getElementById("product-search")
      if (productSearch && productSearch.value.trim() !== "") {
        const searchTerm = productSearch.value.trim().toLowerCase()
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm)),
        )
      }
  
      // Load filtered products
      loadProducts(filteredProducts)
    }
  
    // Load products
    function loadProducts(productsToLoad) {
      if (productsTable) {
        if (productsToLoad.length === 0) {
          productsTable.innerHTML = `
            <tr>
              <td colspan="7" class="text-center">No products found</td>
            </tr>
          `
          return
        }
  
        productsTable.innerHTML = productsToLoad
          .map(
            (product) => `
          <tr>
            <td>
              <div class="product-image-cell">
                <img src="${product.image}" alt="${product.name}">
              </div>
            </td>
            <td>${product.name}</td>
            <td>${capitalizeFirstLetter(product.category)}</td>
            <td>${product.price} dhs</td>
            <td>${product.oldPrice ? product.oldPrice + " dhs" : "-"}</td>
            <td><span class="status status-${product.status}">${capitalizeFirstLetter(product.status)}</span></td>
            <td>
              <button class="action-btn view-btn" onclick="viewProduct('${product.id}')">
                <i class="fas fa-eye"></i>
              </button>
              <button class="action-btn edit-btn" onclick="editProduct('${product.id}')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete-btn" onclick="deleteProduct('${product.id}')">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        `,
          )
          .join("")
      }
    }
  
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
    function updateDashboardStats(orders) {
      // Dummy implementation
      console.log("updateDashboardStats called with orders:", orders)
    }
  
    function loadRecentOrders(orders) {
      // Dummy implementation
      console.log("loadRecentOrders called with orders:", orders)
    }
  
    function loadAllOrders(orders) {
      // Dummy implementation
      console.log("loadAllOrders called with orders:", orders)
    }
  
    function showNotification(message, type = "success") {
      // Dummy implementation
      console.log("showNotification called with message:", message, "and type:", type)
    }
  })
  
  // View product
  function viewProduct(productId) {
    const products = JSON.parse(localStorage.getItem("products")) || []
    const product = products.find((product) => product.id === productId)
  
    if (product) {
      alert(`
        Product: ${product.name}
        Category: ${capitalizeFirstLetter(product.category)}
        Price: ${product.price} dhs
        ${product.oldPrice ? "Old Price: " + product.oldPrice + " dhs" : ""}
        Status: ${capitalizeFirstLetter(product.status)}
        Badge: ${product.badge ? capitalizeFirstLetter(product.badge) : "None"}
        Description: ${product.description || "No description"}
      `)
    }
  }
  
  // Edit product
  function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem("products")) || []
    const product = products.find((product) => product.id === productId)
  
    if (product) {
      // Fill form with product data
      document.getElementById("product-id").value = product.id
      document.getElementById("product-name").value = product.name
      document.getElementById("product-category").value = product.category
      document.getElementById("product-price").value = product.price
      document.getElementById("product-old-price").value = product.oldPrice || ""
      document.getElementById("product-image").value = product.image
      document.getElementById("product-description").value = product.description || ""
      document.getElementById("product-status").value = product.status
      document.getElementById("product-badge").value = product.badge || ""
  
      // Update form title
      document.getElementById("product-form-title").textContent = "Edit Product"
  
      // Show modal
      document.getElementById("product-form-modal").classList.add("active")
    }
  }
  
  // Delete product
  function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      const products = JSON.parse(localStorage.getItem("products")) || []
      const updatedProducts = products.filter((product) => product.id !== productId)
  
      // Save updated products to localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts))
  
      // Reload products
      loadProducts(updatedProducts)
  
      // Show success message
      showNotification("Product deleted successfully")
    }
  }
  
  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    if (!string) return ""
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  // Function to send order data to WhatsApp
  function sendOrderToWhatsApp(order) {
    // Format the order data into a readable message
    let message = "🛍️ *ORDER DETAILS* 🛍️\n\n"
    message += `*Order ID:* ${order.id}\n`
    message += `*Date:* ${new Date(order.date).toLocaleString()}\n\n`
  
    message += "*Customer Information:*\n"
    message += `Name: ${order.customer.name || "N/A"}\n`
    message += `Email: ${order.customer.email || "N/A"}\n`
    message += `Phone: ${order.customer.phone || "N/A"}\n`
    message += `City: ${order.customer.city || "N/A"}\n`
    message += `Address: ${order.customer.address || "N/A"}\n\n`
  
    message += "*Order Items:*\n"
    order.products.forEach((product, index) => {
      message += `${index + 1}. ${product.name} - ${product.price} dhs (${product.color}, ${product.size}) x${product.quantity}\n`
    })
  
    message += "\n*Order Summary:*\n"
    message += `Subtotal: ${order.subtotal.toFixed(2)} dhs\n`
    message += `Delivery: ${order.delivery.fee} dhs (${order.delivery.method})\n`
    message += `Total: ${order.total.toFixed(2)} dhs\n\n`
  
    message += `Payment Method: ${order.payment}\n`
    message += `Status: ${order.status || "Processing"}`
  
    // Create WhatsApp URL with the message
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedMessage}`
  
    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank")
  }
  