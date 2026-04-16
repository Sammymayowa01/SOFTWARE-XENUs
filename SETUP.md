# Software Xenus - Professional Site Setup Guide

## ✅ Completed Features

### Backend (Node.js/Express)
- ✅ MongoDB Atlas connection with error handling
- ✅ REST API with CORS support
- ✅ Contact form submissions with validation
- ✅ Payment integration (Paystack)
- ✅ Chatbot endpoint
- ✅ Plan/Pricing data management
- ✅ Proper error handling middleware
- ✅ Environment variables configuration

### Frontend (Next.js/React)
- ✅ Fully functional contact form with validation and feedback
- ✅ Payment flow with Paystack integration
- ✅ Newsletter subscription endpoint
- ✅ Chatbot UI with form collection
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Professional error handling and loading states
- ✅ Success/error message display
- ✅ 404 error page
- ✅ SEO metadata and social media tags
- ✅ robots.txt and sitemap.xml

## 🚀 Running Both Services Concurrently

From the project root:
```bash
cd "c:\Users\ADMIN\Desktop\Company site"
npm run dev
```

This runs:
- **Backend**: `http://localhost:5000` (API at `http://localhost:5000/api`)
- **Frontend**: `http://localhost:3000`

## 📋 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api` | GET | API health check & endpoints list |
| `/api/plans` | GET/POST | Fetch/create pricing plans |
| `/api/contact` | POST | Submit contact form |
| `/api/payment/initiate` | POST | Initiate Paystack payment |
| `/api/payment/verify` | GET | Verify payment status |
| `/api/chatbot` | POST | Handle chatbot messages |

## 🔧 Environment Variables

### Backend (.env in `/backend/src/`)
```
PORT=5000
MONGODB_URI=<your_mongodb_atlas_uri>
PAYSTACK_SECRET_KEY=<your_paystack_test_key>
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env.local in frontend root)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📝 Form Features

### Contact Form
- Email validation
- Required field validation  
- Success/error messages
- Auto-clear on success
- Server-side validation

### Payment Form
- Email validation
- Plan selection
- Loading state during payment
- Paystack integration
- Transaction tracking

### Chatbot Form
- Multi-step form collection (name → email → message)
- Backend storage of chat history
- Quick option selection
- Form validation

## 🎯 Professional Enhancements Made

1. **Error Handling** — All API calls wrapped with try-catch, proper error messages
2. **Loading States** — Buttons disabled during operations, loading indicators
3. **Validation** — Client and server-side validation for all forms
4. **Feedback** — Success/error notifications with icons
5. **Accessibility** — Form labels, ARIA attributes, keyboard navigation
6. **SEO** — Meta tags, Open Graph, Twitter cards, robots.txt, sitemap
7. **404 Handling** — Custom error page with navigation links
8. **Responsive Design** — Mobile-first approach with Tailwind CSS

## 🧪 Testing the Site

1. **Contact Form**: Fill out and submit at `#contact` section
2. **Pricing/Payment**: Click "Proceed to Payment" on pricing cards
3. **Chatbot**: Click icon bottom-right, select "Contact Human Support"
4. **Newsletter**: Enter email in footer newsletter section
5. **API Health**: Visit `http://localhost:5000/api`

## 📚 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Paystack API
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Deployment Ready**: Structured for easy deployment to Vercel (frontend) and Railway/Heroku (backend)

## ⚠️ Important Notes

- Replace Paystack test key with live key for production
- Update MongoDB URI to production instance for live environment
- Configure proper CORS origins for production domains
- Set up proper email service for contact/newsletter (currently logs to console and DB)
- Replace placeholder email addresses with actual business emails

## 🔐 Security Considerations

- ✅ CORS properly configured
- ✅ Helmet.js for HTTP headers
- ✅ Input validation on server-side
- ✅ Sensitive keys in environment variables
- ⚠️ TODO: Add rate limiting for API endpoints
- ⚠️ TODO: Add authentication for admin endpoints
- ⚠️ TODO: Add CSRF protection

## 📞 Support Channels

1. Contact Form - Backend saves to MongoDB
2. Chatbot - Stores conversation history in ChatMessage collection
3. Email - info@softwarexenus.com
4. Phone - 08139214035
5. Location - Ikeja, Lagos
