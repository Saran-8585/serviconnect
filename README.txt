Serviconnect
=============

Connect with trusted local service providers.

Serviconnect is a full-stack web application that bridges the gap between customers and local service professionals. Built with the MERN stack (MongoDB replaced with SQLite), it aims to let users discover, compare, and book verified service providers for home services, repairs, and professional needs.

Whether you need a plumber, an electrician, a home cleaning service, or a tutor -- Serviconnect makes it easy to find the right person for the job, check their availability, and book in seconds.

The Problem
-----------

Finding reliable local service professionals is fragmented and frustrating. Customers juggle multiple platforms, lack transparency on pricing and availability, and have no way to verify quality before booking. Service providers struggle with manual scheduling, missed appointments, and limited visibility to potential customers.

The Solution
------------

Serviconnect unifies the entire service lifecycle on a single platform:
- Customers discover providers by category, view detailed profiles with ratings and reviews, check real-time availability, book appointments, pay securely, and communicate via in-app chat.
- Providers manage their business presence, list services with pricing, control their schedule, receive booking requests, and build their reputation through customer reviews.
- Admins oversee the ecosystem -- approve providers, manage categories, resolve disputes, and monitor platform analytics.

Key Differentiators
-------------------
- Role-based access: Three distinct user roles (Customer, Provider, Admin) with tailored dashboards and permissions.
- Dark mode: Full theme support with system preference detection and persistent user choice.
- Relational integrity: SQLite with foreign keys and transactions guarantees no double-bookings and consistent data.
- Zero setup: No Docker, no cloud database, no environment variables to configure beyond a single .env file.

Tech Stack
----------
Frontend:   React 18.3, Vite 6, CSS Modules, React Router v6.28
Backend:    Node.js, Express 4.21
Database:   SQLite via better-sqlite3 v11.7 + Knex.js v3.1
Auth:       JWT (JSON Web Tokens) + bcryptjs
Real-time:  Socket.io v4.8 (planned for chat)
Validation: express-validator v7.2 (server), custom hooks (client)

Why SQLite instead of MongoDB?
- Zero configuration -- No separate database server to install or manage. SQLite is a single file.
- ACID compliance -- Booking operations use native SQLite transactions, guaranteeing no double-bookings.
- Relational integrity -- Foreign keys, unique constraints, and JOINs provide data consistency.
- Portfolio simplicity -- Anyone can clone the repo and run it immediately without setting up Atlas.

Architecture
------------
The application follows a modular monolith pattern -- a single Express server with clear separation between routes, controllers, services, and data access layers. The frontend is a decoupled React SPA that communicates with the backend via REST APIs.

  +-------------+     +-------------------+     +----------+
  |  React SPA  |---->|  Express REST API |---->|  SQLite  |
  |  (Vite)     |<----|  + Socket.io      |<----|  (Knex)  |
  +-------------+     +-------------------+     +----------+
         |                       |
         |                       |
    CSS Modules            JWT Auth
    Design Tokens          Validators

Features
--------

Current:
- User authentication: Register, login, JWT-based session management
- Profile management: Update name, phone, avatar
- Role-based access: Customer, provider, and admin roles (with protected routes)
- Dark mode: Full theme support with system preference detection and manual toggle
- Responsive design: Mobile-first layout across all pages
- UI component library: 7 reusable primitives (Button, Input, Card, Modal, Badge, Skeleton, Toast) with variant system
- Landing page: Hero section, category grid, how-it-works flow

In Development:
- Category browsing: Browse services by category with search and filters
- Provider onboarding: Business profiles, service listings, verification
- Booking engine: Date/time selection, availability management, status flow
- Real-time chat: Socket.io messaging between customers and providers
- Reviews & ratings: Post-booking feedback system

Planned:
- Admin dashboard: Platform management, analytics, user oversight
- Payment integration: Online payment processing
- Deployment: Production configuration and hosting

User Roles
----------

Customer:
Browse services, search by category/location, view provider profiles, book appointments, manage bookings, rate and review, chat with providers.

Service Provider:
Create and manage business profile, list services with pricing, set availability calendar, accept/reject bookings, communicate with customers, view earnings and reviews.

Admin:
Dashboard with platform analytics, manage users and providers, create and manage categories, oversee bookings, handle disputes.

Getting Started
---------------

Prerequisites:
- Node.js v18 or later
- npm v9 or later

Installation:

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

Running the Application:

  # Start both server and client together
  npm run dev

Or start them separately (two terminals):

  # Terminal 1 -- Backend
  cd server
  npm run dev

  # Terminal 2 -- Frontend
  cd client
  npm run dev

Service URLs:
  Frontend:      http://localhost:5173
  Backend API:   http://localhost:5001
  Health Check:  http://localhost:5001/api/health

Seed Data
---------

The project includes 8 seed files with sample data for development and testing. Run them after migrations:

  cd server && npm run seed

Test Accounts (all use password "password123"):

  Role       Name            Email
  Admin      Admin User      admin@serviconnect.com
  Provider   Ravi Sharma     ravi@example.com
  Provider   Amit Singh      amit@example.com
  Provider   Vikram Joshi    vikram@example.com
  Provider   Ananya Gupta    ananya@example.com
  Provider   Rajesh Kumar    rajesh@example.com
  Provider   Meera Iyer      meera@example.com
  Customer   Priya Patel     priya@example.com
  Customer   Sneha Reddy     sneha@example.com

