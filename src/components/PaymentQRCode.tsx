import { RefreshCw, X, CheckCircle, XCircle, Clock, Check } from "lucide-react";

type PaymentStatus = "idle" | "pending" | "success" | "failed" | "timeout";

interface PaymentQRCodeProps {
  status: PaymentStatus;
  qrUrl: string | null;
  reference: string | null;
  onCancel: () => void;
  onRetry?: () => void;
  onConfirmPayment?: () => void;
}

export function PaymentQRCode({
  status,
  qrUrl,
  reference,
  onCancel,
  onRetry,
  onConfirmPayment,
}: PaymentQRCodeProps) {
  const getStatusMessage = () => {
    switch (status) {
      case "pending":
        return "Waiting for customer to scan and complete payment...";
      case "success":
        return "Payment completed successfully!";
      case "failed":
        return "Payment failed. Please try again.";
      case "timeout":
        return "Payment timed out. Please try again.";
      default:
        return "";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-12 w-12 text-green-600" />;
      case "failed":
        return <XCircle className="h-12 w-12 text-red-600" />;
      case "timeout":
        return <Clock className="h-12 w-12 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-lg">Card Payment</h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {status === "pending" && qrUrl && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-lg border border-border">
            <img src={qrUrl} alt="Payment QR Code" className="w-64 h-64 max-w-full h-auto" />
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Scan this QR code with your phone to complete payment
          </p>
          {reference && <p className="text-xs text-muted-foreground">Reference: {reference}</p>}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Waiting for payment...</span>
          </div>
          <button
            onClick={onConfirmPayment}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            <Check className="h-4 w-4" />
            Confirm Payment Received
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Click this button after customer confirms payment on their phone
          </p>
        </div>
      )}

      {(status === "success" || status === "failed" || status === "timeout") && (
        <div className="flex flex-col items-center gap-4 py-8">
          {getStatusIcon()}
          <p className="text-lg font-semibold">{getStatusMessage()}</p>
          {(status === "failed" || status === "timeout") && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
