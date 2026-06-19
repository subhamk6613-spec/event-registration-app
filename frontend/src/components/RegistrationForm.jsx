import { useState } from 'react';
import api from '../api';
import './RegistrationForm.css';

const RegistrationForm = ({ eventId, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    source: 'Website'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.post(`/events/${eventId}/register`, formData);
      if (res.data.success) {
        setSuccess(true);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>Registration Successful!</h3>
        <p>You have successfully registered for this event. A confirmation email will be sent shortly.</p>
        <button className="btn-secondary" onClick={() => window.location.reload()}>
          View Other Events
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form-container">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label className="form-label" htmlFor="name">Full Name *</label>
        <input 
          type="text" 
          id="name"
          name="name" 
          className="input-field" 
          required 
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address *</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            className="input-field" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone"
            name="phone" 
            className="input-field" 
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="organization">Organization / Company</label>
        <input 
          type="text" 
          id="organization"
          name="organization" 
          className="input-field" 
          value={formData.organization}
          onChange={handleChange}
        />
      </div>
      
      <button 
        type="submit" 
        className="btn-primary" 
        disabled={loading}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        {loading ? 'Processing...' : 'Complete Registration'}
      </button>
    </form>
  );
};

export default RegistrationForm;
