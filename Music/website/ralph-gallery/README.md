# Ralph Gallery

A modern photography portfolio website with an admin dashboard for content management.

## Overview

Ralph Gallery is a professional photography portfolio website built with Next.js, featuring a sleek user interface for showcasing photography work and a secure admin dashboard for content management.

## Features

- 🖼️ Dynamic photo gallery with categories
- 🎨 Modern, minimalist design
- 📱 Fully responsive layout
- ⚡ Fast page loads with Next.js
- 🔒 Secure admin dashboard
- 📝 Content management system
- 🌓 Custom animations and transitions
- 🔍 SEO optimized

## Tech Stack

### Frontend

- **Next.js** - React framework for production
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Heroicons** - Beautiful hand-crafted SVG icons

### Backend & Database

- **MongoDB** - NoSQL database
- **Firebase** - Authentication and storage
- **Next.js API Routes** - Backend API

### Authentication

- **Firebase Auth** - Secure authentication system

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package management

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm or yarn
- MongoDB database
- Firebase project

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-repo/ralph-gallery.git
```

2. Install dependencies

```bash
cd ralph-gallery
npm install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
MONGODB_URI=your_mongodb_uri
```

4. Run the development server

```bash
npm run dev
```

## Project Structure

```bash
/
├── components/
│   ├── admin/
│   ├── gallery/
│   ├── layout/
│   ├── ui/
├── pages/
├── public/
├── styles/
├── types/
├── utils/
```

## Contributing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Heroicons](https://heroicons.com/)
