# PrimeTrade.ai - Crypto Trading Terminal

A full-stack trading journal application built with a focus on "Dark Fintech" aesthetics, security, and performance. This project allows traders to log positions, track PnL, and filter trade history in a secure, authenticated environment.

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

## 🛠️ Installation & Setup

### 1. Clone the Repository

    git clone https://github.com/YOUR_USERNAME/primetrade-assessment.git
    cd primetrade-assessment

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

* `POST /api/auth/signup` - Register new user
* `POST /api/auth/login` - Authenticate user
* `GET /api/trades` - Fetch user's trade history (Protected)
* `POST /api/trades` - Log a new trade (Protected)
* `DELETE /api/trades/:id` - Remove a trade entry (Protected)

## 📈 Scalability & Production Strategy

To scale this application for production, I would implement the following architectural improvements:

1.  **Database Indexing:** Currently, the app searches trades by `pair` (e.g., BTC/USDT). Adding a MongoDB index on the `pair` and `user` fields would make search queries instant, even with millions of trade records.
2.  **Code Splitting & Lazy Loading:** The Next.js frontend already supports code splitting. For scaling, I would implement dynamic imports for heavy components (like the Charting library or Modals) so the initial page load remains fast on mobile networks.
3.  **Error Logging Service:** Instead of saving logs to a local `server.log` file (which is hard to manage on multiple servers), I would integrate a cloud logging service like **Sentry** or **Datadog** to track crash reports in real-time.
4.  **Rate Limiting:** To prevent abuse of the API (e.g., someone spamming the "Create Trade" button), I would add `express-rate-limit` middleware to the backend to restrict requests per IP address.