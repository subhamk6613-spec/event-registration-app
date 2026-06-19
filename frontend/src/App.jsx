import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventListing from './pages/EventListing';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<EventListing />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
