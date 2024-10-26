# 🗓️ Appointment Scheduler Application
 
This is a **React-based appointment scheduler** application that allows users to log in, create, and manage appointments efficiently. It focuses on delivering a smooth user experience with real-time data syncing, authentication, and database management using Firebase. The project leverages modern tools to ensure fast builds, type safety, and responsive design.
 
## ✨ Features
 
### 🔐 Authentication
- **Registration**: Users can register using a username and password.
- **Login**: Registered users can log in with their credentials.
 
### 👤 User Interaction
- **👥 View and Search Users**: View all users and search for specific users by username.
- **📅 Create Appointment**: Schedule appointments with users. The appointment form includes fields for title, description, date, time, duration, and an optional audio file.
 
### 📊 Appointment Management
- **📖 View Appointments**: Separate views for past appointments, scheduled appointments, invited appointments, and appointments the user has invited others to.
- **🛠️ Manage Appointments**: Users invited to an appointment can accept or decline. Users who scheduled the appointment can cancel it any time before the appointment.
- **🔍 Filter Appointments**: Filter appointments by status (pending, accepted, declined, canceled, completed) or by date.
- **🔊 View Appointment Details**: View details of an appointment by clicking the appointment title, and play the included audio files if available.
 
## 🛠️ Tools and Frameworks
 
- **⚡ Build Process**: Vite
- **🧑‍💻 Language**: React with TypeScript
- **🔐 Authentication, Storage, and Database**: Firebase
- **🎨 Styling**: TailwindCSS and Flowbite
 
## 🚀 Getting Started
 
### 📋 Prerequisites
- Ensure you have the required version of [Node.js](https://nodejs.org/) installed.
 
### ⚙️ Installation
 
1. **Clone the repository**:
   ```bash
   git clone git@github.com:Ayve-178/appointment-scheduler.git
 
2. **Add Configuration**:
   - Add Firebase configuration in a `.env` file:
   Include your Firebase project’s configuration details, follow `dummy.env` for reference.
 
3. **Install dependencies**:
   ```bash
   npm install
 
4. **Start the development server**:
   ```bash
   npm run dev
 
🚀  The application will now be running on [http://localhost:5173](http://localhost:5173).