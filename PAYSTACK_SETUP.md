# Paystack QR Payment Setup Instructions

This document provides instructions for setting up Paystack QR code payments in the POS system.

## Overview

The Paystack QR payment integration allows customers to scan a QR code displayed on the POS screen to complete card payments. The system uses Paystack Inline JS with only the public key (frontend-only implementation).

## Prerequisites

1. **Paystack Account**
   - Sign up at https://paystack.co
   - Verify your account
   - Enable card payments in your dashboard

2. **Get Your Paystack Public Key**
   - Go to https://dashboard.paystack.co/settings/keys
   - Copy your **Public Key** (starts with `pk_test_` for test mode, `pk_live_` for production)
   - Never use your Secret Key in frontend code

## Setup Steps

### 1. Configure Environment Variable

Open the `.env` file in your project root and update the Paystack public key:

```env
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_public_key_here
```

Replace `pk_test_your_actual_public_key_here` with your actual Paystack public key.

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install qrcode.react
```

Note: The Paystack Inline JS library is loaded via a script tag (see step 3).

### 3. Add Paystack Script to HTML

Add the Paystack Inline JS script to your HTML file (typically `index.html` or in your main layout):

```html
<script src="https://js.paystack.co/v1/inline.js"></script>
```

Place this script tag in the `<head>` section of your HTML file.

**Important:** If you're using a framework like Vite, add this to your `index.html` in the `public` folder.

### 4. Test the Integration

1. Start your development server
2. Navigate to the Admin POS page
3. Add items to the cart
4. Click "Checkout"
5. Select "Card" as the payment method
6. A QR code should appear
7. Scan the QR code with your phone (in test mode, you can use the Paystack test card)
8. Complete the payment
9. The system should detect the success and trigger receipt printing

## Test Mode vs Production

### Test Mode

- Use your test public key (starts with `pk_test_`)
- Use Paystack test cards: https://paystack.com/docs/payments/test-cards
- No real money is charged
- Transactions appear in your Paystack dashboard under "Test Transactions"

### Production

- Use your live public key (starts with `pk_live_`)
- Real payments are processed
- Ensure your Paystack account is fully verified
- Transactions appear under "Live Transactions"

## Payment Flow

1. **Cashier selects Card payment**
   - System generates a unique transaction reference
   - Payment status changes to "pending"

2. **QR Code Display**
   - A QR code containing the Paystack checkout URL is displayed
   - Customer scans with their phone
   - Payment status shows "pending" with a waiting indicator

3. **Customer Completes Payment**
   - Customer scans QR code and pays on their phone
   - Paystack processes the payment
   - Paystack callback notifies the frontend of success

4. **Payment Success**
   - Frontend detects successful payment
   - Status changes to "success"
   - Receipt printing is triggered automatically
   - Cart is cleared and transaction is complete

5. **Payment Timeout**
   - If payment is not completed within 5 minutes
   - Status changes to "timeout"
   - Cashier can cancel and try another payment method

## Security Notes

⚠️ **Important Security Considerations:**

- This implementation uses **frontend-only payment detection**
- The public key is safe to use in frontend code
- **Never expose your secret key** in frontend code
- For production, implement backend verification:
  - Use Paystack webhooks to verify payments server-side
  - Store transaction records in your database
  - Verify payment status before marking orders as paid

## Troubleshooting

### QR Code Not Displaying

- Check that the Paystack script is loaded in your HTML
- Verify the public key is set in `.env`
- Check browser console for errors

### Payment Not Detected

- Ensure the Paystack callback is configured correctly
- Check that the payment reference matches
- Verify the callback URL is accessible

### Timeout Issues

- The default timeout is 5 minutes
- Adjust `timeoutMinutes` in `usePaystackQRPayment` hook if needed
- Ensure customer has stable internet connection

### Environment Variable Not Loading

- Restart your development server after changing `.env`
- Ensure the variable name is `VITE_PAYSTACK_PUBLIC_KEY` (Vite requires `VITE_` prefix)
- Check that `.env` is in the project root

## Files Modified/Created

- `src/hooks/usePaystackQRPayment.ts` - Custom hook for Paystack payment logic
- `src/components/PaymentQRCode.tsx` - QR code display component
- `src/pages/AdminPos.tsx` - Integrated Paystack QR payment into POS
- `.env` - Environment configuration with Paystack public key

## Additional Resources

- Paystack Documentation: https://paystack.com/docs
- Paystack Inline JS: https://paystack.com/docs/payments/inline-js
- Paystack Test Cards: https://paystack.com/docs/payments/test-cards
- Paystack Dashboard: https://dashboard.paystack.co

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Paystack account settings
3. Ensure your public key is correct
4. Check that the Paystack script is loaded
