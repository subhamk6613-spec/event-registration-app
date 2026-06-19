import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  MapPin,
  Monitor,
  ChevronRight
} from 'lucide-react';
import api from '../api';
import './EventListing.css';

const eventImages = {
  "Full Stack Web Development Bootcamp":
    "https://images.unsplash.com/photo-1669023414166-a4cc7c0fe1f5?q=80&w=1932&auto=format&fit=crop",
  "AI and Machine Learning Summit 2026":
    "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1932&auto=format&fit=crop",
  "Global Fintech Hackathon":
    "https://images.unsplash.com/photo-1730109428235-61495d358a2a?q=80&w=1740&auto=format&fit=crop",
  "Advanced Cloud Computing with AWS":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1740&auto=format&fit=crop",
  "Cybersecurity Best Practices Seminar":
    "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1740&auto=format&fit=crop",
  "Web3 and Blockchain Hackathon":
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1740&auto=format&fit=crop",
  "UX/UI Design Fundamentals Workshop":
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1740&auto=format&fit=crop",
  "Future of E-Commerce Leadership Seminar":
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1740&auto=format&fit=crop"
};

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/events');

      if (res.data.success) {
        setEvents(res.data.data);
      } else {
        setError('Failed to fetch events');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Error connecting to server'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchSearch =
      event.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory = categoryFilter
      ? event.category === categoryFilter
      : true;

    const matchMode = modeFilter
      ? event.mode === modeFilter
      : true;

    return matchSearch && matchCategory && matchMode;
  });

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="premium-layout">
      {/* HERO SECTION */}
      <section className="premium-hero">
        <div className="hero-content">
          <span className="hero-badge">✨ Premium Event Platform</span>
          <h1 className="hero-title">
            Discover, Register & Attend Amazing Events
          </h1>
          <p className="hero-subtitle">
            Workshops, Seminars, Hackathons and Conferences — all in one modern platform.
          </p>
        </div>
      </section>

      <div className="main-container">
        {/* SEARCH & FILTER BAR */}
        <div className="glass-filter-bar">
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="premium-input"
              placeholder="Search by event name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="select-wrapper">
            <select
              className="premium-select"
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
            >
              <option value="">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* CATEGORY CHIPS */}
        <div className="premium-chips-container">
          {['', 'Workshop', 'Seminar', 'Hackathon'].map((cat) => (
            <button
              key={cat}
              className={`premium-chip ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === '' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* HEADER / ERROR */}
        {error && <div className="error-message">{error}</div>}

        {/* EVENTS GRID */}
        {filteredEvents.length === 0 ? (
          <div className="no-events-state">
            <h3>No events found matching your criteria.</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="premium-events-grid">
            {filteredEvents.map((event) => (
              <div key={event._id} className="premium-event-card">
                <div className="card-image-wrapper">
                  <img
                    className="event-image" /* FIXED */
                    src={
                      eventImages[event.name] ||
                      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1932&auto=format&fit=crop"
                    }
                    alt={event.name}
                  />
                  {/* Positioned inside the image wrapper */}
                  <div className="event-category-badge">{event.category}</div> 
                </div>

                <div className="card-content">
                  <h3 className="card-title">{event.name}</h3>

                  <div className="card-meta-list">
                    <div className="card-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="card-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="card-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Monitor size={16} />
                      <span>{event.mode}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <span
                      className={`seats-badge ${ /* FIXED */
                        event.availableSeats > 0 ? 'seats-available' : 'seats-full'
                      }`}
                    >
                      {event.availableSeats > 0
                        ? `${event.availableSeats} Seats Left`
                        : 'Sold Out'}
                    </span>
                    <Link to={`/events/${event._id}`} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}> {/* FIXED */}
                      View Event <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventListing;