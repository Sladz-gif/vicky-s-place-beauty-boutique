import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode, Clock, XCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QRCodeSVG } from "qrcode.react";

interface PaymentQRCodeProps {
  qrValue: string | null;
  reference: string | null;
  status: "idle" | "pending" | "success" | "failed" | "timeout";
  amount: number;
  onCancel?: () => void;
}

export function PaymentQRCode({
  qrValue,
  reference,
  status,
  amount,
  onCancel,
}: PaymentQRCodeProps) {
  if (status === "idle") {
    return null;
  }

  return (
    <div className="space-y-4">
      {status === "pending" && (
        <>
          <Alert>
            <QrCode className="h-4 w-4" />
            <AlertDescription>
              Scan the QR code with your phone to complete payment
            </AlertDescription>
          </Alert>

          <div className="flex flex-col items-center space-y-4 py-4">
            <Card className="p-4 bg-white">
              <CardContent className="p-0">
                {qrValue ? (
                  <div className="w-48 h-48 flex items-center justify-center">
                    <QRCodeSVG
                      value={qrValue}
                      size={192}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">
                      Loading QR...
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Amount to Pay</p>
              <p className="text-2xl font-bold">₵{amount.toFixed(2)}</p>
            </div>

            {reference && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Reference</p>
                <p className="text-sm font-mono">{reference}</p>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 animate-pulse" />
              <span>Waiting for payment...</span>
            </div>

            <Badge variant="outline" className="animate-pulse">
              Payment Pending
            </Badge>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              <XCircle className="h-4 w-4" />
              Cancel Payment
            </button>
          )}
        </>
      )}

      {status === "success" && (
        <>
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Payment successful! Processing your order...
            </AlertDescription>
          </Alert>

          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Payment Completed</p>
              <p className="text-2xl font-bold text-green-600">
                ₵{amount.toFixed(2)}
              </p>
            </div>

            {reference && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Reference</p>
                <p className="text-sm font-mono">{reference}</p>
              </div>
            )}

            <Badge
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              Payment Successful
            </Badge>
          </div>
        </>
      )}

      {status === "timeout" && (
        <>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Payment timed out. Please try another payment method.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Payment Timeout</p>
              <p className="text-sm text-muted-foreground">
                The payment was not completed within the allowed time.
              </p>
            </div>

            <Badge variant="destructive">Payment Timed Out</Badge>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              Try Another Payment Method
            </button>
          )}
        </>
      )}

      {status === "failed" && (
        <>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Payment failed. Please try again.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Payment Failed</p>
              <p className="text-sm text-muted-foreground">
                There was an error processing your payment.
              </p>
            </div>

            <Badge variant="destructive">Payment Failed</Badge>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              Try Again
            </button>
          )}
        </>
      )}
    </div>
  );
}
