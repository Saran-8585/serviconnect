# Serviconnect

**Connect with trusted local service providers.**

Serviconnect is a full-stack web application that bridges the gap between customers and local service professionals. Built with the MERN stack (MongoDB replaced with SQLite), it enables users to discover, compare, and book verified service providers for home services, repairs, and professional needs.

Whether you need a plumber, an electrician, a home cleaning service, or a tutor — Serviconnect makes it easy to find the right person for the job, check their availability, and book in seconds.

### The Problem

Finding reliable local service professionals is fragmented and frustrating. Customers juggle multiple platforms, lack transparency on pricing and availability, and have no way to verify quality before booking. Service providers struggle with manual scheduling, missed appointments, and limited visibility to potential customers.

### The Solution

Serviconnect unifies the entire service lifecycle on a single platform:
- **Customers** discover providers by category, view detailed profiles with ratings and reviews, check real-time availability, book appointments, pay securely, and communicate via in-app chat.
- **Providers** manage their business presence, list services with pricing, control their schedule, receive booking requests, and build their reputation through customer reviews.
- **Admins** oversee the ecosystem — approve providers, manage categories, resolve disputes, and monitor platform analytics.

### Key Differentiators

- **Real-time communication** — Built-in Socket.io chat lets customers and providers coordinate without leaving the platform.
- **Role-based access** — Three distinct user roles (Customer, Provider, Admin) with tailored dashboards and permissions.
- **Dark mode** — Full theme support with system preference detection and persistent user choice.
- **Relational integrity** — SQLite with foreign keys and transactions guarantees no double-bookings and consistent data.
- **Zero setup** — No Docker, no cloud database, no environment variables to configure beyond a single `.env` file.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Overview](#api-overview)
- [Seed Data](#seed-data)
- [Design System](#design-system)
- [Development Roadmap](#development-roadmap)
- [License](#license)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, CSS Modules, React Router v6 |
| **Backend** | Node.js, Express 4 |
| **Database** | SQLite via better-sqlite3 + Knex.js |
| **Authentication** | JWT (JSON Web Tokens) + bcrypt |
| **Real-time** | Socket.io (chat, notifications) |
| **Validation** | express-validator (server), custom hooks (client) |

### Why SQLite instead of MongoDB?

- **Zero configuration** — No separate database server to install or manage. SQLite is a single file.
- **ACID compliance** — Booking operations use native SQLite transactions, guaranteeing no double-bookings.
- **Relational integrity** — Foreign keys, unique constraints, and JOINs provide data consistency.
- **Portfolio simplicity** — Anyone can clone the repo and run it immediately without setting up Atlas.

---

## Architecture

The application follows a **modular monolith** pattern — a single Express server with clear separation between routes, controllers, services, and data access layers. The frontend is a decoupled React SPA that communicates with the backend via REST APIs.

```
┌─────────────┐     ┌───────────────────┐     ┌──────────┐
│  React SPA  │────▶│  Express REST API │────▶│  SQLite  │
│  (Vite)     │◀────│  + Socket.io      │◀────│  (Knex)  │
└─────────────┘     └───────────────────┘     └──────────┘
       │                       │
       │                       │
  CSS Modules            JWT Auth
  Design Tokens          Validators
```

---

## Features

### Current

- **User authentication** — Register, login, JWT-based session management
- **Profile management** — Update name, phone, avatar
- **Role-based access** — Customer, provider, and admin roles
- **Dark mode** — Full theme support with system preference detection
- **Responsive design** — Mobile-first layout across all pages
- **UI component library** — 7 reusable primitives with variant system
- **Landing page** — Hero section, category grid, how-it-works flow
- **Category browsing** — Browse services by category with search and filters
- **Provider onboarding** — Business profiles, service listings, verification
- **Booking engine** — Date/time selection, availability management, status flow
- **Real-time chat** — Socket.io messaging between customers and providers
- **Reviews & ratings** — Post-booking feedback system

### Planned

- **Admin dashboard** — Platform management, analytics, user oversight
- **Payment integration** — Online payment processing
- **Deployment** — Production configuration and hosting

---

## User Roles

### Customer
Browse services, search by category/location, view provider profiles, book appointments, manage bookings, rate and review, chat with providers.

### Service Provider
Create and manage business profile, list services with pricing, set availability calendar, accept/reject bookings, communicate with customers, view earnings and reviews.

### Admin
Dashboard with platform analytics, manage users and providers, create and manage categories, oversee bookings, handle disputes.

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd serviconnect

# Install all dependencies
npm install
cd server && npm install
cd ../client && npm install
cd ..

# Run database migrations
cd server && npm run migrate
cd ..
```

### Running the Application

Start both server and client together:

```bash
npm run dev
```

Or start them separately (two terminals):

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:5001 |
| **Health Check** | http://localhost:5001/api/health |

---

## Seed Data

The project includes 8 seed files with sample data for development and testing. Run them after migrations:

```bash
cd server && npm run seed
```

### Test Accounts

All seed accounts use the password `password123`:

| Role | Name | Email |
|------|------|-------|
| **Admin** | Admin User | admin@serviconnect.com |
| **Provider** | Ravi Sharma | ravi@example.com |
| **Provider** | Amit Singh | amit@example.com |
| **Customer** | Priya Patel | priya@example.com |
| **Customer** | Sneha Reddy | sneha@example.com |

### Sample Data Summary

| Table | Records | Details |
|-------|---------|---------|
| `users` | 5 | 1 admin, 2 providers, 2 customers |
| `categories` | 6 | Plumbing, Electrical, Cleaning, Painting, Carpentry, Appliance Repair |
| `provider_profiles` | 2 | Ravi Plumbing Solutions, Amit Electrical Works |
| `services` | 6 | 3 plumbing services, 3 electrical services |
| `bookings` | 4 | Mix of confirmed, pending, completed, and cancelled |
| `reviews` | 2 | 5-star and 4-star reviews on completed bookings |
| `messages` | 3 | Conversation between Priya and Ravi about a booking |
| `notifications` | 3 | New booking, booking confirmed, and new review alerts |

### Re-running Seeds

To reset and re-seed at any time:

```bash
cd server && npm run seed
```

---

## Project Structure

```
serviconnect/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Primitive components (Button, Input, Card, etc.)
│   │   │   ├── layout/         # Navbar, Footer, ProtectedRoute
│   │   │   ├── customer/       # Customer-specific components
│   │   │   ├── provider/       # Provider-specific components
│   │   │   └── admin/          # Admin-specific components
│   │   ├── pages/
│   │   │   ├── auth/           # Login, Register
│   │   │   ├── customer/       # Browse, Book, MyBookings
│   │   │   ├── provider/       # Dashboard, Services, Bookings
│   │   │   └── admin/          # Dashboard, Users, Categories
│   │   ├── context/            # AuthContext, ThemeContext
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Axios instance, utilities
│   │   ├── styles/             # Design tokens, global CSS
│   │   └── utils/              # Formatters, validators
│   ├── vite.config.js
│   └── package.json
├── server/                     # Express backend
│   ├── src/
│   │   ├── config/             # Database connection (Knex)
│   │   ├── middleware/         # Auth, error handler, validation
│   │   ├── models/             # Data access layer
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── routes/             # Route definitions
│   │   ├── validators/         # express-validator schemas
│   │   ├── utils/              # Helpers, AppError
│   │   └── sockets/            # Socket.io event handlers
│   ├── migrations/             # Knex database migrations
│   ├── seeds/                  # Sample data
│   ├── server.js               # Entry point
│   ├── knexfile.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json                # Root (concurrently script)
└── README.md
```

---

## Database Schema

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| **users** | All platform users | id, name, email, password, role, phone, is_active |
| **categories** | Service categories (hierarchical) | id, name, slug, parent_id, sort_order |
| **provider_profiles** | Extended provider info | id, user_id, business_name, rating, is_verified |
| **services** | Individual service listings | id, provider_id, category_id, name, price, duration |
| **bookings** | Customer bookings | id, customer_id, provider_id, service_id, date, time_slot, status |
| **reviews** | Post-booking ratings | id, booking_id, customer_id, provider_id, rating, comment |
| **messages** | Real-time chat | id, sender_id, receiver_id, content, read_at |
| **notifications** | In-app alerts | id, user_id, type, title, message, is_read |

---

## API Overview

| Group | Endpoints | Auth |
|-------|-----------|------|
| **Auth** | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `PUT /api/auth/profile` | Public / JWT |
| **Categories** | `GET /api/categories`, `GET /api/categories/:id` | Public |
| **Providers** | `GET /api/providers`, `GET /api/providers/:id`, `GET /api/providers/:id/reviews` | Public |
| **Services** | `GET /api/services`, `GET /api/services/:id` | Public |
| **Bookings** | `POST /api/bookings`, `GET /api/bookings`, `PATCH /api/bookings/:id/status` | JWT |
| **Reviews** | `POST /api/reviews`, `GET /api/reviews/provider/:id` | JWT |
| **Messages** | `GET /api/messages/:conversationId`, `POST /api/messages` | JWT |
| **Admin** | `GET /api/admin/dashboard`, `GET /api/admin/users`, `POST /api/admin/categories` | Admin |

---

## Design System

The UI is built with a custom design token system — no Tailwind, no Bootstrap, no third-party component library.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-500` | `#0D7377` | Deep teal — primary actions, brand |
| `--color-accent-500` | `#E8614A` | Warm coral — CTAs, highlights |
| `--color-surface` | `#FFFFFF` / `#121218` | App background (light/dark) |
| `--color-text-primary` | `#1A1A2E` / `#F1F3F5` | Body text (light/dark) |

### Typography

- **Font**: Inter (headings) + system font stack (body)
- **Scale**: 0.75rem → 2.5rem across 9 steps
- **Weights**: 400, 500, 600, 700, 800

### Components

7 primitive components with variant support via CVA (Class Variance Authority):

**Button** — `primary`, `secondary`, `ghost`, `accent`, `danger` × `sm`, `md`, `lg`
**Input** — with label, error state, textarea variant
**Card** — `sm`, `md`, `lg` padding, clickable hover effect
**Modal** — `sm`, `md`, `lg` sizes, backdrop blur, escape-to-close
**Badge** — `default`, `primary`, `success`, `warning`, `error`, `info`
**Skeleton** — `text`, `title`, `circle`, `rect` loading placeholders
**Toast** — `success`, `error`, `warning`, `info` with auto-dismiss

---

## Development Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| **1. Foundation** | Monorepo, SQLite, Auth, UI primitives, Layout | ✅ Complete |
| **2. Categories & Providers** | Category CRUD, Provider onboarding, Service CRUD, Browse/Search | ✅ Complete |
| **3. Booking Engine** | Date/time slots, Availability, Status flow, Booking UI | ✅ Complete |
| **4. Reviews & Real-time** | Ratings, Socket.io chat, Notifications | ✅ Complete |
| **5. Admin Panel** | Dashboard, User/Provider management, Category admin | 🔜 Next |
| **6. Polish** | Loading states, Error boundaries, Deployment | ⏳ Planned |

---

## License

This project is built for learning and portfolio purposes.
