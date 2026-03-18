import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to Our Premium Hub</h1>
      <p className="page-text">
        Experience the next generation of web applications. Built with React Router, 
        designed with passion, and optimized for performance. Check out our latest products 
        or get in touch with our team.
      </p>
      
      <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
        <Link to="/products" className="btn-primary" style={{ textDecoration: 'none' }}>
          Explore Products
        </Link>
        <Link to="/about" className="btn-primary" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;
