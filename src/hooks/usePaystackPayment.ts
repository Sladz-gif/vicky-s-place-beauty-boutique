import { useState, useCallback, useRef, useEffect } from "react";

type PaymentStatus = "idle" | "processing" | "success" | "failed" | "cancelled";

type PaymentMethod = "card" | "mtn_momo" | "vodafone_cash" | "airteltigo_money";

interface PaystackPaymentResult {
  status: PaymentStatus;
  reference: string | null;
  cancel: () => void;
  startPayment: (
    amount: number,
    email: string,
    paymentMethod: PaymentMethod,
    metadata?: Record<string, unknown>,
  ) => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: Record<string, unknown>) => {
        openIframe: () => void;
        close: () => void;
      };
    };
  }
}

export function usePaystackPayment(): PaystackPaymentResult {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const paystackInstanceRef = useRef<{
    openIframe: () => void;
    close: () => void;
  } | null>(null);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const generateReference = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `VP_${timestamp}_${random}`;
  }, []);

  const cancel = useCallback(() => {
    if (paystackInstanceRef.current) {
      paystackInstanceRef.current.close();
      paystackInstanceRef.current = null;
    }
    setStatus("idle");
    setReference(null);
  }, []);

  const startPayment = useCallback(
    (
      amount: number,
      email: string,
      paymentMethod: PaymentMethod,
      metadata: Record<string, unknown> = {},
    ) => {
      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

      if (!publicKey) {
        console.error("Paystack public key not found");
        setStatus("failed");
        return;
      }

      const newReference = generateReference();
      setReference(newReference);
      setStatus("processing");

      const amountInKobo = Math.round(amount * 100);

      // For mobile money, we need to handle differently
      if (paymentMethod !== "card") {
        // For mobile money, we'll use a different approach
        // This would typically call your backend which processes mobile money payments
        console.log("Mobile money payment initiated:", {
          reference: newReference,
          amount: amountInKobo,
          email,
          paymentMethod,
          metadata,
        });

        // Simulate mobile money payment processing
        // In production, this would call your backend API which processes mobile money
        setTimeout(() => {
          setStatus("success");
        }, 3000);
        return;
      }

      // Card payment using Paystack inline
      if (window.PaystackPop) {
        paystackInstanceRef.current = window.PaystackPop.setup({
          key: publicKey,
          email: email,
          amount: amountInKobo,
          currency: "GHS",
          ref: newReference,
          metadata: {
            custom_fields: [
              {
                display_name: "Payment Method",
                variable_name: "payment_method",
                value: paymentMethod,
              },
              ...Object.entries(metadata).map(([key, value]) => ({
                display_name: key,
                variable_name: key,
                value: String(value),
              })),
            ],
          },
          callback: (response: { reference: string; status: string }) => {
            console.log("Payment successful:", response);
            setStatus("success");
            paystackInstanceRef.current = null;
          },
          onClose: () => {
            console.log("Payment closed");
            if (status === "processing") {
              setStatus("cancelled");
            }
            paystackInstanceRef.current = null;
          },
        });

        paystackInstanceRef.current.openIframe();
      } else {
        console.error("PaystackPop not loaded");
        setStatus("failed");
      }
    },
    [generateReference, status],
  );

  return {
    status,
    reference,
    cancel,
    startPayment,
  };
}
