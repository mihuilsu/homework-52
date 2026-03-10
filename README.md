<div align="center">

# 🛍️ ShopReact

**A modern e-commerce single-page application built with React & Redux Toolkit**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com)

[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/author-mihuilsu-blueviolet?style=flat-square&logo=github)](https://github.com/mihuilsu)
[![Vercel](https://img.shields.io/badge/demo-Vercel-000000?style=flat-square&logo=vercel)](https://your-live-demo-url.vercel.app)

</div>

---

## 📋 Overview

**ShopReact** is a fully functional e-commerce frontend built as part of a full-stack web development course (Homework #52). The app demonstrates real-world React patterns including component composition, Redux Toolkit state management with slices and thunks, client-side routing, and REST API integration.

The frontend is designed to be seamlessly integrated with a backend REST API once the server-side portion of the course is completed.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Product Catalog** | Browseable product grid with search and category filters |
| 🔍 **Product Detail** | Full product page with description, rating, and image |
| 🛒 **Shopping Cart** | Add, remove, update quantities — persisted in localStorage |
| 🔐 **Authentication** | Sign-in / Register modal with protected checkout flow |
| 📦 **Order History** | View past orders on the profile page |
| 📱 **Responsive Design** | Mobile-first layout that adapts to all screen sizes |
| ⚡ **Fast Dev Server** | Powered by Vite for near-instant HMR |

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── store.js          # Redux store — combines all slices
│   └── hooks.js          # useAppDispatch & useAppSelector
├── components/           # Shared UI components (no business logic)
│   ├── Button.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Modal.jsx
├── features/             # Feature modules (slices + components + API)
│   ├── products/         # Product listing, detail, filters
│   ├── cart/             # Cart state, CartItem component
│   ├── auth/             # Login/Register, auth slice
│   └── orders/           # Order history, orders slice
├── pages/                # Route-level page components
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   ├── ProfilePage.jsx
│   └── NotFoundPage.jsx
├── services/
│   ├── api/baseApi.js    # Axios instance with interceptors
│   └── storage/          # localStorage helpers
├── layouts/              # MainLayout with Header + Footer
├── utils/                # helpers.js, constants.js
├── App.jsx               # Route definitions
└── main.jsx              # Entry point — Provider + BrowserRouter
```

Each feature module follows a consistent internal structure:

```
features/<name>/
├── components/   ← UI components specific to the feature
├── api/          ← API call functions
├── model/        ← Redux slice (state, reducers, thunks, selectors)
├── lib/          ← Helper utilities
└── index.js      ← Public API (controls what is exported)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mihuilsu/homework-52.git
cd homework-52

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL to your backend URL
```

### Running Locally

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🔌 API Integration

The app is pre-configured to work with [Fake Store API](https://fakestoreapi.com) for development. To connect your own backend, set the environment variable:

```env
VITE_API_BASE_URL=https://your-backend.com/api
```

The Axios client (`src/services/api/baseApi.js`) automatically attaches the JWT token from localStorage to every request via an interceptor, so no additional setup is needed once the backend is ready.

**Expected endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products` | Paginated product list |
| `GET` | `/products/:id` | Single product |
| `POST` | `/auth/login` | Login → returns `{ user, token }` |
| `POST` | `/auth/register` | Register → returns `{ user, token }` |
| `GET` | `/orders` | Current user's orders |
| `POST` | `/orders` | Place a new order |

---

## 🛠️ Tech Stack

- **[React 18](https://react.dev)** — UI library with functional components and hooks
- **[Redux Toolkit](https://redux-toolkit.js.org)** — State management (slices, thunks, selectors)
- **[React Router 6](https://reactrouter.com)** — Client-side routing with nested routes
- **[Axios](https://axios-http.com)** — HTTP client with interceptors
- **[Vite](https://vitejs.dev)** — Build tool and dev server
- **CSS Modules** — Scoped component styles, no class name collisions

---

## 👤 Author

**mihuilsu** — [github.com/mihuilsu](https://github.com/mihuilsu)

---

<div align="center">

*homework-52 · React + Redux Toolkit course project*

</div>
