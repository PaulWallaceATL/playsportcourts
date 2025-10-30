# 🔐 Test Credentials

## Overview

This document contains all test user credentials for the PlaySport Courts platform. These accounts are pre-configured for testing the dealer portal and admin dashboard.

---

## 👤 Test Users

### Admin Accounts

#### Admin #1 (Original)
```
Email: admin@gmail.com
Password: password123
Role: Admin
Access: Full admin dashboard access
```

**Permissions:**
- View all orders from all dealers
- Manage products (add, edit, delete)
- Manage users and dealers
- Update order status
- Update payment status
- View analytics and statistics

---

#### Admin #2 (New)
```
Email: admin2@playsport.com
Password: admin2024!
Role: Admin
Access: Full admin dashboard access
```

**Permissions:**
- Same as Admin #1
- Fresh account for testing admin workflows
- Ideal for testing multi-admin scenarios

---

### Dealer Accounts

#### Dealer #1 (Original)
```
Email: dealer@gmail.com
Password: password123
Role: Dealer
Access: Dealer portal only
```

**Features:**
- Browse product catalog
- Add items to shopping cart
- Checkout via Stripe
- View order history
- Track order status

**Mock Order History:**
- 5 previous orders
- Total spent: $15,678.45
- Account created: 30 days ago

---

#### Dealer #2 (New Test Account)
```
Email: dealer-test@playsport.com
Password: dealer2024!
Role: Dealer
Access: Dealer portal only
```

**Features:**
- Fresh account for testing
- No order history (clean slate)
- Perfect for testing new user experience
- Can test full checkout flow

---

## 🧪 Testing Scenarios

### Scenario 1: Admin Management
1. Login as **admin2@playsport.com**
2. Navigate to Admin Dashboard (`/admin`)
3. Test product management (add/edit/delete products)
4. Test user management (change roles, suspend accounts)
5. Test order management (update statuses)

### Scenario 2: New Dealer Experience
1. Login as **dealer-test@playsport.com**
2. Navigate to Dealer Portal (`/dealer-portal`)
3. Browse product catalog
4. Add items to cart
5. Complete checkout with Stripe test card
6. View order in order history

### Scenario 3: Multi-User Testing
1. Login as **dealer-test@playsport.com** and place an order
2. Logout
3. Login as **admin2@playsport.com**
4. View the new order in admin dashboard
5. Update order status to "Processing"
6. Update payment status to "Paid"

### Scenario 4: Existing Dealer Flow
1. Login as **dealer@gmail.com**
2. View existing order history
3. Place a new order
4. Compare with previous orders

---

## 💳 Stripe Test Cards

Use these test cards for payment testing:

### Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### 3D Secure Authentication
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Payment Declined
```
Card Number: 4000 0000 0000 9995
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Insufficient Funds
```
Card Number: 4000 0000 0000 9995
```

More test cards: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## 🚀 Quick Start Testing

### Test Admin Dashboard
```bash
1. Go to http://localhost:3000/admin
2. Login with: admin2@playsport.com / admin2024!
3. Explore all 4 tabs (Dashboard, Products, Users, Orders)
```

### Test Dealer Portal
```bash
1. Go to http://localhost:3000/dealer-portal
2. Login with: dealer-test@playsport.com / dealer2024!
3. Browse catalog → Add to cart → Checkout
```

### Test User Management
```bash
1. Login as admin2@playsport.com
2. Go to Users & Dealers tab
3. Find dealer-test@playsport.com
4. Change role to Admin (test role change)
5. Change back to Dealer
6. Test suspend/activate toggle
```

### Test Order Flow
```bash
1. Login as dealer-test@playsport.com
2. Add Game Tile (200 sq ft, Royal Blue) to cart
3. Add Pro Tile (150 sq ft, Platinum) to cart
4. Proceed to checkout
5. Use test card: 4242 4242 4242 4242
6. Complete payment
7. Logout
8. Login as admin2@playsport.com
9. Go to Orders tab
10. Find the new order
11. Update status to "Processing"
12. View order details
```

---

## 🔧 Account Management

### Creating New Test Users

Users are automatically created when you sign up through the UI:

**For Dealers:**
1. Go to `/dealer-portal`
2. Click "Sign Up" tab
3. Enter email and password
4. New dealer account is created

**For Admins:**
You need to manually add admin accounts in `src/lib/mock-auth.ts`:

```typescript
{ email: "newadmin@example.com", password: "password", role: "admin" }
```

### Resetting Test Data

To reset all test data (orders, users):
1. Clear browser localStorage
2. Refresh the page
3. Seed users will be restored

```javascript
// In browser console:
localStorage.clear();
location.reload();
```

---

## 📊 Pre-configured Mock Data

### Users
- **2 Admins**: admin@gmail.com, admin2@playsport.com
- **2 Dealers**: dealer@gmail.com, dealer-test@playsport.com

### Products
- **6 Products**: Game Tile, Speed Outdoor, Compete Tile, Active Tile, Boost Tile, Pro Tile
- **Price Range**: $7.99 - $14.99 per sq ft
- **Total Colors**: 36 (6 per product)

### Orders (Mock)
- **5 Sample Orders** assigned to dealer@gmail.com
- **Status Mix**: Pending, Processing, Completed
- **Payment Mix**: Paid, Pending
- **Total Revenue**: $33,425.89

---

## 🔐 Security Notes

### Current Implementation (Development)

⚠️ **Mock Authentication**
- Uses localStorage for session management
- Passwords are NOT encrypted (plain text)
- No password reset functionality
- No email verification

⚠️ **Not Production Ready**
- Replace with NextAuth.js or Clerk before production
- Implement proper password hashing (bcrypt)
- Add email verification
- Add two-factor authentication

### Production Requirements

✅ **Required for Production:**
1. Real authentication provider (NextAuth.js/Clerk)
2. Database for user storage
3. Encrypted passwords (bcrypt/argon2)
4. Email verification
5. Password reset flow
6. Session management (JWT/cookies)
7. Rate limiting
8. CSRF protection

---

## 📝 Notes

### Password Guidelines

Test passwords are intentionally simple for development:
- Original accounts: `password123`
- New accounts: `admin2024!` or `dealer2024!`

**Production passwords should:**
- Be at least 12 characters
- Include uppercase, lowercase, numbers, symbols
- Not be dictionary words
- Be unique per account

### Account Types

**Admin Accounts:**
- Access to admin dashboard only
- Cannot place orders
- Can view all dealer orders
- Can manage all products and users

**Dealer Accounts:**
- Access to dealer portal only
- Can browse catalog and place orders
- Can view own order history
- Cannot access admin features

---

## 🆘 Troubleshooting

### Can't Login

**Issue**: Invalid credentials error

**Solutions:**
1. Double-check email and password (case-sensitive)
2. Clear browser cache and cookies
3. Check localStorage is enabled
4. Try incognito/private browsing mode

### Account Locked Out

**Issue**: Can't access after multiple failed attempts

**Solution**: 
Currently no lockout mechanism. If you're having issues:
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Try again

### Lost Access to Admin

**Issue**: Accidentally changed admin role to dealer

**Solution**:
Edit `src/lib/mock-auth.ts` and ensure admin accounts are in SEED_USERS with `role: "admin"`, then refresh.

### Order Not Showing

**Issue**: Placed order doesn't appear in admin dashboard

**Solution**:
Orders are currently stored in localStorage. Ensure you're logged in and check browser console for errors.

---

## 📞 Support

For development questions:
- Check documentation in project root
- Review `STRIPE_SETUP.md` for payment issues
- Review `DEALER_PORTAL_README.md` for dealer features
- Review `ADMIN_DASHBOARD_README.md` for admin features

---

**Last Updated**: October 30, 2025
**Version**: 1.0.0
**Environment**: Development (Mock Auth)

