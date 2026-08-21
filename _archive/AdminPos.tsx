import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Wallet,
  DollarSign,
  Printer,
  X,
  User,
  Tag,
  Package,
  QrCode,
  Clock,
  XCircle,
  Smartphone,
} from "lucide-react";
import { getProducts, getCustomers, formatPrice } from "@/data/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePaystackQRPayment } from "@/hooks/usePaystackQRPayment";
import { PaymentQRCode } from "@/components/PaymentQRCode";
import { QRCodeSVG } from "qrcode.react";

function AdminPos() {
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [showQRCode, setShowQRCode] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [completedSale, setCompletedSale] = useState<any>(null);
  const [receiptNotes, setReceiptNotes] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [receiptCustomerEmail, setReceiptCustomerEmail] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, customersData] = await Promise.all([
        getProducts(),
        getCustomers(),
      ]);
      setProducts(productsData);
      setCustomers(customersData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const addToCart = (product: any, variant: any) => {
    const existingItem = cart.find(
      (item) => item.productId === product.id && item.variantId === variant.id,
    );
    const price = variant.priceOverride || product.basePrice;

    if (existingItem) {
      if (existingItem.qty < variant.stockQty) {
        setCart(
          cart.map((item) =>
            item.productId === product.id && item.variantId === variant.id
              ? { ...item, qty: item.qty + 1 }
              : item,
          ),
        );
      }
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          variantId: variant.id,
          productName: product.name,
          variantLabel: variant.label,
          price: price,
          qty: 1,
          maxQty: variant.stockQty,
        },
      ]);
    }
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart(
      cart.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      ),
    );
  };

  const updateCartQty = (
    productId: string,
    variantId: string,
    newQty: number,
  ) => {
    if (newQty <= 0) {
      removeFromCart(productId, variantId);
    } else {
      setCart(
        cart.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, qty: Math.min(newQty, item.maxQty) }
            : item,
        ),
      );
    }
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const deliveryFee = cartSubtotal > 0 ? 15 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  // Get customer email for Paystack if a customer is selected
  const selectedCustomerData = customers.find(
    (c: any) => c.id === selectedCustomer,
  );
  const customerEmail = selectedCustomerData?.email || undefined;

  // Paystack QR payment hook
  const {
    status: paymentStatus,
    reference: paymentReference,
    qrValue,
    initiatePayment: initiateCardPayment,
    cancelPayment: cancelCardPayment,
    error: paymentError,
  } = usePaystackQRPayment({
    amount: cartTotal,
    email: customerEmail,
    onSuccess: (reference: string) => {
      // Payment successful - trigger receipt print
      setTimeout(() => {
        printReceipt();
      }, 1000);
    },
    timeoutMinutes: 5,
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckoutDialog(true);
  };

  const completeSale = () => {
    // In a real app, this would create an order
    const saleData = {
      id: `SALE-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      total: cartTotal,
      paymentMethod: selectedPaymentMethod,
      mobileNumber: mobileNumber,
      customer: selectedCustomer,
      notes: receiptNotes,
      customerPhone: customerPhone,
      customerEmail: receiptCustomerEmail,
    };

    setCompletedSale(saleData);
    // Initialize the editable fields with the sale data
    setReceiptNotes(saleData.notes || "");
    setCustomerPhone(saleData.customerPhone || "");
    setReceiptCustomerEmail(saleData.customerEmail || "");

    setCart([]);
    setSelectedCustomer("");
    setShowCheckoutDialog(false);
    setShowQRCode(false);
    setSelectedPaymentMethod("cash");
    setMobileNumber("");
    setShowReceiptDialog(true);
  };

  const handleCardPayment = () => {
    setSelectedPaymentMethod("card");
    initiateCardPayment();
  };

  const updateReceiptAndPrint = () => {
    if (!completedSale) return;

    // Create updated sale data with edited values
    const updatedSale = {
      ...completedSale,
      notes: receiptNotes,
      customerPhone: customerPhone,
      customerEmail: receiptCustomerEmail,
    };

    // Update state and print immediately with the updated data
    setCompletedSale(updatedSale);
    printReceipt(updatedSale);
  };

  const printReceipt = (saleData = completedSale) => {
    if (!saleData) return;

    const formatPriceForPrint = (amount: number) =>
      `Γé╡${amount.toLocaleString("en-GH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${saleData.id}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-width: 80mm;
            margin: 0 auto;
            padding: 10px;
            color: black;
            background: white;
          }
          .header {
            text-align: center;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          .header h1 {
            font-size: 16px;
            margin: 0 0 5px 0;
            font-weight: bold;
          }
          .header p {
            margin: 2px 0;
            font-size: 10px;
          }
          .section {
            margin-bottom: 10px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin: 2px 0;
          }
          .label {
            color: #666;
          }
          .items {
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 10px 0;
            margin: 10px 0;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .item-details {
            flex: 1;
          }
          .item-name {
            font-weight: bold;
          }
          .item-variant {
            font-size: 10px;
            color: #666;
          }
          .total-section {
            border-top: 1px dashed #000;
            padding-top: 10px;
            margin-top: 10px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .grand-total {
            font-weight: bold;
            font-size: 14px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            border-top: 1px dashed #000;
            padding-top: 10px;
            margin-top: 10px;
            font-size: 10px;
          }
          .notes {
            border: 1px solid #ccc;
            padding: 5px;
            margin: 10px 0;
            min-height: 30px;
            font-size: 10px;
          }
          @media print {
            body {
              margin: 0;
              padding: 5mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>VICKY'S PLACE</h1>
          <p>Beauty Boutique</p>
          <p>Accra, Ghana</p>
          <p>Tel: +233 XX XXX XXXX</p>
        </div>

        <div class="section">
          <div class="row">
            <span class="label">Receipt #:</span>
            <span>${saleData.id}</span>
          </div>
          <div class="row">
            <span class="label">Date:</span>
            <span>${new Date(saleData.date).toLocaleString()}</span>
          </div>
          <div class="row">
            <span class="label">Payment:</span>
            <span>${saleData.paymentMethod.replace("_", " ").toUpperCase()}</span>
          </div>
          ${saleData.mobileNumber ? `
          <div class="row">
            <span class="label">Mobile:</span>
            <span>${saleData.mobileNumber}</span>
          </div>
          ` : ""}
        </div>

        ${saleData.customerPhone || saleData.customerEmail ? `
        <div class="section">
          <div class="row">
            <span class="label">Customer Phone:</span>
            <span>${saleData.customerPhone || "N/A"}</span>
          </div>
          <div class="row">
            <span class="label">Customer Email:</span>
            <span>${saleData.customerEmail || "N/A"}</span>
          </div>
        </div>
        ` : ""}

        <div class="items">
          <p style="font-weight: bold; margin-bottom: 10px;">ITEMS</p>
          ${saleData.items
            .map(
              (item: any) => `
            <div class="item">
              <div class="item-details">
                <div class="item-name">${item.productName}</div>
                <div class="item-variant">${item.variantLabel} x ${item.qty}</div>
              </div>
              <div>${formatPriceForPrint(item.price * item.qty)}</div>
            </div>
          `,
            )
            .join("")}
        </div>

        ${saleData.notes ? `
        <div class="section">
          <p class="label">Notes:</p>
          <div class="notes">${saleData.notes}</div>
        </div>
        ` : ""}

        <div class="total-section">
          <div class="total-row">
            <span class="label">Subtotal:</span>
            <span>${formatPriceForPrint(saleData.subtotal)}</span>
          </div>
          <div class="total-row">
            <span class="label">Delivery Fee:</span>
            <span>${formatPriceForPrint(saleData.deliveryFee)}</span>
          </div>
          <div class="total-row grand-total">
            <span>TOTAL:</span>
            <span>${formatPriceForPrint(saleData.total)}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for shopping with us!</p>
          <p>Visit us again</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto h-[calc(100vh-2rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Product Selection */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                Point of Sale
              </h1>
              <p className="text-muted-foreground mt-1">
                Create new sales orders
              </p>
            </div>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-4 h-full">
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="h-32 w-full rounded-md overflow-hidden bg-muted mb-3">
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <h3 className="font-medium text-sm mb-1 truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {product.sku}
                        </p>
                        <div className="space-y-2">
                          {product.variants.slice(0, 2).map((variant: any) => {
                            const price = variant.priceOverride || product.basePrice;
                            return (
                              <Button
                                key={variant.id}
                                variant="outline"
                                size="sm"
                                className="w-full justify-between text-xs"
                                onClick={() => addToCart(product, variant)}
                                disabled={variant.stockQty === 0}
                              >
                                <span className="truncate">{variant.label}</span>
                                <span className="font-medium">
                                  {formatPrice(price)}
                                </span>
                              </Button>
                            );
                          })}
                          {product.variants.length > 2 && (
                            <p className="text-xs text-muted-foreground text-center">
                              +{product.variants.length - 2} more variants
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Cart */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Current Sale
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4">
              {/* Customer Selection */}
              <div className="mb-4">
                <Select
                  value={selectedCustomer}
                  onValueChange={setSelectedCustomer}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Walk-in Customer</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              {/* Cart Items */}
              <ScrollArea className="flex-1">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Cart is empty</p>
                    <p className="text-sm">Add products to start a sale</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <Card key={`${item.productId}-${item.variantId}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {item.productName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.variantLabel}
                              </p>
                              <p className="text-sm font-medium mt-1">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() =>
                                  updateCartQty(
                                    item.productId,
                                    item.variantId,
                                    item.qty - 1,
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.qty}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() =>
                                  updateCartQty(
                                    item.productId,
                                    item.variantId,
                                    item.qty + 1,
                                  )
                                }
                                disabled={item.qty >= item.maxQty}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-red-600 hover:text-red-700"
                              onClick={() =>
                                removeFromCart(item.productId, item.variantId)
                              }
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                            <p className="font-medium">
                              {formatPrice(item.price * item.qty)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <Separator className="my-4" />

              {/* Cart Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                size="lg"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Sale</DialogTitle>
            <DialogDescription>
              Select payment method to complete the transaction
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {paymentStatus === "idle" && (
              <>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Payment Method
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        selectedPaymentMethod === "cash" ? "default" : "outline"
                      }
                      onClick={() => {
                        setSelectedPaymentMethod("cash");
                        setShowQRCode(false);
                      }}
                      className="justify-start"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Cash
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "card" ? "default" : "outline"
                      }
                      onClick={() => {
                        setSelectedPaymentMethod("card");
                        setShowQRCode(true);
                      }}
                      className="justify-start"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Card
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "mtn_momo"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        setSelectedPaymentMethod("mtn_momo");
                        setShowQRCode(false);
                      }}
                      className="justify-start"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      MTN MoMo
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "vodafone_cash"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        setSelectedPaymentMethod("vodafone_cash");
                        setShowQRCode(false);
                      }}
                      className="justify-start"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Vodafone Cash
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "tigo_cash" ? "default" : "outline"
                      }
                      onClick={() => {
                        setSelectedPaymentMethod("tigo_cash");
                        setShowQRCode(false);
                      }}
                      className="justify-start"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Tigo Cash
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "airteltigo" ? "default" : "outline"
                      }
                      onClick={() => {
                        setSelectedPaymentMethod("airteltigo");
                        setShowQRCode(false);
                      }}
                      className="justify-start"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      AirtelTigo
                    </Button>
                  </div>
                </div>

                {/* Mobile Money Input */}
                {(selectedPaymentMethod === "mtn_momo" ||
                  selectedPaymentMethod === "vodafone_cash" ||
                  selectedPaymentMethod === "tigo_cash" ||
                  selectedPaymentMethod === "airteltigo") && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Mobile Money Number
                    </p>
                    <Input
                      placeholder="024 XXX XXXX"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      {selectedPaymentMethod === "mtn_momo" &&
                        "Enter MTN MoMo number"}
                      {selectedPaymentMethod === "vodafone_cash" &&
                        "Enter Vodafone Cash number"}
                      {selectedPaymentMethod === "tigo_cash" &&
                        "Enter Tigo Cash number"}
                      {selectedPaymentMethod === "airteltigo" &&
                        "Enter AirtelTigo number"}
                    </p>
                  </div>
                )}

                {/* QR Code for Card Payment */}
                {showQRCode && selectedPaymentMethod === "card" && (
                  <div className="flex flex-col items-center space-y-3 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Scan QR Code to Pay
                    </p>
                    <div className="bg-white p-3 rounded-lg">
                      <QRCodeSVG
                        value={`VICKYSPLACE-PAY-${cartTotal.toFixed(2)}-${Date.now()}`}
                        size={150}
                        level="H"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Scan with any Ghana QR payment app
                    </p>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCheckoutDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={completeSale}
                    disabled={selectedPaymentMethod === "card"}
                  >
                    Complete Sale
                  </Button>
                </div>
              </>
            )}

            <PaymentQRCode
              qrValue={qrValue}
              reference={paymentReference}
              status={paymentStatus}
              amount={cartTotal}
              onCancel={cancelCardPayment}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Receipt</DialogTitle>
            <DialogDescription>
              Review and edit receipt details before printing
            </DialogDescription>
          </DialogHeader>

          {completedSale && (
            <div className="space-y-4 mt-4" id="receipt-content">
              {/* Receipt Header */}
              <div className="text-center border-b pb-4">
                <h2 className="text-xl font-serif font-bold text-gold">
                  Vicky's Place
                </h2>
                <p className="text-sm text-muted-foreground">
                  Beauty Boutique
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Accra, Ghana
                </p>
                <p className="text-xs text-muted-foreground">
                  Tel: +233 XX XXX XXXX
                </p>
              </div>

              {/* Sale Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt #:</span>
                  <span className="font-medium">{completedSale.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date(completedSale.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment:</span>
                  <span className="capitalize">
                    {completedSale.paymentMethod.replace("_", " ")}
                  </span>
                </div>
                {completedSale.mobileNumber && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mobile:</span>
                    <span>{completedSale.mobileNumber}</span>
                  </div>
                )}
              </div>

              {/* Customer Details (Editable) */}
              <div className="space-y-2 border-t pt-4">
                <p className="text-sm font-medium">Customer Details</p>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Phone Number
                    </label>
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Customer phone (optional)"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Email</label>
                    <Input
                      value={receiptCustomerEmail}
                      onChange={(e) => setReceiptCustomerEmail(e.target.value)}
                      placeholder="Customer email (optional)"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Items</p>
                <div className="space-y-2">
                  {completedSale.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.variantLabel} x {item.qty}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes (Editable) */}
              <div className="border-t pt-4">
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  value={receiptNotes}
                  onChange={(e) => setReceiptNotes(e.target.value)}
                  placeholder="Add notes to receipt..."
                  className="w-full mt-1 p-2 border rounded-md text-sm resize-none"
                  rows={2}
                />
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(completedSale.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{formatPrice(completedSale.deliveryFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(completedSale.total)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Thank you for shopping with us!
                </p>
                <p className="text-xs text-muted-foreground">Visit us again</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowReceiptDialog(false);
                    setCompletedSale(null);
                    setReceiptNotes("");
                    setCustomerPhone("");
                    setReceiptCustomerEmail("");
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={updateReceiptAndPrint}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Update & Print
                </Button>
                <Button className="flex-1" onClick={printReceipt}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminPos;
