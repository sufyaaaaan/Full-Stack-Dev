const About = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About Us</h1>
      <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, padding: '40px', borderRadius: '24px' }}>
        <h2>Our Mission</h2>
        <p className="page-text" style={{ marginBottom: '24px' }}>
          We are dedicated to building fast, reliable, and aesthetically pleasing digital experiences.
          This Multi-Page Website represents our commitment to excellence in frontend development,
          utilizing the power of React Router DOM to seamlessly transition between views without page reloads.
        </p>
        
        <h2>The Technology</h2>
        <ul className="page-text" style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>🚀 Vite for lightning fast HMR</li>
          <li>⚛️ React for UI component structure</li>
          <li>🛣️ React Router DOM for client-side routing</li>
          <li>🎨 Premium custom CSS with modern aesthetics</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
