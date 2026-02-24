// Create a Map where Key = Product ID and Value = Product object
const productCatalog = new Map();

// Add minimum 5 products
const initialProducts = [
    { id: 101, name: "Wireless Mouse", price: "$25" },
    { id: 102, name: "Mechanical Keyboard", price: "$85" },
    { id: 103, name: "Gaming Monitor", price: "$250" },
    { id: 104, name: "USB-C Hub", price: "$45" },
    { id: 105, name: "Webcam HD", price: "$60" }
];

initialProducts.forEach(p => productCatalog.set(p.id, { name: p.name, price: p.price }));

const updateUI = (highlightId = null) => {
    const display = document.getElementById('product-display');
    const count = document.getElementById('product-count');

    // Show total products using .size
    count.textContent = productCatalog.size;
    display.innerHTML = '';

    productCatalog.forEach((product, id) => {
        const card = document.createElement('div');
        card.className = `product-card ${id == highlightId ? 'highlight' : ''}`;
        if (id == highlightId) card.style.borderColor = '#3b82f6';

        card.innerHTML = `
            <h4>${product.name}</h4>
            <p>ID: ${id}</p>
            <p>Price: ${product.price}</p>
            <button class="delete-btn" onclick="deleteProduct(${id})">Delete</button>
        `;
        display.appendChild(card);
    });
};

const showMessage = (text, type = 'success') => {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.style.color = type === 'error' ? '#ef4444' : '#10b981';
    setTimeout(() => msg.textContent = '', 3000);
};

// Implement search by ID
window.searchProduct = () => {
    const id = parseInt(document.getElementById('search-id').value);
    if (!id) return;

    if (productCatalog.has(id)) {
        const product = productCatalog.get(id);
        showMessage(`Found: ${product.name}`, 'success');
        updateUI(id);
    } else {
        showMessage(`Product ID ${id} not found`, 'error');
    }
};

// Implement delete product
window.deleteProduct = (id) => {
    if (productCatalog.has(id)) {
        const product = productCatalog.get(id);
        productCatalog.delete(id);
        showMessage(`Deleted: ${product.name}`);
        updateUI();
    }
};

const addProduct = () => {
    const id = parseInt(document.getElementById('new-id').value);
    const name = document.getElementById('new-name').value;
    const price = document.getElementById('new-price').value;

    if (!id || !name || !price) {
        showMessage("Please fill all fields", "error");
        return;
    }

    if (productCatalog.has(id)) {
        showMessage("ID already exists", "error");
        return;
    }

    productCatalog.set(id, { name, price });
    showMessage("Product added!");
    updateUI();

    // Clear inputs
    document.getElementById('new-id').value = '';
    document.getElementById('new-name').value = '';
    document.getElementById('new-price').value = '';
};

document.getElementById('search-btn').addEventListener('click', searchProduct);
document.getElementById('add-btn').addEventListener('click', addProduct);

// Initial call
updateUI();
