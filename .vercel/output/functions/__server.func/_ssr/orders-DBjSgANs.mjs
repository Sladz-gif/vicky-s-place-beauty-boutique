//#region node_modules/.nitro/vite/services/ssr/assets/orders-DBjSgANs.js
var mockOrders = [
	{
		id: "ORD-2024-001",
		customerId: "cust-1",
		customerName: "Ama Mensah",
		customerEmail: "ama.mensah@email.com",
		customerPhone: "+233 24 123 4567",
		shippingAddress: {
			id: "addr-1-1",
			label: "Home",
			region: "Greater Accra",
			city: "Accra",
			digitalGpsAddress: "AK-039-5028",
			landmark: "Near Makola Market",
			isDefault: true
		},
		status: "delivered",
		items: [{
			variantId: "var-1-1",
			productId: "prod-1",
			productName: "CeraVe Hydrating Cleanser",
			variantLabel: "236ml",
			qty: 2,
			priceAtPurchase: 85
		}, {
			variantId: "var-2-1",
			productId: "prod-2",
			productName: "CeraVe Moisturizing Cream",
			variantLabel: "340g",
			qty: 1,
			priceAtPurchase: 120
		}],
		subtotal: 290,
		discount: 0,
		deliveryFee: 15,
		total: 305,
		paymentMethod: "mtn_momo",
		placedAt: "2024-03-15T10:30:00Z",
		updatedAt: "2024-03-18T14:20:00Z"
	},
	{
		id: "ORD-2024-002",
		customerId: "cust-2",
		customerName: "Kwame Asante",
		customerEmail: "kwame.asante@email.com",
		customerPhone: "+233 20 987 6543",
		shippingAddress: {
			id: "addr-2-1",
			label: "Home",
			region: "Ashanti",
			city: "Kumasi",
			digitalGpsAddress: "AS-456-7890",
			landmark: "Near Kejetia Market",
			isDefault: true
		},
		status: "shipped",
		items: [{
			variantId: "var-6-1",
			productId: "prod-6",
			productName: "Shea Moisture Coconut & Hibiscus Curl & Style Milk",
			variantLabel: "340ml",
			qty: 1,
			priceAtPurchase: 110
		}, {
			variantId: "var-7-1",
			productId: "prod-7",
			productName: "Cantu Shea Butter Leave-In Conditioning Repair Cream",
			variantLabel: "340ml",
			qty: 2,
			priceAtPurchase: 75
		}],
		subtotal: 260,
		discount: 26,
		deliveryFee: 20,
		total: 254,
		paymentMethod: "vodafone_cash",
		discountCode: "WELCOME10",
		placedAt: "2024-03-20T09:15:00Z",
		updatedAt: "2024-03-22T11:45:00Z"
	},
	{
		id: "ORD-2024-003",
		customerId: "cust-3",
		customerName: "Efua Ofori",
		customerEmail: "efua.ofori@email.com",
		customerPhone: "+233 55 456 7890",
		shippingAddress: {
			id: "addr-3-1",
			label: "Home",
			region: "Greater Accra",
			city: "Tema",
			digitalGpsAddress: "TE-234-5678",
			landmark: "Community 25",
			isDefault: true
		},
		status: "paid",
		items: [{
			variantId: "var-10-1",
			productId: "prod-10",
			productName: "Vaseline Intensive Care Advanced Repair Lotion",
			variantLabel: "200ml",
			qty: 3,
			priceAtPurchase: 55
		}, {
			variantId: "var-16-1",
			productId: "prod-16",
			productName: "Vaseline Lip Therapy Original",
			variantLabel: "20g",
			qty: 5,
			priceAtPurchase: 18
		}],
		subtotal: 255,
		discount: 0,
		deliveryFee: 15,
		total: 270,
		paymentMethod: "card",
		placedAt: "2024-03-25T14:20:00Z",
		updatedAt: "2024-03-25T14:35:00Z"
	},
	{
		id: "ORD-2024-004",
		customerId: "cust-4",
		customerName: "Kojo Mensah",
		customerEmail: "kojo.mensah@email.com",
		customerPhone: "+233 50 345 6789",
		shippingAddress: {
			id: "addr-4-1",
			label: "Home",
			region: "Eastern",
			city: "Koforidua",
			digitalGpsAddress: "EA-123-4567",
			landmark: "Near Jackson Park",
			isDefault: true
		},
		status: "pending",
		items: [{
			variantId: "var-3-2",
			productId: "prod-3",
			productName: "Vaseline Petroleum Jelly",
			variantLabel: "100ml",
			qty: 2,
			priceAtPurchase: 25
		}, {
			variantId: "var-13-1",
			productId: "prod-13",
			productName: "Macs Cocoa Butter Soap",
			variantLabel: "125g",
			qty: 4,
			priceAtPurchase: 15
		}],
		subtotal: 110,
		discount: 0,
		deliveryFee: 18,
		total: 128,
		paymentMethod: "airteltigo_money",
		placedAt: "2024-03-28T16:45:00Z",
		updatedAt: "2024-03-28T16:45:00Z"
	},
	{
		id: "ORD-2024-005",
		customerId: "cust-1",
		customerName: "Ama Mensah",
		customerEmail: "ama.mensah@email.com",
		customerPhone: "+233 24 123 4567",
		shippingAddress: {
			id: "addr-1-2",
			label: "Work",
			region: "Greater Accra",
			city: "Accra",
			digitalGpsAddress: "AK-087-1234",
			landmark: "Airport Residential Area",
			isDefault: false
		},
		status: "fulfilled",
		items: [{
			variantId: "var-4-1",
			productId: "prod-4",
			productName: "Neutrogena Hydro Boost Water Gel",
			variantLabel: "50ml",
			qty: 1,
			priceAtPurchase: 95
		}],
		subtotal: 95,
		discount: 0,
		deliveryFee: 15,
		total: 110,
		paymentMethod: "mtn_momo",
		placedAt: "2024-03-22T11:00:00Z",
		updatedAt: "2024-03-23T09:30:00Z"
	},
	{
		id: "ORD-2024-006",
		customerId: "cust-2",
		customerName: "Kwame Asante",
		customerEmail: "kwame.asante@email.com",
		customerPhone: "+233 20 987 6543",
		shippingAddress: {
			id: "addr-2-1",
			label: "Home",
			region: "Ashanti",
			city: "Kumasi",
			digitalGpsAddress: "AS-456-7890",
			landmark: "Near Kejetia Market",
			isDefault: true
		},
		status: "cancelled",
		items: [{
			variantId: "var-8-1",
			productId: "prod-8",
			productName: "Olay Total Effects 7-in-One Anti-Ageing Day Cream",
			variantLabel: "50g",
			qty: 1,
			priceAtPurchase: 135
		}],
		subtotal: 135,
		discount: 0,
		deliveryFee: 0,
		total: 0,
		paymentMethod: "card",
		placedAt: "2024-03-18T08:00:00Z",
		updatedAt: "2024-03-18T10:30:00Z",
		notes: "Customer requested cancellation due to payment issue."
	}
];
//#endregion
export { mockOrders as t };
