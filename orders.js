document.addEventListener("DOMContentLoaded", () => {
    const ordersContainer = document.getElementById("orders-container")
  
    // Load orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || []
  
    // Display orders or no orders message
    if (orders.length > 0) {
      // Remove no orders message if it exists
      const noOrdersMessage = ordersContainer.querySelector(".no-orders-message")
      if (noOrdersMessage) {
        ordersContainer.removeChild(noOrdersMessage)
      }
  
      // Sort orders by date (newest first)
      orders.sort((a, b) => new Date(b.date) - new Date(a.date))
  
      // Create HTML for each order
      orders.forEach((order) => {
        const orderElement = document.createElement("div")
        orderElement.className = "order-card"
  
        orderElement.innerHTML = `
                  <div class="order-header">
                      <div>
                          <h3>Order #${order.id}</h3>
                          <p class="order-date">${new Date(order.date).toLocaleString()}</p>
                      </div>
                      <div class="order-status">
                          <span class="status-badge">Processing</span>
                      </div>
                  </div>
                  <div class="order-summary">
                      <div class="order-products">
                          ${order.products
                            .map(
                              (product) => `
                              <div class="order-product">
                                  <div class="product-image">
                                      <img src="${product.image}" alt="${product.name}">
                                  </div>
                                  <div class="product-details">
                                      <h4>${product.name}</h4>
                                      <p>Color: ${product.color}, Size: ${product.size}</p>
                                      <p>Quantity: ${product.quantity}</p>
                                  </div>
                                  <div class="product-price">${product.price} dhs</div>
                              </div>
                          `,
                            )
                            .join("")}
                      </div>
                      <div class="order-info">
                          <div class="info-section">
                              <h4>Shipping Address</h4>
                              <p>${order.customer.name || ""}</p>
                              <p>${order.customer.address || ""}</p>
                              <p>${order.customer.city || ""}</p>
                              <p>${order.customer.phone || ""}</p>
                          </div>
                          <div class="info-section">
                              <h4>Payment Method</h4>
                              <p>${order.payment}</p>
                          </div>
                          <div class="info-section">
                              <h4>Order Summary</h4>
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
                  </div>
                  <div class="order-actions">
                      <button class="btn-secondary track-order-btn">Track Order</button>
                      <button class="btn-primary reorder-btn">Reorder</button>
                  </div>
              `
  
        ordersContainer.appendChild(orderElement)
      })
  
      // Add event listeners to buttons
      document.querySelectorAll(".track-order-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          alert("Order tracking feature coming soon!")
        })
      })
  
      document.querySelectorAll(".reorder-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          alert("Reorder feature coming soon!")
        })
      })
    }
  })
  