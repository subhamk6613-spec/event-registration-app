import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Monitor, ArrowLeft, Users, Tag } from 'lucide-react';
import api from '../api';
import RegistrationForm from '../components/RegistrationForm';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/events/${id}`);
      if (res.data.success) {
        setEvent(res.data.data);
      } else {
        setError('Failed to fetch event details');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSuccess = () => {
    // Refresh event details to update available seats
    fetchEventDetails();
  };

  if (loading) return <div className="spinner"></div>;
  
  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <Link to="/" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Events</Link>
      </div>
    );
  }

  if (!event) return null;

  const isAvailable = event.availableSeats > 0;

  return (
    <div>
      <Link to="/" className="back-link">
        <ArrowLeft size={20} />
        Back to all events
      </Link>
      
      <div className="event-details-container">
        <div className="event-details-content">
          <div className="details-header">
            <span className="event-category-badge">{event.category}</span>
            <h1 className="details-title">{event.name}</h1>
            
            <div className="details-meta-grid">
              <div className="meta-item">
                <div className="meta-icon-wrapper">
                  <Calendar size={24} />
                </div>
                <div className="meta-info">
                  <h4>Date & Time</h4>
                  <p>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              
              <div className="meta-item">
                <div className="meta-icon-wrapper">
                  <MapPin size={24} />
                </div>
                <div className="meta-info">
                  <h4>Location</h4>
                  <p>{event.location}</p>
                </div>
              </div>
              
              <div className="meta-item">
                <div className="meta-icon-wrapper">
                  <Monitor size={24} />
                </div>
                <div className="meta-info">
                  <h4>Mode</h4>
                  <p>{event.mode}</p>
                </div>
              </div>

              <div className="meta-item">
                <div className="meta-icon-wrapper">
                  <Users size={24} />
                </div>
                <div className="meta-info">
                  <h4>Availability</h4>
                  <p>{event.availableSeats > 0 ? `${event.availableSeats} Seats Left` : 'Sold Out'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="details-section">
            <h3>About This Event</h3>
            <p>{event.description}</p>
          </div>
        </div>
        
        <div className="registration-sidebar">
          <div className="registration-status">
            <div className={`status-badge ${isAvailable ? 'status-available' : 'status-full'}`}>
              {isAvailable ? 'Registration Open' : 'Event is Full'}
            </div>
            {isAvailable ? (
              <p style={{ color: 'var(--text-muted)' }}>Secure your spot by filling out the form below.</p>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Sorry, this event has reached maximum capacity.</p>
            )}
          </div>
          
          {isAvailable && (
            <RegistrationForm eventId={event._id} onSuccess={handleRegistrationSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
