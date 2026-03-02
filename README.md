# 🚗 Towing Request Management System

A full-stack towing request system built using:

- 🖥️ Laravel (Backend API)
- 🌐 Web Customer App (Responsive)
- 📱 React Native Driver App
- 🔄 Pusher (Real-time Updates using WebSockets)

---

# 📌 Project Overview

This system allows:

👤 Customers (Web App - web-customer)
- Submit towing requests
- Enter name, location, and note
- Requests are stored in the database

🚛 Drivers (Mobile App - MobileDriverApp)
- View all towing requests
- Accept a request
- Status changes from "pending" → "assigned"

🔄 Real-time Updates
- Implemented using **Pusher WebSockets**
- When a request is created or accepted, all connected apps update instantly

---

# 📁 Project Structure

```
towing-request-system/
│
├── backend/            → Laravel API
├── web-customer/       → Customer Web Application
├── MobileDriverApp/    → React Native Driver App
└── README.md
```

---

# ⚙️ BACKEND SETUP (Laravel)

## 1️⃣ Navigate to backend folder

```bash
cd backend
```

## 2️⃣ Install dependencies

```bash
composer install
```

## 3️⃣ Setup environment file

```bash
cp .env.example .env
php artisan key:generate
```

## 4️⃣ Configure Database

Open `.env` and update:

```
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 5️⃣ Run migrations

```bash
php artisan migrate
```

## 6️⃣ Configure Pusher

Inside `.env`:

```
BROADCAST_DRIVER=pusher

PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_key
PUSHER_APP_SECRET=your_secret
PUSHER_APP_CLUSTER=ap2
```

Then clear config:

```bash
php artisan config:clear
```

## 7️⃣ Start Laravel server

```bash
php artisan serve
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

# 🌐 WEB CUSTOMER APP SETUP (web-customer)

## 1️⃣ Navigate to folder

```bash
cd web-customer
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Start development server

```bash
npm start
```

## 🌟 Features

- Responsive Design (Mobile Friendly)
- Submit Towing Request
- Real-time update using Pusher
- Clean UI

---

# 📱 MOBILE DRIVER APP SETUP (MobileDriverApp)

## 1️⃣ Navigate to folder

```bash
cd MobileDriverApp
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Start Metro server

```bash
npx react-native start
```

## 4️⃣ Run Android

```bash
npx react-native run-android
```

⚠ IMPORTANT:

If using Android Emulator, make sure API URL is:

```
http://10.0.2.2:8000/api
```

Backend must be running before launching the app.

---

# 🔌 API ENDPOINTS

## Get all requests
```
GET /api/requests
```

## Create request
```
POST /api/requests
```

## Accept request
```
PATCH /api/requests/{id}/accept
```

---

# 🔄 Real-Time Implementation (Bonus Feature)

This project uses **Pusher WebSockets** to provide:

- Instant request updates
- No page refresh required
- Real-time synchronization between web and mobile apps

Flow:

1. Customer submits request (web-customer)
2. Backend stores request in database
3. Backend broadcasts event via Pusher
4. MobileDriverApp receives real-time update
5. Driver accepts request
6. Status updates to "assigned"
7. Update is broadcast to all users

---

# ✅ Features Implemented

✔ Create Towing Request  
✔ Accept Request (Status → Assigned)  
✔ Persistent Database Storage  
✔ Real-Time Updates (Pusher)  
✔ Responsive Web Design  
✔ RESTful API  
✔ Clean Folder Structure  

---

# 🚀 How To Run On Another Device

## Step 1
Clone repository:

```bash
git clone https://github.com/YOUR_USERNAME/towing-request-system.git
```

## Step 2
Navigate into project:

```bash
cd towing-request-system
```

## Step 3
Setup backend first (see backend setup section)

## Step 4
Run web-customer app

## Step 5
Run MobileDriverApp

---

# 🔐 Requirements

- PHP 8+
- Composer
- Node.js
- MySQL
- Android Studio (for emulator)
- Pusher Account

---

# 👨‍💻 Author

Your Name

---

# 📌 Important Notes

- Backend must be running before web or mobile apps
- Database must be created before running migrations
- Pusher credentials must be correct
- Use `10.0.2.2` for Android emulator API calls