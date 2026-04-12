# 📚 Library Management System

A modern, full-featured library management system built with React, TypeScript, and Chakra UI. This application provides a comprehensive platform for managing books, orders, and user accounts with an intuitive interface and robust functionality.

## ✨ Features

### 👥 User Roles

- **Customer Role**
  - Browse and search books by category, year, and price range
  - View detailed book information
  - Add books to cart and saved list
  - Place orders with integrated Stripe payment
  - View order history
  - Manage profile and change password

- **Admin Role**
  - Add and modify books
  - View pending orders from publishers
  - Generate sales reports (daily/monthly)
  - View top-selling books and customers
  - Manage book inventory

### 🔑 Key Functionality

- **Authentication**: Secure login/signup with JWT token support and Google OAuth integration
- **Book Management**: Full CRUD operations for books with image upload
- **Shopping Cart**: Add/remove items, modify quantities, real-time total calculation
- **Payment Integration**: Stripe checkout for secure payments
- **Search & Filters**: Advanced filtering by category, year range, and price
- **Responsive Design**: Fully responsive UI that works on all devices
- **Dark Mode**: Built-in dark mode support

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **UI Library**: Chakra UI for modern, accessible components
- **State Management**: TanStack React Query for server state
- **Routing**: React Router DOM v7
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Payment**: Stripe
- **Build Tool**: Vite (Rolldown)
- **Styling**: Emotion (CSS-in-JS)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/alyadel-moh/library-managment-system.git
cd library-managment-system
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:

```env
VITE_API_BASE_URL=your_backend_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
library-managment-system/
├── src/
│   ├── api-client.ts          # Axios configuration
│   ├── components/            # Reusable UI components
│   │   ├── Bookcard.tsx       # Book display card
│   │   ├── navBar.tsx         # Navigation bar
│   │   ├── Sidebar.tsx        # User sidebar
│   │   ├── viewCart.tsx       # Shopping cart
│   │   └── ...
│   ├── entities/              # TypeScript interfaces
│   │   ├── Book.ts
│   │   ├── User.ts
│   │   └── ...
│   ├── hooks/                 # Custom React hooks
│   │   ├── useGetbooks.ts     # Fetch books
│   │   ├── useAddbook.ts      # Add book
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── Homepage.tsx       # Main page
│   │   ├── Adminpage.tsx      # Admin dashboard
│   │   └── ...
│   ├── routing/               # Route configuration
│   └── theme.ts               # Chakra UI theme
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔐 API Integration

This frontend application communicates with a backend API. Ensure your backend server is running and properly configured. The API client is set up in `src/api-client.ts` with JWT token handling.

## 🎨 Customization

### Theme

Modify `src/theme.ts` to customize colors, fonts, and other design tokens.

### Components

All components are built with Chakra UI and can be easily customized through props or by modifying the component files in `src/components/`.

## 📱 Responsive Design

The application is fully responsive with breakpoints optimized for:

- Desktop (> 1024px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**alyadel-moh**

- GitHub: [@alyadel-moh](https://github.com/alyadel-moh)

## 🙏 Acknowledgments

- Chakra UI for the amazing component library
- TanStack Query for powerful data fetching
- Stripe for payment processing
- All contributors and users of this project
