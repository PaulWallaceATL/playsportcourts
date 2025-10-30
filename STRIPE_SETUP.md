# Stripe Integration Setup Guide

This guide will help you set up Stripe payments for the Dealer Portal.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

The following Stripe packages are already included:
- `stripe` - Server-side Stripe SDK
- `@stripe/stripe-js` - Client-side Stripe SDK

### 2. Get Your Stripe API Keys

1. **Sign up for Stripe** (if you haven't already):
   - Go to [https://stripe.com](https://stripe.com)
   - Create an account or sign in

2. **Get your test API keys**:
   - Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

### 3. Configure Environment Variables

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your keys**:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   > ⚠️ **Important**: Never commit `.env.local` to version control!

### 4. Set Up Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your app about payment events.

#### For Local Development:

1. **Install Stripe CLI**:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows (with Scoop)
   scoop install stripe
   
   # Or download from: https://github.com/stripe/stripe-cli/releases/latest
   ```

2. **Login to Stripe CLI**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copy the webhook signing secret** displayed in the terminal and add it to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

#### For Production:

1. Go to [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter your production URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** and add it to your production environment variables

### 5. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000/dealer-portal](http://localhost:3000/dealer-portal)

## 🎯 Features

### Dealer Portal Includes:

1. **Authentication System**
   - Login/Signup with email/password
   - Demo credentials: `dealer@gmail.com` / `password123`
   - Secure session management

2. **Dashboard**
   - Key metrics (orders, revenue, avg order value)
   - Quick action cards
   - Recent orders preview

3. **Product Catalog**
   - 6 premium tile products
   - Interactive color selection (6 colors per product)
   - Quantity input (square footage)
   - Real-time price calculation
   - Add to cart functionality

4. **Shopping Cart**
   - View all cart items
   - Update quantities
   - Remove items
   - See subtotal
   - Secure Stripe checkout integration

5. **Order Management**
   - Order history with status tracking
   - Payment status indicators
   - Order details (date, amount, items)

## 💳 Testing Payments

Stripe provides test card numbers for development:

### Successful Payment
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Payment Requires Authentication (3D Secure)
- **Card Number**: `4000 0025 0000 3155`

### Payment Declined
- **Card Number**: `4000 0000 0000 9995`

### More test cards:
[https://stripe.com/docs/testing](https://stripe.com/docs/testing)

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   └── stripe/
│   │       ├── create-checkout-session/
│   │       │   └── route.ts          # Create Stripe checkout session
│   │       ├── payment-intent/
│   │       │   └── route.ts          # Create payment intent
│   │       └── webhook/
│   │           └── route.ts          # Handle Stripe webhooks
│   └── dealer-portal/
│       └── page.tsx                  # Main dealer portal page
├── components/
│   └── dealer/
│       ├── AuthUI.tsx                # Login/Signup UI
│       ├── DashboardMetrics.tsx      # Dashboard metrics cards
│       ├── ProductCatalog.tsx        # Product catalog with add to cart
│       ├── ShoppingCart.tsx          # Shopping cart with checkout
│       └── OrdersTable.tsx           # Order history table
└── lib/
    ├── stripe.ts                     # Server-side Stripe config & utilities
    ├── stripe-client.ts              # Client-side Stripe loader
    └── mock-auth.ts                  # Mock authentication (replace with real auth)
```

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit API keys to version control
   - Use different keys for development and production
   - Rotate keys if they are ever exposed

2. **Webhook Verification**
   - Always verify webhook signatures
   - The webhook endpoint includes signature verification

3. **Amount Validation**
   - Server-side amount calculation prevents tampering
   - Never trust amounts from the client

4. **User Authentication**
   - Replace mock auth with a real authentication system
   - Validate user permissions before processing payments

## 🔄 Payment Flow

```
User adds items to cart
       ↓
User clicks "Proceed to Checkout"
       ↓
App creates Stripe Checkout Session (server-side)
       ↓
User redirects to Stripe hosted checkout page
       ↓
User enters payment details
       ↓
Stripe processes payment
       ↓
User redirects back to app with success/cancel status
       ↓
Webhook notifies app of payment completion
       ↓
App saves order and sends confirmation email
```

## 🛠️ Customization

### Product Catalog

Edit products in `src/lib/stripe.ts`:

```typescript
export const PRODUCT_CATALOG = {
  "your-product-id": {
    id: "your-product-id",
    name: "Product Name",
    description: "Product description",
    pricePerSqFt: 9.99,
    colors: ["Color 1", "Color 2"],
    features: ["Feature 1", "Feature 2"],
    image: "/path/to/image.jpg",
  },
  // Add more products...
};
```

### Styling

The UI uses the premium design system with:
- Deep blacks/graphite backgrounds
- Electric blue accents (`--brand-primary`)
- Orange highlights (`--brand-accent`)
- Glass morphism effects
- Smooth animations

All styles are defined in `src/app/globals.css`

## 🐛 Troubleshooting

### Checkout button not working
- Check browser console for errors
- Verify Stripe publishable key is set in `.env.local`
- Ensure `.env.local` is loaded (restart dev server)

### Webhook not receiving events
- Check Stripe CLI is running and forwarding
- Verify webhook secret in `.env.local`
- Check webhook endpoint URL is correct

### Payment succeeds but order not saved
- Check webhook handler logs
- Verify webhook secret is correct
- Implement database persistence (currently using mock storage)

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🚀 Going to Production

1. **Switch to live mode**:
   - Get your live API keys from Stripe dashboard
   - Update environment variables with live keys
   - Remove test data and mock users

2. **Set up production webhook**:
   - Configure webhook endpoint in Stripe dashboard
   - Use HTTPS URL for your production app

3. **Add database persistence**:
   - Replace mock storage with real database
   - Store orders, customers, and transaction history

4. **Implement real authentication**:
   - Replace mock auth with NextAuth.js, Clerk, or similar
   - Add proper user roles and permissions

5. **Add email notifications**:
   - Send order confirmations
   - Send payment receipts
   - Notify admin of new orders

6. **Monitor and test**:
   - Monitor Stripe dashboard for transactions
   - Set up error tracking (Sentry, etc.)
   - Test all payment flows thoroughly

---

**Need help?** Contact support or refer to the Stripe documentation.

