require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Event = require("../models/event");

const seedEvents = [
  {
    name: "Full Stack Web Development Bootcamp",
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    category: "Workshop",
    mode: "Hybrid",
    location: "Bangalore",
    description: "An intensive 3-day bootcamp covering the MERN stack. Master React, Node.js, Express, and MongoDB by building real-world projects. Suitable for beginners to intermediate developers.",
    availableSeats: 50,
  },
  {
    name: "AI and Machine Learning Summit 2026",
    date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    category: "Seminar",
    mode: "Offline",
    location: "Delhi",
    description: "Join industry leaders to discuss the future of AI and Machine Learning. Network with professionals, attend keynote sessions, and discover the latest trends in GenAI.",
    availableSeats: 150,
  },
  {
    name: "Global Fintech Hackathon",
    date: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    category: "Hackathon",
    mode: "Online",
    location: "Online",
    description: "A 48-hour virtual hackathon focused on building innovative financial technology solutions. Win exciting prizes, get mentorship from experts, and connect with global developers.",
    availableSeats: 300,
  },
  {
    name: "Advanced Cloud Computing with AWS",
    date: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    category: "Workshop",
    mode: "Online",
    location: "Online",
    description: "Learn how to architect, deploy, and scale applications on Amazon Web Services. This hands-on workshop will cover EC2, S3, Lambda, and serverless computing patterns.",
    availableSeats: 100,
  },
  {
    name: "Cybersecurity Best Practices Seminar",
    date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    category: "Seminar",
    mode: "Hybrid",
    location: "Noida",
    description: "Understand the modern threat landscape and learn essential cybersecurity best practices to secure enterprise applications. Features expert talks and interactive Q&A sessions.",
    availableSeats: 80,
  },
  {
    name: "Web3 and Blockchain Hackathon",
    date: new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    category: "Hackathon",
    mode: "Offline",
    location: "Bangalore",
    description: "Build decentralized applications (dApps) and smart contracts. Collaborate with crypto enthusiasts to solve real-world problems using blockchain technology over a thrilling weekend.",
    availableSeats: 120,
  },
  {
    name: "UX/UI Design Fundamentals Workshop",
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    category: "Workshop",
    mode: "Offline",
    location: "Delhi",
    description: "Dive deep into user experience and interface design principles. Learn wireframing, prototyping, and user testing to create intuitive and beautiful digital products.",
    availableSeats: 40,
  },
  {
    name: "Future of E-Commerce Leadership Seminar",
    date: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    category: "Seminar",
    mode: "Hybrid",
    location: "Noida",
    description: "A strategic seminar exploring the intersection of e-commerce, customer experience, and logistics. Hear from top e-commerce founders and digital marketers.",
    availableSeats: 200,
  }
];

const importData = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing events
    await Event.deleteMany();
    console.log("Existing events cleared.");

    // Insert mock events
    await Event.insertMany(seedEvents);
    console.log("Mock events inserted successfully!");

    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

importData();
