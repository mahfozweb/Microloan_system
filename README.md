# 💰 LoanLink - Microloan Management Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

**LoanLink** is a modern, high-performance microloan management platform designed to simplify the loan application and approval process. Featuring a sleek, premium UI/UX, robust role-based access control, and dynamic filtering, it provides a seamless experience for borrowers, managers, and administrators.

---

## ✨ Key Features

### 🔐 Multi-Role User System
- **Borrowers:** Explore loan products, apply for microloans, and track application status.
- **Managers:** Create and manage loan products, review pending applications, and approve/reject loans.
- **Administrators:** Full system oversight, including user management and platform-wide analytics.

### 💳 Loan Management
- **Dynamic Product Grid:** Browse available loans with professional imagery and real-time status indicators.
- **Advanced Filtering:** Instant filtering by categories (Personal, Business, Education) with smooth Framer Motion layout animations.
- **CRUD Operations:** Managers can easily add, edit, or delete loan products with real-time feedback.

### 🚀 Premium Experience
- **Stunning UI/UX:** Built with Tailwind CSS 4 and glassmorphism elements.
- **Dark Mode Support:** Fully responsive design with a beautiful dark mode implementation.
- **Fluid Animations:** Powered by Framer Motion for a cinematic feel during transitions and interactions.
- **Real-time Notifications:** Success and error toasts for every critical action.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Frontend** | React 18, Vite, TypeScript |
| **Styling** | Tailwind CSS 4, React Icons |
| **Animations** | Framer Motion, React Confetti |
| **Backend/Auth** | Firebase Authentication |
| **State/Data** | React Hooks, Context API, TanStack Query |
| **Forms** | React Hook Form |
| **Navigation** | React Router Dom 7 |
| **Other** | React Helmet Async, Axios, React Toastify |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mahfozweb/Microloan_system.git
cd Microloan_system
```

### 2. Install Dependencies
```bash
cd client
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 📂 Project Structure

```text
f:/Loan/
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── config/          # Firebase and API configurations
│   │   ├── contexts/        # Auth and Theme providers
│   │   ├── data/            # Static data sources (loans.js)
│   │   ├── pages/           # Main route pages and dashboards
│   │   ├── services/        # API and Firebase services
│   │   ├── utils/           # Helper functions and constants
│   │   └── App.jsx          # Main application router
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ by [Your Name or Team]
