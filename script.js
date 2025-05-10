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
        const delivery = 35 // Default delivery fee
        totalPrice = subtotal + delivery
  
        if (deliveryFee) {
          deliveryFee.textContent = `${delivery} dhs`
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
            let fee = 35
  
            if (this.id === "option2") {
              fee = 20
            } else if (this.id === "option3") {
              fee = 39
            } else if (this.id === "option4") {
              fee = 30
            } else if (this.id === "option5") {
              fee = 35
            }
  
            if (deliveryFee) {
              deliveryFee.textContent = `${fee} dhs`
            }
  
            // Recalculate total
            const subtotal = checkoutProducts.reduce((total, item) => total + item.price * item.quantity, 0)
            totalPrice = subtotal + fee
  
            if (checkoutTotal) {
              checkoutTotal.textContent = `${totalPrice.toFixed(2)} dhs`
            }
          })
        })
      }
  
      // Form validation for checkout
      const checkoutBtn = document.querySelector(".checkout-btn")
      const checkoutForm = document.querySelector(".checkout-form")
  
      if (checkoutBtn && checkoutForm) {
        checkoutBtn.addEventListener("click", () => {
          const requiredFields = checkoutForm.querySelectorAll("[required]")
          let isValid = true
  
          requiredFields.forEach((field) => {
            if (!field.value) {
              isValid = false
              field.style.borderColor = "red"
            } else {
              field.style.borderColor = ""
            }
          })
  
          if (isValid) {
            showNotification("Votre commande a été validée avec succès!")
            checkoutModal.classList.remove("active")
            document.body.style.overflow = "" // Enable scrolling
            checkoutForm.reset()
          } else {
            showNotification("Veuillez remplir tous les champs obligatoires.", "error")
          }
        })
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
  
    // Add CSS for cart items
    const style = document.createElement("style")
    style.textContent = `
          .cart-item {
              display: flex;
              align-items: center;
              padding: 1rem 0;
              border-bottom: 1px solid var(--border-color);
          }
          
          .cart-item-img {
              width: 80px;
              height: 80px;
              border-radius: 10px;
              overflow: hidden;
              margin-right: 1rem;
          }
          
          .cart-item-img img {
              width: 100%;
              height: 100%;
              object-fit: cover;
          }
          
          .cart-item-details {
              flex: 1;
          }
          
          .cart-item-details h4 {
              margin-bottom: 0.5rem;
          }
          
          .cart-item-price {
              color: var(--primary-color);
              font-weight: 600;
              margin-bottom: 0.5rem;
          }
          
          .cart-item-quantity {
              display: flex;
              align-items: center;
              gap: 0.5rem;
          }
          
          .quantity-btn {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              background-color: var(--light-background);
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: bold;
              transition: var(--transition);
          }
          
          .quantity-btn:hover {
              background-color: var(--primary-color);
              color: white;
          }
          
          .remove-item {
              background: none;
              color: var(--light-text);
              transition: var(--transition);
          }
          
          .remove-item:hover {
              color: var(--primary-color);
          }
      `
  
    document.head.appendChild(style)
  
    // Initialize cart UI
    //updateCart(); // Removed because cart functionality is replaced
  })
  