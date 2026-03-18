import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">⚛️</span> ReactRouter
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
          <Link to="/products" className={isActive('/products')}>Products</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
