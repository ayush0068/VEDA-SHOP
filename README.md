# Veda Structure — Premium Gemstone E-Commerce & Vedic Astrology Platform

A luxury, full-stack e-commerce and Vedic astrology platform dedicated to **100% Certified Natural Gemstones (Navratna)**, bespoke astrological jewellery crafting, interactive horoscope gemstone recommendation engine, and floating Gemini AI product discovery assistant.

---

## 💎 Features Included

1. **Luxury Indian Aesthetic**: Warm ivory, deep maroon, champagne gold, and emerald accents with responsive typography and micro-interactions.
2. **Interactive Navratna Showcase**: 9 sacred Vedic gemstones (Ruby, Emerald, Yellow Sapphire, Blue Sapphire, Pearl, Red Coral, Hessonite, Cat's Eye, Diamond) with Sanskrit names, ruling planets, beeja mantras, wearing rules, and starting prices.
3. **20 Gemstone Catalog**: Detailed listings for Ruby, Emerald, Blue Sapphire, Yellow Sapphire, Pearl, Red Coral, Hessonite, Cat's Eye, Diamond, Opal, Amethyst, Citrine, Garnet, Turquoise, Peridot, Aquamarine, Tanzanite, Tourmaline, Moonstone, and Iolite.
4. **5-Step Vedic Recommendation Engine**: Interactive multi-step form calculating personalized primary & secondary gemstones, rashi, nakshatra, recommended carat formula (`Body Weight / 12`), wearing metal, wearing finger, wearing day, and traditional mantras with clear Vedic disclaimer.
5. **Floating Gemini AI Gemstone Assistant**: Conversational AI assistant widget providing real-time gemstone knowledge, answering user inquiries, and displaying matching catalog product cards.
6. **Bespoke Custom Jewellery Builder**: 4-step visual flow (Idea → Gemstone → Design → Order) with metal selection (18K/14K Gold, Silver, Panchdhatu), ring size, notes, image reference, and consultation request.
7. **Advanced Product Filter Grid**: Filter by Gemstone Type, Origin (Ceylon, Zambia, Basra, Italy), Carat, Treatment, Certification, and Price sorting.
8. **Admin Control Dashboard**: Analytics metrics (Revenue, Orders, Customers, Low-Stock items), product management, order status update workflow (Pending, Confirmed, Shipped, Delivered), and review moderation.
9. **SEO Knowledge Hub & Verified Reviews**: Article cards and verified devotee review testimonials.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **State & Context**: Cart Context, Wishlist Context, Recently Viewed Context
- **Services & AI**: Modular `AstrologyService`, Google Gemini API integration structure
- **Database & ORM**: PostgreSQL, Prisma ORM (`prisma/schema.prisma`)
- **Payments**: Razorpay Payment Gateway integration structure

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
Ensure you have **Node.js 18+** and **npm** installed on your system.

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your database URL, Razorpay key, and Gemini API key in `.env`.

### 4. Database Setup (Prisma)
```bash
# Generate Prisma Client
npx prisma generate

# Run Database Migrations
npx prisma db push
```

### 5. Run Local Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 REST API Architecture

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/gemstones` | Fetch all certified gemstone products |
| `GET` | `/api/gemstones/:slug` | Get single gemstone details with certificates |
| `POST` | `/api/astrology/recommend` | Generate Vedic gemstone recommendation report |
| `POST` | `/api/custom-jewellery` | Submit custom ring/pendant quote request |
| `POST` | `/api/ai/chat` | Query Gemini AI Gemstone Assistant |
| `POST` | `/api/payments/razorpay/order` | Create Razorpay order ID |
| `POST` | `/api/payments/razorpay/verify` | Verify Razorpay payment signature |
| `GET` | `/api/admin/analytics` | Get revenue & inventory metrics |
| `PATCH` | `/api/admin/orders/:id` | Update order status (Shipped, Delivered) |

---

## 📦 Production Deployment Instructions

### Deploying Frontend on Vercel / Netlify
1. Connect your Git repository to Vercel or Netlify.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Set Environment Variables in deployment panel (`NEXT_PUBLIC_APP_URL`, `GEMINI_API_KEY`, etc.).

### Deploying Backend on Render / Railway
1. Set up a PostgreSQL instance on Railway / Render.
2. Run `npx prisma db push` during build phase.
3. Deploy Node.js Express/Next server with environment variables.

---

## 📜 License & Disclaimers

- All demo products and lab certificates are provided for presentation.
- Vedic gemstone recommendations are based on traditional astrology principles and are not presented as scientifically or medically proven.
