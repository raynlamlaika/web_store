// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById("mobile-menu")
    if (mobileMenu) {
      const navMenu = document.querySelector(".nav-menu")
  
      mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        navMenu.classList.toggle("active")
  
        // Transform hamburger to X
        const bars = mobileMenu.querySelectorAll(".bar")
        if (bars.length > 0) {
          if (mobileMenu.classList.contains("active")) {
            bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
            bars[1].style.opacity = "0"
            bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
          } else {
            bars[0].style.transform = "none"
            bars[1].style.opacity = "1"
            bars[2].style.transform = "none"
          }
        }
      })
    }
  
    // Product Slider
    const productContainer = document.getElementById("product-container")
    if (productContainer) {
      const prevBtn = document.getElementById("prev-product")
      const nextBtn = document.getElementById("next-product")
  
      // Scroll amount for product slider
      const scrollAmount = 300
  
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          productContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          })
        })
      }
  
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          productContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          })
        })
      }
    }
  
    // Checkout Modal Functionality
    const buyNowButtons = document.querySelectorAll(".buy-now")
    const checkoutModal = document.getElementById("checkout-modal")
  
    if (checkoutModal && buyNowButtons.length > 0) {
      const closeModal = document.getElementById("close-modal")
      const checkoutItems = document.getElementById("checkout-items")
      const checkoutCount = document.getElementById("checkout-count")
      const checkoutTotal = document.getElementById("checkout-total")
      const deliveryFee = document.getElementById("delivery-fee")
      const promoHeader = document.getElementById("promo-header")
      const promoContent = document.getElementById("promo-content")
  
      // Checkout data
      let checkoutProducts = []
      let totalPrice = 0
      let selectedDeliveryFee = 35 // Default delivery fee
  
      // Open checkout modal
      buyNowButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const productCard = this.closest(".product-card")
          const productName = productCard.querySelector("h3").textContent
          const productPriceElement = productCard.querySelector(".current-price")
          const productImgElement = productCard.querySelector(".product-img img")
  
          if (productPriceElement && productImgElement) {
            const productPrice = productPriceElement.textContent
            const productImg = productImgElement.src
  
            // Convert price string to number
            const price = Number.parseFloat(productPrice.replace(/[^\d.]/g, ""))
  
            // Clear previous checkout items
            checkoutProducts = []
  
            // Add the product to checkout
            checkoutProducts.push({
              name: productName,
              price: price,
              image: productImg,
              quantity: 1,
              color: getRandomColor(),
              size: getRandomSize(),
            })
  
            // Update checkout UI
            updateCheckout()
  
            // Show checkout modal
            checkoutModal.classList.add("active")
            document.body.style.overflow = "hidden" // Prevent scrolling
          }
        })
      })
  
      // Close checkout modal
      if (closeModal) {
        closeModal.addEventListener("click", () => {
          checkoutModal.classList.remove("active")
          document.body.style.overflow = "" // Enable scrolling
        })
      }
  
      // Update checkout UI
      function updateCheckout() {
        // Update checkout count
        if (checkoutCount) {
          checkoutCount.textContent = `${checkoutProducts.length} articles`
        }
  
        // Update checkout items
        if (checkoutItems) {
          let checkoutHTML = ""
  
          checkoutProducts.forEach((item, index) => {
            checkoutHTML += `
              <div class="checkout-item">
                <div class="checkout-item-img">
                  <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="checkout-item-details">
                  <div class="checkout-item-title">${item.name}</div>
                  <div class="checkout-item-info">Couleur : ${item.color}</div>
                  <div class="checkout-item-info">Taille : ${item.size}</div>
                  <div class="checkout-item-info">Qté : ${item.quantity}</div>
                </div>
                <div class="checkout-item-price">${item.price * item.quantity} dhs</div>
                <button class="remove-checkout-item" data-index="${index}">×</button>
              </div>
            `
          })
  
          checkoutItems.innerHTML = checkoutHTML
  
          // Add event listeners to remove buttons
          document.querySelectorAll(".remove-checkout-item").forEach((btn) => {
            btn.addEventListener("click", function () {
              const index = Number.parseInt(this.dataset.index)
              checkoutProducts.splice(index, 1)
              updateCheckout()
            })
          })
        }
  
        // Update checkout total
        const subtotal = checkoutProducts.reduce((total, item) => total + item.price * item.quantity, 0)
        totalPrice = subtotal + selectedDeliveryFee
  
        if (deliveryFee) {
          deliveryFee.textContent = `${selectedDeliveryFee} dhs`
        }
  
        if (checkoutTotal) {
          checkoutTotal.textContent = `${totalPrice.toFixed(2)} dhs`
        }
      }
  
      // Helper function to get random color
      function getRandomColor() {
        const colors = ["NOIR", "BLEU", "BLANC CASSÉ", "BEIGE", "ROUGE", "VERT"]
        return colors[Math.floor(Math.random() * colors.length)]
      }
  
      // Helper function to get random size
      function getRandomSize() {
        const sizes = ["S", "M", "L", "XL", "STANDARD"]
        return sizes[Math.floor(Math.random() * sizes.length)]
      }
  
      // Toggle promo code section
      if (promoHeader && promoContent) {
        promoHeader.addEventListener("click", function () {
          this.classList.toggle("active")
          promoContent.classList.toggle("active")
        })
      }
  
      // Update delivery fee based on selected option
      const deliveryOptions = document.querySelectorAll('input[name="delivery"]')
      if (deliveryOptions.length > 0) {
        deliveryOptions.forEach((radio) => {
          radio.addEventListener("change", function () {
            if (this.id === "option2") {
              selectedDeliveryFee = 20
            } else if (this.id === "option3") {
              selectedDeliveryFee = 39
            } else if (this.id === "option4") {
              selectedDeliveryFee = 30
            } else if (this.id === "option5") {
              selectedDeliveryFee = 35
            } else {
              selectedDeliveryFee = 35
            }
  
            if (deliveryFee) {
              deliveryFee.textContent = `${selectedDeliveryFee} dhs`
            }
  
            // Recalculate total
            const subtotal = checkoutProducts.reduce((total, item) => total + item.price * item.quantity, 0)
            totalPrice = subtotal + selectedDeliveryFee
  
            if (checkoutTotal) {
              checkoutTotal.textContent = `${totalPrice.toFixed(2)} dhs`
            }
          })
        })
      }
  
      // Form validation and data collection for checkout
      const checkoutBtn = document.querySelector(".checkout-btn")
      const checkoutForm = document.querySelector(".checkout-form")
  
      if (checkoutBtn && checkoutForm) {
        checkoutBtn.addEventListener("click", () => {
          const requiredFields = checkoutForm.querySelectorAll("[required]")
          let isValid = true
          const formData = {}
  
          requiredFields.forEach((field) => {
            if (!field.value) {
              isValid = false
              field.style.borderColor = "red"
            } else {
              field.style.borderColor = ""
              // Collect form data
              formData[field.name] = field.value
            }
          })
  
          if (isValid) {
            // Get selected delivery option
            const selectedDeliveryOption = document.querySelector('input[name="delivery"]:checked')
            const deliveryMethod = selectedDeliveryOption
              ? selectedDeliveryOption.nextElementSibling.textContent
              : "Standard Delivery"
  
            // Get selected payment option
            const selectedPaymentOption = document.querySelector('input[name="payment"]:checked')
            const paymentMethod = selectedPaymentOption
              ? selectedPaymentOption.nextElementSibling.textContent
              : "Payment on Delivery"
  
            // Create order object
            const order = {
              id: generateOrderId(),
              date: new Date().toISOString(),
              customer: formData,
              products: checkoutProducts,
              delivery: {
                method: deliveryMethod,
                fee: selectedDeliveryFee,
              },
              payment: paymentMethod,
              subtotal: checkoutProducts.reduce((total, item) => total + item.price * item.quantity, 0),
              total: totalPrice,
              status: "processing", // Add status field for admin dashboard
            }
  
            // Save order to localStorage
            saveOrder(order)
  
            // Redirect to confirmation page or show confirmation
            showOrderConfirmation(order)
  
            checkoutModal.classList.remove("active")
            document.body.style.overflow = "" // Enable scrolling
            checkoutForm.reset()
          } else {
            showNotification("Veuillez remplir tous les champs obligatoires.", "error")
          }
        })
      }
  
      // Generate a unique order ID
      function generateOrderId() {
        return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
      }
  
      // Save order to localStorage
      function saveOrder(order) {
        const orders = JSON.parse(localStorage.getItem("orders")) || []
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
      }
  
      // Show order confirmation
      function showOrderConfirmation(order) {
        // Create confirmation modal
        const confirmationModal = document.createElement("div")
        confirmationModal.className = "confirmation-modal"
  
        const confirmationContent = document.createElement("div")
        confirmationContent.className = "confirmation-content"
  
        // Create close button
        const closeBtn = document.createElement("button")
        closeBtn.className = "close-modal"
        closeBtn.innerHTML = "×"
        closeBtn.addEventListener("click", () => {
          document.body.removeChild(confirmationModal)
          document.body.style.overflow = ""
        })
  
        // Create confirmation content
        confirmationContent.innerHTML = `
          <h2>Order Confirmation</h2>
          <p>Thank you for your order, ${order.customer.name || "Valued Customer"}!</p>
          <div class="order-details">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
            <h3>Order Summary</h3>
            <div class="order-items">
              ${order.products
                .map(
                  (product) => `
                <div class="order-item">
                  <span>${product.name} (${product.color}, ${product.size})</span>
                  <span>${product.price} dhs</span>
                </div>
              `,
                )
                .join("")}
            </div>
            <div class="order-total">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)} dhs</span>
              </div>
              <div class="total-row">
                <span>Delivery:</span>
                <span>${order.delivery.fee} dhs</span>
              </div>
              <div class="total-row grand-total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)} dhs</span>
              </div>
            </div>
            <h3>Delivery Information</h3>
            <p><strong>Name:</strong> ${order.customer.name || ""}</p>
            <p><strong>Email:</strong> ${order.customer.email || ""}</p>
            <p><strong>Phone:</strong> ${order.customer.phone || ""}</p>
            <p><strong>City:</strong> ${order.customer.city || ""}</p>
            <p><strong>Address:</strong> ${order.customer.address || ""}</p>
            <p><strong>Delivery Method:</strong> ${order.delivery.method}</p>
            <p><strong>Payment Method:</strong> ${order.payment}</p>
          </div>
          <p class="confirmation-message">Your order has been received and is being processed. You will receive a confirmation email shortly.</p>
          <button class="btn-primary view-orders-btn">View My Orders</button>
        `
  
        confirmationContent.appendChild(closeBtn)
        confirmationModal.appendChild(confirmationContent)
        document.body.appendChild(confirmationModal)
  
        // Add event listener to view orders button
        const viewOrdersBtn = confirmationContent.querySelector(".view-orders-btn")
        if (viewOrdersBtn) {
          viewOrdersBtn.addEventListener("click", () => {
            window.location.href = "orders.html"
          })
        }
  
        // Show the confirmation modal
        setTimeout(() => {
          confirmationModal.style.opacity = "1"
        }, 10)
      }
    }
  
    // Contact Form Submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
        showNotification("Thank you for your message! We'll get back to you soon.")
        this.reset()
      })
    }
  
    // Show notification
    function showNotification(message, type = "success") {
      // Create notification element
      const notification = document.createElement("div")
      notification.className = "notification"
      notification.textContent = message
  
      // Add notification styles
      notification.style.position = "fixed"
      notification.style.bottom = "20px"
      notification.style.right = "20px"
      notification.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336"
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
  
    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const email = this.querySelector("input").value
  
        // Validate email (simple validation)
        if (email && email.includes("@") && email.includes(".")) {
          showNotification("Thank you for subscribing to our newsletter!")
          this.reset()
        } else {
          showNotification("Please enter a valid email address.", "error")
        }
      })
    }
  })
  