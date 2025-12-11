# Upepo Soul - Spiritual Wellness Platform

A comprehensive spiritual wellness platform built with Next.js 16, featuring Soul Notes, guided practices, soul sessions, community forums, and e-commerce capabilities.

## 🌟 Features

- **Authentication**: Secure user registration and login with NextAuth.js
- **Soul Notes**: Daily reflections and spiritual insights with commenting
- **Guided Practices**: Audio/video meditation, breathwork, and visualization practices
- **Soul Sessions**: Bookable one-on-one and group spiritual guidance sessions
- **Community Forum**: Connect with other seekers through discussions
- **E-commerce**: Purchase premium practices and book paid sessions with Stripe
- **Admin Dashboard**: Full CRUD management for all content
- **File Uploads**: Support for images, audio, and video via UploadThing
- **Email Notifications**: Welcome emails and booking confirmations via Resend
- **Calendar View**: Interactive calendar for browsing and booking sessions

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom sacred color palette
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Authentication**: NextAuth.js v5 with JWT
- **Payments**: Stripe with webhook integration
- **File Upload**: UploadThing
- **Email**: Resend
- **Media Player**: react-player
- **Calendar**: react-big-calendar
- **UI Components**: Radix UI, Lucide React, Framer Motion

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- A code editor (VS Code recommended)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Upepo-Soul
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env` file and fill in your API keys:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3001"

# UploadThing
UPLOADTHING_SECRET="your_uploadthing_secret_here"
UPLOADTHING_APP_ID="your_uploadthing_app_id_here"

# Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key_here"
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key_here"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_here"

# Resend Email
RESEND_API_KEY="your_resend_api_key_here"
```

### 4. Set up the database

```bash
# Push the schema to your database
npm run db:push

# (Optional) Seed the database with sample data
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) to see your application.

## 🔑 Getting API Keys

### UploadThing (File Uploads)
1. Go to [uploadthing.com](https://uploadthing.com)
2. Sign up and create a new app
3. Copy your `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`

### Stripe (Payments)
1. Go to [stripe.com](https://stripe.com)
2. Sign up and get your API keys from the Dashboard
3. Set up a webhook endpoint pointing to `/api/webhooks/stripe`
4. Copy your `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET`

### Resend (Email)
1. Go to [resend.com](https://resend.com)
2. Sign up and verify your domain (or use their test domain)
3. Generate an API key
4. Copy your `RESEND_API_KEY`

## 👤 Admin Access

To create an admin user:

1. Register a new account through the UI
2. Open your database (using Prisma Studio or a DB client)
3. Update the user's role from `USER` to `ADMIN`

```bash
# Open Prisma Studio
npx prisma studio
```

Then navigate to the `User` table and change the `role` field to `ADMIN`.

Access the admin dashboard at `/admin`.

## 📁 Project Structure

```text
Upepo-Soul/
├── app/
│   ├── admin/              # Admin dashboard and CRUD pages
│   ├── api/                # API routes
│   ├── auth/               # Authentication pages
│   ├── checkout/           # Payment success/cancel pages
│   ├── community/          # Forum pages
│   ├── guided-practices/   # Practice listing and detail pages
│   ├── profile/            # User profile and dashboard
│   ├── soul-notes/         # Soul notes listing and detail pages
│   ├── soul-sessions/      # Session listing and calendar
│   └── page.tsx            # Homepage
├── components/
│   └── soul/               # Reusable components
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── email.ts            # Email templates
│   ├── prisma.ts           # Prisma client
│   ├── stripe.ts           # Stripe configuration
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
└── public/                 # Static assets
```

## 🎨 Sacred Color Palette

The platform uses a custom sacred color palette:

- **Gold**: #D9B24C - Wisdom, illumination
- **Orchid**: #B78CE2 - Spiritual connection
- **Lotus**: #E7C1CC - Purity, awakening
- **Sand**: #E8DCC5 - Grounding, stability
- **Moonlit**: #F7F7FB - Clarity, space

Colors are defined in `app/globals.css` using CSS variables.

## 🗄️ Database Schema

The platform includes the following main models:

- **User**: Authentication and profile data
- **SoulNote**: Blog posts and reflections
- **Practice**: Guided meditation/breathwork/visualization
- **SoulSession**: Bookable guidance sessions
- **Booking**: Session reservations
- **Purchase**: E-commerce transactions
- **Comment**: User comments on content
- **ForumPost** & **Reply**: Community discussions
- **Newsletter**: Email subscribers

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy!

### Database

For production, switch from SQLite to PostgreSQL:

1. Set up a PostgreSQL database (Neon, Supabase, Railway, etc.)
2. Update `DATABASE_URL` in your environment
3. Run `npm run db:push` to create tables

### Stripe Webhooks

After deployment, update your Stripe webhook endpoint URL to:
```text
https://your-domain.com/api/webhooks/stripe
```

## 📧 Email Configuration

Update the `from` address in `lib/email.ts` to use your verified domain:

```typescript
from: 'Upepo Soul <noreply@your-domain.com>'
```

## 🔒 Security Notes

- Never commit your `.env` file
- Use strong secrets for `NEXTAUTH_SECRET`
- Verify Stripe webhook signatures
- Implement rate limiting for API routes in production
- Enable CORS protection

## 🤝 Contributing

This is a private project, but contributions are welcome! Please open an issue first to discuss any changes.

## 📄 License

Private - All rights reserved.

## 💬 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for spiritual seekers and soul explorers**

Upepo Soul's design embodies:

- **Calm & Soothing**: Soft color palettes inspired by nature
- **Intentional**: Thoughtful animations and transitions
- **Accessible**: Mobile-first, responsive design
- **Healing**: Warm, welcoming, and safe space

### Color Palette

- **Breeze** (Teal): Grounding, clarity, breath
- **Calm** (Purple): Spiritual connection, intuition
- **Soul** (Blue): Peace, stillness, depth
- **Sand** (Beige): Warmth, earth, foundation

---

**Made with 💜 for your soul journey**

*"Breathe. Return to your center. Remember who you are becoming."*

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
