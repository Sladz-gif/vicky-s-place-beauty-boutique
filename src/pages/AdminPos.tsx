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

function AdminPos() {
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

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
          price: variant.price,
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
    setCart([]);
    setSelectedCustomer("");
    setShowCheckoutDialog(false);
    setSelectedPaymentMethod("cash");
    cancelCardPayment();
  };

  const handleCardPayment = () => {
    setSelectedPaymentMethod("card");
    initiateCardPayment();
  };

  const printReceipt = () => {
    // In a real app, this would trigger receipt printing
    console.log("Printing receipt...");
    completeSale();
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
                          {product.variants.slice(0, 2).map((variant: any) => (
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
                                {formatPrice(variant.price)}
                              </span>
                            </Button>
                          ))}
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
        <DialogContent className="max-w-md">
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
                      onClick={() => setSelectedPaymentMethod("cash")}
                      className="justify-start"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Cash
                    </Button>
                    <Button
                      variant={
                        selectedPaymentMethod === "card" ? "default" : "outline"
                      }
                      onClick={handleCardPayment}
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
                      onClick={() => setSelectedPaymentMethod("mtn_momo")}
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
                      onClick={() => setSelectedPaymentMethod("vodafone_cash")}
                      className="justify-start"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Vodafone Cash
                    </Button>
                  </div>
                </div>

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
    </div>
  );
}

export default AdminPos;
