# 🌤️ Weather Tracker App (MERN + JWT Auth)

A full-stack weather tracking application built using **MongoDB, Express, React, Node.js**, with **Tailwind CSS**, **JWT Authentication**, and **OpenWeather API**.
Users can register/login, add cities, view real-time weather, and see **5-day forecast** and **temperature trend charts**.

---

## 🚀 Features

### ✅ Core Features

| Feature                | Description                               |
| ---------------------- | ----------------------------------------- |
| 🔑 Authentication      | Register & Login using JWT                |
| 🏙 Add Cities          | Track weather for multiple cities         |
| 🌦 Real-Time Weather   | Live temperature, humidity, wind, etc.    |
| 📅 5-Day Forecast      | Daily and hourly weather forecast         |
| 📊 Charts              | Temperature trend visualization           |
| 🗄 MongoDB Storage     | User-specific tracked cities              |
| ⏳ Cron Weather Updates | Every 1 hour auto refresh                 |
| 🔐 Protected Routes    | Only logged-in users can access dashboard |

### 🔧 Tech Stack

| Category    | Tech                                        |
| ----------- | ------------------------------------------- |
| Frontend    | React, Tailwind CSS, React Router, Chart.js |
| Backend     | Node.js, Express                            |
| Database    | MongoDB (Mongoose)                          |
| Auth        | JWT + bcrypt                                |
| Weather API | OpenWeather                                 |

---

## 📂 Folder Structure

```
weather-app/
 ├── backend/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── utils/
 │   ├── server.js
 │   └── package.json
 └── frontend/
     ├── src/
     │   ├── components/
     │   ├── pages/
     │   ├── api/
     │   ├── App.jsx
     │   └── index.jsx
     └── package.json
```

---

## 🔑 Environment Variables

Create `.env` in **backend**:

```
MONGODB_URI=YOUR_MONGO_URI
PORT=5000
JWT_SECRET=ANY_RANDOM_SECRET

OPENWEATHER_API_KEY=YOUR_API_KEY
OPENWEATHER_BASE=https://api.openweathermap.org/data/2.5
UNITS=metric
```

---

## 📦 Installation & Setup

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Future Enhancements

* 🌎 Map View of tracked cities
* 🌙 Dark Mode
* 📍 Auto location detection
* 📈 Multiple chart types (humidity, wind, pressure)

---

## 🧑‍💻 Author

**Sakshi Thakkar**
Full-Stack Web Developer (MERN)

---

