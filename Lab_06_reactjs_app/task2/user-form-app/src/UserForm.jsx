import { useState } from 'react';
import './UserForm.css';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmittedData({ ...formData });
      setFormData({ name: '', email: '' }); // Clear fields
    }
  };

  return (
    <div className="form-container">
      <div className="glass-panel">
        <h2 className="title">User Profile</h2>
        
        <form onSubmit={handleSubmit} className="user-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="glass-input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              className="glass-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Profile
          </button>
        </form>

        {submittedData && (
          <div className="result-card appear-animation">
            <h3>Submitted Data</h3>
            <div className="data-row">
              <span className="label">Name:</span>
              <span className="value">{submittedData.name}</span>
            </div>
            <div className="data-row">
              <span className="label">Email:</span>
              <span className="value">{submittedData.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
