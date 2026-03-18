import './Products.css';

const Products = () => {
  const productsList = [
    { id: 1, title: 'Premium Headphones', desc: 'Noise-cancelling over-ear headphones with 40hr battery life.', price: '$299', icon: '🎧' },
    { id: 2, title: 'Mechanical Keyboard', desc: 'Custom tactile switches with RGB per-key backlighting.', price: '$149', icon: '⌨️' },
    { id: 3, title: 'Ultra-wide Monitor', desc: '34-inch curved display perfect for productivity and gaming.', price: '$499', icon: '🖥️' },
    { id: 4, title: 'Ergonomic Mouse', desc: 'Vertical alignment to prevent wrist strain during long sessions.', price: '$79', icon: '🖱️' },
  ];

  const handleAddToCart = (title) => {
    alert(`Added "${title}" to cart! 🛒`);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Our Products</h1>
      <p className="page-text" style={{ marginBottom: '40px' }}>Discover our premium collection of accessories.</p>
      
      <div className="products-grid">
        {productsList.map(item => (
          <div key={item.id} className="product-card">
            <div className="product-icon">{item.icon}</div>
            <h3 className="product-title">{item.title}</h3>
            <p className="product-desc">{item.desc}</p>
            <div className="product-footer">
              <span className="product-price">{item.price}</span>
              <button className="btn-add-cart" onClick={() => handleAddToCart(item.title)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
