# Clinic Appointment System (3MTT Capstone Project)

## Overview

The Clinic Appointment System is a beginner-friendly full-stack web application designed to streamline patient scheduling for local clinics. It eliminates long physical queues and paper-based record-keeping by allowing patients to book appointments online while providing receptionists with a centralized dashboard to track all visits.

## Features

* **Patient Booking Interface:** Allows patients to input their full name, select a specialist doctor, and pick an appointment date.
* **Database Persistence:** Automatically saves all bookings securely using a lightweight SQLite database.
* **Receptionist Admin Dashboard:** A toggleable admin view that displays all historical and incoming patient appointments in a clean tabular format.

## Tech Stack

* **Frontend:** React, HTML5, CSS3, JavaScript (Vite build tool)
* **Backend:** Node.js, Express.js
* **Database:** SQLite3
* **Communication:** REST APIs with CORS support

## Project Structure

```text
clinic-app/
├── server/
│   ├── server.js       # Backend server and SQLite database setup
│   └── clinic.db       # Local SQLite database file (auto-generated)
└── src/
    ├── App.jsx         # Main React component (Patient form & Admin view)
    └── main.jsx        # React application entry point    
