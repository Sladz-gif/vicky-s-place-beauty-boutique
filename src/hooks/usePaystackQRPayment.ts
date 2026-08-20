import { useState, useCallback, useRef } from "react";

type PaymentStatus = "idle" | "pending" | "success" | "failed" | "timeout";

interface PaystackQRPaymentResult {
  status: PaymentStatus;
  qrUrl: string | null;
  reference: string | null;
  cancel: () => void;
  startPayment: (amount: number, customerEmail: string, customerName: string) => void;
  markSuccess: () => void;
}

export function usePaystackQRPayment(): PaystackQRPaymentResult {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateReference = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `sale_${timestamp}_${random}`;
  }, []);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus("idle");
    setQrUrl(null);
    setReference(null);
  }, []);

  const markSuccess = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus("success");
  }, []);

  const startPayment = useCallback(
    (amount: number, customerEmail: string, customerName: string) => {
      const newReference = generateReference();
      setReference(newReference);

      // Access Vite environment variable
      const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

      console.log("Paystack key found:", paystackKey ? "YES" : "NO");
      console.log("Paystack key value:", paystackKey);

      if (!paystackKey) {
        console.error("Paystack public key not found in environment variables");
        setStatus("failed");
        return;
      }

      // Create a payment link that can be encoded in QR code
      // Using Paystack's checkout URL format
      const paymentLink = `https://checkout.paystack.co/${paystackKey}?amount=${amount * 100}&reference=${newReference}&email=${encodeURIComponent(customerEmail)}&metadata=${encodeURIComponent(JSON.stringify({ customer_name: customerName }))}`;

      // Use QR Server API to generate QR code
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentLink)}`;

      setQrUrl(qrApiUrl);
      setStatus("pending");

      console.log("Payment started with reference:", newReference);
      console.log("Payment link:", paymentLink);

      // Set timeout for 5 minutes
      timeoutRef.current = setTimeout(
        () => {
          setStatus("timeout");
        },
        5 * 60 * 1000,
      );
    },
    [generateReference],
  );

  return {
    status,
    qrUrl,
    reference,
    cancel,
    startPayment,
    markSuccess,
  };
}