Sample Data Summary:

  Table               Records  Details
  users               9        1 admin, 6 providers, 2 customers
  categories          6        Plumbing, Electrical, Cleaning, Painting, Carpentry, Appliance Repair
  provider_profiles   6        Ravi (Plumbing), Amit (Electrical), Vikram (Cleaning), Ananya (Painting), Rajesh (Carpentry), Meera (Appliance Repair)
  services            15       3 per category across all 6 categories
  bookings            13       7 completed, 2 confirmed, 3 pending, 1 cancelled
  reviews             7        Ratings across 5 different providers
  messages            10       Conversations for 3 different bookings
  notifications       10       Booking alerts and review notifications for all users

Re-running Seeds:
  cd server && npm run seed

Project Structure
-----------------

  serviconnect/
  +-- client/                     # React frontend
  |   +-- public/
  |   +-- src/
  |   |   +-- components/
  |   |   |   +-- ui/             # Primitive components (Button, Input, Card, etc.)
  |   |   |   +-- layout/         # Navbar, Footer, ProtectedRoute
  |   |   |   +-- admin/          # (scaffolded, empty)
  |   |   |   +-- customer/       # (scaffolded, empty)
  |   |   |   +-- provider/       # (scaffolded, empty)
  |   |   +-- pages/
  |   |   |   +-- auth/           # Login, Register
  |   |   |   +-- customer/       # (not yet created)
  |   |   |   +-- provider/       # (not yet created)
  |   |   |   +-- admin/          # (not yet created)
  |   |   +-- context/            # AuthContext, ThemeContext
  |   |   +-- hooks/              # (empty, ready for custom hooks)
  |   |   +-- lib/                # Axios instance, CVA utility
  |   |   +-- styles/             # Design tokens, global CSS, reset, animations
  |   |   +-- utils/              # (empty, ready for formatters/validators)
  |   +-- vite.config.js
  |   +-- package.json
  +-- server/                     # Express backend
  |   +-- src/
  |   |   +-- config/             # Database connection (Knex)
  |   |   +-- middleware/         # Auth, error handler, validation
  |   |   +-- models/             # Data access layer
  |   |   +-- controllers/        # Request handlers
  |   |   +-- services/           # Business logic (empty, ready)
  |   |   +-- routes/             # Route definitions
  |   |   +-- validators/         # express-validator schemas
  |   |   +-- utils/              # Helpers, AppError
  |   |   +-- sockets/            # Socket.io event handlers (empty, ready)
  |   +-- migrations/             # Knex database migrations (8 files)
  |   +-- seeds/                  # Sample data (8 files)
  |   +-- server.js               # Entry point
  |   +-- knexfile.js
  |   +-- package.json
  +-- .env.example
  +-- .gitignore
  +-- package.json                # Root (concurrently script)
  +-- README.md

Database Schema
---------------

  Table               Purpose                                Key Columns
  users               All platform users                     id, name, email, password, role, phone, is_active
  categories          Service categories (hierarchical)      id, name, slug, parent_id, sort_order
  provider_profiles   Extended provider info                 id, user_id, business_name, rating, is_verified
  services            Individual service listings            id, provider_id, category_id, name, price, duration
  bookings            Customer bookings                      id, customer_id, provider_id, service_id, date, time_slot, status
  reviews             Post-booking ratings                   id, booking_id, customer_id, provider_id, rating, comment
  messages            Real-time chat                         id, sender_id, receiver_id, content, read_at
  notifications       In-app alerts                          id, user_id, type, title, message, is_read

API Overview
------------

  Group       Endpoints                                                          Auth          Status
  Auth        POST /api/auth/register, POST /api/auth/login,                     Public / JWT  Done
              GET /api/auth/me, PUT /api/auth/profile
  Categories  GET /api/categories, GET /api/categories/:id                       Public        Pending
  Providers   GET /api/providers, GET /api/providers/:id,                        Public        Pending
              GET /api/providers/:id/reviews
  Services    GET /api/services, GET /api/services/:id                           Public        Pending
  Bookings    POST /api/bookings, GET /api/bookings,                             JWT           Pending
              PATCH /api/bookings/:id/status
  Reviews     POST /api/reviews, GET /api/reviews/provider/:id                   JWT           Pending
  Messages    GET /api/messages/:conversationId, POST /api/messages              JWT           Pending
  Admin       GET /api/admin/dashboard, GET /api/admin/users,                    Admin         Pending
              POST /api/admin/categories

Design System
-------------

The UI is built with a custom design token system -- no Tailwind, no Bootstrap, no third-party component library.

Color Palette:

  Token                     Value               Usage
  --color-primary-500       #0D7377             Deep teal -- primary actions, brand
  --color-accent-500        #E8614A             Warm coral -- CTAs, highlights
  --color-surface           #FFFFFF / #121218    App background (light/dark)
  --color-text-primary      #1A1A2E / #F1F3F5   Body text (light/dark)

Typography:
  Font:  Inter (headings) + system font stack (body)
  Scale: 0.75rem to 2.5rem across 9 steps
  Weights: 400, 500, 600, 700, 800

Components:
  7 primitive components with variant support via CVA (Class Variance Authority):

  Button    -- primary, secondary, ghost, accent, danger x sm, md, lg
  Input     -- with label, error state, textarea variant
  Card      -- sm, md, lg padding, clickable hover effect
  Modal     -- sm, md, lg sizes, backdrop blur, escape-to-close
  Badge     -- default, primary, success, warning, error, info
  Skeleton  -- text, title, circle, rect loading placeholders
  Toast     -- success, error, warning, info with auto-dismiss

Development Roadmap
-------------------

  Phase  Focus                                             Status
  1      Foundation: Monorepo, SQLite, Auth, UI, Layout    Done
  2      Categories & Providers                            In progress
  3      Booking Engine                                    In progress
  4      Reviews & Real-time                               In progress
  5      Admin Panel                                       Planned
  6      Polish: Loading states, Error boundaries, Deploy  Planned

License
-------
This project is built for learning and portfolio purposes.
