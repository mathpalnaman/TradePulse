# TradePulse - Crypto Trading Terminal

**The Problem:** Crypto traders often struggle to track their performance across multiple exchanges. Spreadsheets are messy and lack real-time data structure.

**The Solution:** TradePulse is a dedicated, secure trading journal that offers a unified dashboard for logging positions, visualizing PnL, and maintaining a disciplined trading history.

TradePulse is a full-stack application built with a focus on "Dark Fintech" aesthetics, security, and performance.

## 🚀 Tech Stack

* **Frontend:** Next.js (App Router), Tailwind CSS (v4), Framer Motion, Lucide Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT (JSON Web Tokens)
* **Security:** bcryptjs for password hashing, CORS protection

## ✨ Key Features

* **Dark Fintech UI:** Custom glassmorphism design with neon accents and mesh gradients.
* **Secure Auth:** Full Signup/Login flow with JWT stored in persistent context.
* **Dashboard:** Real-time CRUD operations for trade logging.
* **Smart Filtering:** Filter trades by Long/Short positions and dynamic search by asset pair.
* **Responsive:** Fully optimized for mobile and desktop terminals.

## 🏗️ System Architecture

The application uses a decoupled architecture with a RESTful Node.js API serving a Next.js client.
* **State Management:** React Context API with persistent local storage synchronization for JWTs.
* **Data Flow:** The backend serves as a centralized source of truth, validating all trade data before storage in MongoDB.
* **Security Layer:** All protected routes utilize custom middleware to verify JWT signatures before granting access to private trade data.

## 🛠️ Installation & Setup

### 1. Clone the Repository
git clone [https://github.com/YOUR_USERNAME/TradePulse.git](https://github.com/YOUR_USERNAME/TradePulse.git)
cd TradePulse

### 2. Backend Setup
Navigate to the backend folder and install dependencies:

    cd backend
    npm install

Create a `.env` file in the `backend` folder:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string_here
    JWT_SECRET=your_secret_key_here

Start the server:

    npx nodemon server.js

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:

    cd frontend
    npm install

Start the client:

    npm run dev

The application will launch at `http://localhost:3000`.

## 📂 Project Structure

* `backend/` - Express API, Models, Controllers, and Middleware.
* `frontend/` - Next.js 13+ App Router structure with Context API state management.

## 🛡️ API Endpoints

| Method | Endpoint | Description | Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/signup` | Register new user | `{ "name": "...", "email": "...", "password": "..." }` |
| **POST** | `/api/auth/login` | Authenticate user | `{ "email": "...", "password": "..." }` |
| **GET** | `/api/trades` | Get user's trades | *Headers: Authorization: Bearer <token>* |
| **POST** | `/api/trades` | Log a new trade | `{ "pair": "BTC/USDT", "type": "Long", "entryPrice": 50000, "amount": 1000, "status": "Open" }` |
| **DELETE** | `/api/trades/:id` | Delete a trade | *Headers: Authorization: Bearer <token>* |

## 📈 Future Roadmap & Scalability

The following architectural improvements are planned for the next version to handle high-frequency data and increased user load:

1.  **Database Optimization:** Implementation of compound indexing on pair and user fields to ensure sub-millisecond query performance as dataset grows to millions of records.
2.  **Performance:** Enhanced code splitting and dynamic imports for heavy visualization components (Charts/Graphs) to maintain high Core Web Vitals scores.
3.  **Observability:** Integration of cloud logging services (Sentry/Datadog) to replace local file logging, enabling real-time crash reporting and distributed tracing.
4.  **Security Hardening:** Implementation of `express-rate-limit` to prevent DDoS attacks and migration to HttpOnly cookies for enhanced XSS protection.