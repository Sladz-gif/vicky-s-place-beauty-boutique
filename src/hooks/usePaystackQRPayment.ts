import { useState, useEffect, useCallback, useRef } from "react";

export type PaymentStatus =
  "idle" | "pending" | "success" | "failed" | "timeout";

interface PaystackQRPaymentOptions {
  amount: number; // Amount in cedis (will be converted to pesewas)
  email?: string;
  onSuccess?: (reference: string) => void;
  onFailed?: (error: any) => void;
  timeoutMinutes?: number;
}

interface PaystackQRPaymentReturn {
  status: PaymentStatus;
  reference: string | null;
  qrValue: string | null;
  initiatePayment: () => void;
  cancelPayment: () => void;
  error: string | null;
}

export function usePaystackQRPayment({
  amount,
  email,
  onSuccess,
  onFailed,
  timeoutMinutes = 5,
}: PaystackQRPaymentOptions): PaystackQRPaymentReturn {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<(NodeJS.Timeout & { _id?: number }) | null>(null);
  const paystackPopupRef = useRef<any>(null);

  // Generate unique reference
  const generateReference = useCallback(() => {
    return `sale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Cancel payment
  const cancelPayment = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (paystackPopupRef.current) {
      try {
        paystackPopupRef.current.close();
      } catch (e) {
        // Ignore close errors
      }
    }

    setStatus("idle");
    setReference(null);
    setError(null);
  }, []);

  // Initiate payment
  const initiatePayment = useCallback(() => {
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      setStatus("failed");
      return;
    }

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      setError(
        "Paystack public key not configured. Please set VITE_PAYSTACK_PUBLIC_KEY in your environment variables.",
      );
      setStatus("failed");
      return;
    }

    const newReference = generateReference();
    setReference(newReference);
    setStatus("pending");
    setError(null);

    // Convert cedis to pesewas (multiply by 100)
    const amountInPesewas = Math.round(amount * 100);

    // Set timeout
    timeoutRef.current = setTimeout(
      () => {
        setStatus("timeout");
        setError("Payment timed out. Please try again.");
      },
      timeoutMinutes * 60 * 1000,
    ) as NodeJS.Timeout & { _id?: number };

    // Initialize Paystack Inline JS
    // Note: This assumes @paystack/inline-js is installed
    // If using the script tag approach, you would use window.PaystackPop
    try {
      const PaystackPop = (window as any).PaystackPop;

      if (!PaystackPop) {
        setError(
          "Paystack library not loaded. Please ensure the Paystack script is included.",
        );
        setStatus("failed");
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        return;
      }

      const handler = PaystackPop.setup({
        key: publicKey,
        email: email || "customer@vickysplace.com",
        amount: amountInPesewas,
        currency: "GHS",
        reference: newReference,
        onClose: () => {
          // User closed the popup without completing
          if (status === "pending") {
            cancelPayment();
          }
        },
        callback: (response: any) => {
          // Payment successful
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          setStatus("success");
          setReference(response.reference);

          if (onSuccess) {
            onSuccess(response.reference);
          }
        },
      });

      paystackPopupRef.current = handler;

      // Instead of opening the popup directly, we'll generate a QR code
      // The QR code will contain the checkout URL
      const checkoutUrl = `https://paystack.com/pay/${newReference}`;

      // For QR code purposes, we'll use the reference
      // The actual QR code will be generated in the component
    } catch (err) {
      setError("Failed to initialize payment. Please try again.");
      setStatus("failed");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (onFailed) {
        onFailed(err);
      }
    }
  }, [
    amount,
    email,
    generateReference,
    timeoutMinutes,
    onSuccess,
    onFailed,
    cancelPayment,
    status,
  ]);

  // Generate QR value (checkout URL)
  const qrValue = reference ? `https://paystack.com/pay/${reference}` : null;

  return {
    status,
    reference,
    qrValue,
    initiatePayment,
    cancelPayment,
    error,
  };
}
