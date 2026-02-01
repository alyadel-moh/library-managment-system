# Stripe Payment Integration Guide

## Setup Instructions

### 1. Install Dependencies
Once npm access is restored, run:
```bash
npm install @stripe/react-stripe-js @stripe/js
```

### 2. Get Your Stripe Publishable Key
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your Publishable Key (starts with `pk_test_` or `pk_live_`)

### 3. Create Environment File
1. Copy `.env.local.example` to `.env.local`
2. Replace `pk_test_YOUR_KEY_HERE` with your actual Stripe Publishable Key:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

## How It Works

### Component Flow:
1. **ViewCart** - Shows cart items
2. User clicks "Checkout" → Calls `useInitiatePayment` hook
3. Backend creates Stripe PaymentIntent and returns:
   - `clientSecret` - Used to confirm payment
   - `paymentIntentId` - Unique payment identifier
   - Cart details and user info
4. **StripeProvider** - Wraps Checkoutform with Stripe Elements
5. **Checkoutform** - Uses Stripe CardElement for secure card input
6. User enters card details and clicks "Pay Now"
7. `stripe.confirmCardPayment()` confirms the payment using clientSecret
8. Success/Error toast displayed to user

## Key Files

- **[src/utils/stripeConfig.ts](src/utils/stripeConfig.ts)** - Stripe initialization
- **[src/components/StripeProvider.tsx](src/components/StripeProvider.tsx)** - Stripe Elements wrapper
- **[src/components/Checkoutform.tsx](src/components/Checkoutform.tsx)** - Payment form
- **[src/hooks/useInitiatePayment.ts](src/hooks/useInitiatePayment.ts)** - Payment initiation hook
- **[src/pages/Homepage.tsx](src/pages/Homepage.tsx)** - Main layout with Stripe provider

## Backend Requirements

Your backend should have an endpoint: `POST /api/user/cart/payment/initiate`

Expected Response:
```json
{
    "clientSecret": "pi_3SvJPJ2F3pEVVTJM0IPwIMIZ_secret_UvHtccHeqI3gMUDOjzUYrwUqv",
    "paymentIntentId": "pi_3SvJPJ2F3pEVVTJM0IPwIMIZ",
    "cart": {
        "items": [...],
        "totalCartPrice": 45.50,
        "totalItems": 1
    },
    "email": "user@example.com",
    "phoneNumber": "1234567890",
    "userName": "username"
}
```

## Important Security Notes

✅ **DO**: 
- Never handle raw card data in your code
- Always use Stripe's CardElement for card input
- Keep Publishable Key (not Secret Key) in frontend code
- Keep Secret Key only in backend

❌ **DON'T**:
- Send card data directly to your backend
- Use card data outside of Stripe Elements
- Expose your Secret Key in frontend code

## Testing

Use Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Requires Auth**: 4000 2500 0000 3155

Any expiry date in the future and any 3-digit CVC will work.

## Common Issues

### "Stripe not loaded" error
- Check that `VITE_STRIPE_PUBLISHABLE_KEY` is set in `.env.local`
- Restart the dev server after adding env variables

### Card element not visible
- Ensure StripeProvider wraps Checkoutform in Homepage.tsx
- Check browser console for any errors

### Payment fails with "Invalid API Key"
- Verify you're using the Publishable Key, not Secret Key
- Check that the key matches your Stripe environment (test/live)
