import type { Customer, Address } from "../types";

export const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Ama Mensah",
    email: "ama.mensah@email.com",
    phone: "+233 24 123 4567",
    addresses: [
      {
        id: "addr-1-1",
        label: "Home",
        region: "Greater Accra",
        city: "Accra",
        digitalGpsAddress: "AK-039-5028",
        landmark: "Near Makola Market",
        isDefault: true,
      },
      {
        id: "addr-1-2",
        label: "Work",
        region: "Greater Accra",
        city: "Accra",
        digitalGpsAddress: "AK-087-1234",
        landmark: "Airport Residential Area",
        isDefault: false,
      },
    ],
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "cust-2",
    name: "Kwame Asante",
    email: "kwame.asante@email.com",
    phone: "+233 20 987 6543",
    addresses: [
      {
        id: "addr-2-1",
        label: "Home",
        region: "Ashanti",
        city: "Kumasi",
        digitalGpsAddress: "AS-456-7890",
        landmark: "Near Kejetia Market",
        isDefault: true,
      },
    ],
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "cust-3",
    name: "Efua Ofori",
    email: "efua.ofori@email.com",
    phone: "+233 55 456 7890",
    addresses: [
      {
        id: "addr-3-1",
        label: "Home",
        region: "Greater Accra",
        city: "Tema",
        digitalGpsAddress: "TE-234-5678",
        landmark: "Community 25",
        isDefault: true,
      },
    ],
    createdAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "cust-4",
    name: "Kojo Mensah",
    email: "kojo.mensah@email.com",
    phone: "+233 50 345 6789",
    addresses: [
      {
        id: "addr-4-1",
        label: "Home",
        region: "Eastern",
        city: "Koforidua",
        digitalGpsAddress: "EA-123-4567",
        landmark: "Near Jackson Park",
        isDefault: true,
      },
    ],
    createdAt: "2024-03-10T00:00:00Z",
  },
];
