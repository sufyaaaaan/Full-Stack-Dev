// Initial cart
let cart = ["Laptop", "Mouse"];

// 1. addToCart using Rest operator
const addToCart = (...items) => {
    // 2. Use Spread operator to clone and update
    cart = [...cart, ...items];
    updateUI();
};

const updateUI = () => {
    const display = document.getElementById('cart-display');

    // 3. Array Destructuring to extract first product and remaining
    const [firstItem, ...others] = cart;

    display.innerHTML = `
        <div class="section">
            <h3>Total Items</h3>
            <span class="total-badge">${cart.length} Products</span>
        </div>

        <div class="section">
            <h3>First Product in Cart</h3>
            <p class="highlight">${firstItem || "Cart is empty"}</p>
        </div>

        <div class="section">
            <h3>Updated Cart Items</h3>
            <ul class="item-list">
                ${cart.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="section">
            <h3>Remaining Products (Destructured)</h3>
            <p>${others.length > 0 ? others.join(', ') : "None"}</p>
        </div>
    `;
};

// Add some items and display
addToCart("Keyboard", "Monitor", "Webcam");
