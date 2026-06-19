# Event Registration Application

A full-stack Event Registration application featuring a Node.js/Express backend, a React/Vite frontend, and MongoDB for database management. The application provides a seamless experience for users to discover and register for events, while offering an administrative dashboard to monitor registrations and analytics.

---

## 🏗️ Project Architecture & Data Flow

This project seamlessly links a Node.js backend to a React frontend. Below are the details regarding the file structure and the data structures shared across the application stack.

### Directory Structure
- **`/backend`**: Contains the Node.js application. Handles business logic, database models, and exposing the REST APIs.
- **`/frontend`**: Contains the React application created with Vite. Handles the presentation layer, client-side routing, and rendering data from the backend APIs.

---

## 🗄️ Backend Data Models (MongoDB Schemas)

The backend is driven by MongoDB using Mongoose. Here are the core data structures utilized:

### 1. Event Model
Defines the structure for an event taking place.
```javascript
{
  name: String,            // e.g., "Full Stack Web Development Bootcamp"
  date: Date,              // e.g., 2026-06-25T00:00:00.000Z
  category: String,        // "Workshop" | "Seminar" | "Hackathon"
  mode: String,            // "Online" | "Offline" | "Hybrid"
  location: String,        // e.g., "Bangalore", "Online"
  description: String,     // Detailed text about the event
  availableSeats: Number   // e.g., 50 (Decrements upon successful registration)
}
```

### 2. Registration Model
Handles user registrations to specific events, enforcing a unique compound index on `eventId` and `email` to prevent double booking.
```javascript
{
  eventId: ObjectId,       // References the Event Model
  name: String,            // Registrant's full name
  email: String,           // Registrant's email address
  phone: String,           // Registrant's contact number
  organization: String,    // Optional company/school
  source: String           // "LinkedIn" | "Instagram" | "WhatsApp" | "Email" | "Direct"
}
```

### 3. Analytics Model
Logs custom events to track internal system metrics.
```javascript
{
  eventName: String,       // Name of the logged action
  payload: Object          // Custom unstructured metadata related to the event
}
```

---

## 💻 Frontend Data Handling & API Integration

The React frontend utilizes `axios` to interface with the backend APIs. Here is how the frontend consumes and manages the data:

### 1. Event Discovery (`GET /api/events`)
- **Action**: Fetches an array of `Event` objects.
- **Frontend State**: Maintained in the `events` array state.
- **Data Filtering**: Client-side filtering is applied to the data for real-time responsiveness based on user inputs (`search` text, `category` dropdown, `mode` dropdown).

### 2. Event Registration (`POST /api/events/:id/register`)
- **Action**: Secures a user's spot at a specific event.
- **Frontend Payload**: 
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "555-0100",
    "organization": "Acme Corp",
    "source": "Website"
  }
  ```
- **Response Handling**: 
  - If successful: Triggers a success state displaying a confirmation component.
  - If error (e.g., duplicate email or no seats left): Renders an error message returned directly from the backend.

### 3. System Dashboard (`GET /api/dashboard`)
- **Action**: Fetches aggregated statistics.
- **Frontend State**: Binds the response payload directly to the UI metrics.
- **Returned Data**:
  ```json
  {
    "success": true,
    "totalEvents": 8,
    "totalRegistrations": 24,
    "registrationsPerEvent": [ ... ],
    "recentRegistrations": [ ... ]
  }
  ```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI (already configured in the `.env` file)

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Run the development server (runs on `http://localhost:8000`):
   ```bash
   npm run dev
   ```
*(Optional)* To re-seed the mock events into your database, run:
```bash
npm run seed
```

### Running the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the `localhost` URL provided in your terminal (usually `http://localhost:5173`) in your web browser.

---
*Built with ❤️ utilizing the MERN stack and modern React patterns.*
