import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, Activity } from 'lucide-react';
import api from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dashboard');

      if (res.data.success) {
        setStats(res.data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!stats) return null;

  return (
    <div className="dashboard-container">
      {/* HERO SECTION */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-badge">
            📊 Analytics Overview
          </span>

          <h1 className="dashboard-hero-title">
            Event Management Dashboard
          </h1>

          <p className="dashboard-hero-subtitle">
            Track registrations, monitor engagement,
            and analyze event performance in real time.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={32} />
          </div>

          <div className="stat-info">
            <h3>Total Events</h3>
            <p>{stats.totalEvents}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={32} />
          </div>

          <div className="stat-info">
            <h3>Total Registrations</h3>
            <p>{stats.totalRegistrations}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={32} />
          </div>

          <div className="stat-info">
            <h3>Events with Registrations</h3>
            <p>
              {stats.registrationsPerEvent?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2 className="section-title">
            Recent Registrations
          </h2>

          {stats.recentRegistrations?.length > 0 ? (
            <div className="recent-registrations-list">
              {stats.recentRegistrations.map((reg) => (
                <div
                  key={reg._id}
                  className="registration-item"
                >
                  <div className="registration-info">
                    <h4>{reg.name}</h4>

                    <p>
                      {reg.email}
                      {reg.organization
                        ? ` • ${reg.organization}`
                        : ''}
                    </p>
                  </div>

                  <div className="registration-time">
                    {new Date(
                      reg.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>
              No recent registrations found.
            </p>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">
            Quick Actions
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <button
              className="btn-primary"
              onClick={() =>
                (window.location.href = '/')
              }
            >
              View All Events
            </button>

            <button
              className="btn-secondary"
              onClick={fetchDashboardStats}
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;