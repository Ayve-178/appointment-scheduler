# Appointment Scheduler Application

This is a React-based appointment scheduler application allowing users to log in, create, and manage appointments. The project is built with modern tools and technologies, including Vite, TypeScript, Firebase, and TailwindCSS with Flowbite for styling.

## Features

### Authentication
- **Registration**: Users can register using a username and password.
- **Login**: Registered users can log in with their credentials.

### User Interaction
- **View and Search Users**: View all users and search for specific users by username.
- **Create Appointment**: Schedule appointments with users. The appointment form includes fields for title, description, date, time, duration, and an optional audio file.

### Appointment Management
- **View Appointments**: Separate views for past appointments, scheduled appointments, invited appointments, and appointments the user has invited others to.
- **Manage Appointments**: Users invited to an appointment can accept or decline. Users who scheduled the appointment can cancel it any time before the appointment.
- **Filter Appointments**: Filter appointments by status (pending, accepted, declined, canceled, completed) or by date.
- **View Appointment Details**: View details of an appointment, including playing any included audio files.

## Tech Stack

- **Build Process**: Vite
- **Language**: React with TypeScript
- **Authentication, Storage, and Database**: Firebase
- **Styling**: TailwindCSS and Flowbite

## Getting Started

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Update Firebase configuration in a `.env` file:
   - Include your Firebase project’s configuration details.

3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm run dev
  
The application will now be running on [http://localhost:5173](http://localhost:5173).