import { Link, useLocation } from 'react-router-dom';
import { Calendar, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Calendar className="logo-icon" size={28} />
          <span>EventHub</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active-nav' : ''
              }`}
          >
            <Calendar size={18} />
            <span>Events</span>
          </Link>

          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === '/dashboard' ? 'active-nav' : ''
              }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;