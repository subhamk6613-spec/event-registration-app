# Event Registration Mini App

A full-stack Event Registration Application built using React, Node.js, Express, and MongoDB. The application allows users to browse events, view event details, register for events, and track registrations through a dashboard.

---

## Features

### Event Listing

* View all available events
* Search events by title
* Filter events by category
* Responsive event cards

### Event Details

* Detailed event information
* Event date and location
* Available registration count

### Event Registration

* User registration form
* Name and email validation
* Registration confirmation

### Dashboard

* Total events created
* Total registrations
* Event-wise registration analytics

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

---

## Project Structure

```text
event-registration-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│
└── README.md
```

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/subhamk6613-spec/event-registration-app.git
cd event-registration-app
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

---

## API Endpoints

### Events

```http
GET /api/events
```

Fetch all events.

```http
GET /api/events/:id
```

Fetch a single event.

```http
POST /api/events
```

Create a new event.

### Registrations

```http
POST /api/events/:id/register
```

Register for an event.

```http
GET /api/events/:id/registrations
```

Get registrations for an event.

## Challenges Faced

### MongoDB Atlas Connection Issue

* Initial database connection failed due to Atlas network restrictions.
* Resolved by adding the current IP address to MongoDB Atlas Network Access.

### API Communication Errors

* Encountered CORS-related issues between frontend and backend.
* Fixed by configuring Express CORS middleware.

### Frontend Layout Adjustments

* Improved responsiveness using CSS Grid and Flexbox.
* Optimized card layouts and filter sections.

---

## Future Improvements

* User Authentication (JWT)
* Admin Dashboard
* Event Image Upload
* Email Notifications
* Pagination and Advanced Filters

---

## Author

**Subham Kumar**

B.Tech Computer Science & Engineering
Bennett University

---

## License

This project is licensed under the MIT License.
