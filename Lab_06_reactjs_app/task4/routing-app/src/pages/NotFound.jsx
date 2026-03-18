import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '8rem', margin: '0', background: 'linear-gradient(135deg, #4f46e5, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Page Not Found</h2>
      <p className="page-text" style={{ marginBottom: '40px' }}>
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
