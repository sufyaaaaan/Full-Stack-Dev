import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-text">Have a question? We'd love to hear from you. Send us a message below.</p>
      
      <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, padding: '40px', borderRadius: '24px', maxWidth: '600px', marginTop: '40px' }}>
        {submitted ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
            Thanks for reaching out! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required placeholder="John Doe" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="john@example.com" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="form-control" rows="5" required placeholder="How can we help?" style={{ resize: 'vertical' }}></textarea>
            </div>
            
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
