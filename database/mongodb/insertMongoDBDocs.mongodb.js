use("aggregationDemo")


db.orders.insertMany([
  {
    orderNo: "ORD1001",
    customerId: 101,
    customerName: "Aarav Sharma",
    amount: 2500,
    status: "delivered",
    category: "Electronics",
    items: [
      { name: "Mouse", quantity: 1, price: 500 },
      { name: "Keyboard", quantity: 1, price: 2000 }
    ],
    city: "Delhi",
    createdAt: ISODate("2026-09-01T10:00:00Z")
  },
  {
    orderNo: "ORD1002",
    customerId: 102,
    customerName: "Priya Verma",
    amount: 1200,
    status: "delivered",
    category: "Fashion",
    items: [
      { name: "T-Shirt", quantity: 2, price: 600 }
    ],
    city: "Noida",
    createdAt: ISODate("2026-09-02T11:00:00Z")
  },
  {
    orderNo: "ORD1003",
    customerId: 103,
    customerName: "Rohan Gupta",
    amount: 5000,
    status: "shipped",
    category: "Electronics",
    items: [
      { name: "Monitor", quantity: 1, price: 5000 }
    ],
    city: "Ghaziabad",
    createdAt: ISODate("2026-09-03T12:00:00Z")
  },
  {
    orderNo: "ORD1004",
    customerId: 101,
    customerName: "Aarav Sharma",
    amount: 800,
    status: "pending",
    category: "Books",
    items: [
      { name: "DBMS Book", quantity: 1, price: 800 }
    ],
    city: "Delhi",
    createdAt: ISODate("2026-09-04T09:30:00Z")
  },
  {
    orderNo: "ORD1005",
    customerId: 104,
    customerName: "Sneha Singh",
    amount: 3200,
    status: "delivered",
    category: "Electronics",
    items: [
      { name: "Headphones", quantity: 1, price: 3200 }
    ],
    city: "Lucknow",
    createdAt: ISODate("2026-09-05T13:15:00Z")
  },
  {
    orderNo: "ORD1006",
    customerId: 105,
    customerName: "Vikram Patel",
    amount: 1500,
    status: "cancelled",
    category: "Fashion",
    items: [
      { name: "Shoes", quantity: 1, price: 1500 }
    ],
    city: "Jaipur",
    createdAt: ISODate("2026-09-06T14:00:00Z")
  },
  {
    orderNo: "ORD1007",
    customerId: 102,
    customerName: "Priya Verma",
    amount: 2700,
    status: "delivered",
    category: "Electronics",
    items: [
      { name: "SSD", quantity: 1, price: 2700 }
    ],
    city: "Noida",
    createdAt: ISODate("2026-09-07T10:45:00Z")
  },
  {
    orderNo: "ORD1008",
    customerId: 106,
    customerName: "Karan Mehta",
    amount: 600,
    status: "pending",
    category: "Books",
    items: [
      { name: "Java Book", quantity: 1, price: 600 }
    ],
    city: "Delhi",
    createdAt: ISODate("2026-09-08T15:20:00Z")
  },
  {
    orderNo: "ORD1009",
    customerId: 103,
    customerName: "Rohan Gupta",
    amount: 4500,
    status: "delivered",
    category: "Electronics",
    items: [
      { name: "Graphics Tablet", quantity: 1, price: 4500 }
    ],
    city: "Ghaziabad",
    createdAt: ISODate("2026-09-09T08:00:00Z")
  },
  {
    orderNo: "ORD1010",
    customerId: 107,
    customerName: "Ananya Das",
    amount: 900,
    status: "shipped",
    category: "Fashion",
    items: [
      { name: "Jeans", quantity: 1, price: 900 }
    ],
    city: "Kanpur",
    createdAt: ISODate("2026-09-10T16:10:00Z")
  },
  {
    orderNo: "ORD1011",
    customerId: 101,
    customerName: "Aarav Sharma",
    amount: 1800,
    status: "delivered",
    category: "Books",
    items: [
      { name: "MongoDB Book", quantity: 2, price: 900 }
    ],
    city: "Delhi",
    createdAt: ISODate("2026-09-11T10:30:00Z")
  },
  {
    orderNo: "ORD1012",
    customerId: 104,
    customerName: "Sneha Singh",
    amount: 2200,
    status: "shipped",
    category: "Fashion",
    items: [
      { name: "Jacket", quantity: 1, price: 2200 }
    ],
    city: "Lucknow",
    createdAt: ISODate("2026-09-12T12:40:00Z")
  },
  {
    orderNo: "ORD1013",
    customerId: 105,
    customerName: "Vikram Patel",
    amount: 3500,
    status: "delivered",
    category: "Electronics",
    items: [
      { name: "Smartwatch", quantity: 1, price: 3500 }
    ],
    city: "Jaipur",
    createdAt: ISODate("2026-09-13T09:00:00Z")
  },
  {
    orderNo: "ORD1014",
    customerId: 106,
    customerName: "Karan Mehta",
    amount: 1100,
    status: "delivered",
    category: "Books",
    items: [
      { name: "OS Book", quantity: 1, price: 1100 }
    ],
    city: "Delhi",
    createdAt: ISODate("2026-09-14T14:30:00Z")
  },
  {
    orderNo: "ORD1015",
    customerId: 107,
    customerName: "Ananya Das",
    amount: 4200,
    status: "cancelled",
    category: "Electronics",
    items: [
      { name: "Tablet", quantity: 1, price: 4200 }
    ],
    city: "Kanpur",
    createdAt: ISODate("2026-09-15T11:20:00Z")
  },
  {
    orderNo: "ORD1016",
    customerId: 102,
    customerName: "Priya Verma",
    amount: 700,
    status: "pending",
    category: "Fashion",
    items: [
      { name: "Cap", quantity: 2, price: 350 }
    ],
    city: "Noida",
    createdAt: ISODate("2026-09-16T08:45:00Z")
  },
  {
    orderNo: "ORD1017",
    customerId: 103,
    customerName: "Rohan Gupta",
    amount: 1600,
    status: "delivered",
    category: "Books",
    items: [
      { name: "Networking Book", quantity: 2, price: 800 }
    ],
    city: "Ghaziabad",
    createdAt: ISODate("2026-09-17T13:00:00Z")
  },
  {
    orderNo: "ORD1018",
    customerId: 104,
    customerName: "Sneha Singh",
    amount: 2800,
    status: "pending",
    category: "Electronics",
    items: [
      { name: "Router", quantity: 1, price: 2800 }
    ],
    city: "Lucknow",
    createdAt: ISODate("2026-09-18T10:15:00Z")
  },
  {
    orderNo: "ORD1019",
    customerId: 105,
    customerName: "Vikram Patel",
    amount: 950,
    status: "delivered",
    category: "Fashion",
    items: [
      { name: "Wallet", quantity: 1, price: 950 }
    ],
    city: "Jaipur",
    createdAt: ISODate("2026-09-19T15:45:00Z")
  },
  {
    orderNo: "ORD1020",
    customerId: 101,
    customerName: "Aarav Sharma",
    amount: 6500,
    status: "delivered",
    category: "Electronics",
    items: [
      { name: "Laptop", quantity: 1, price: 6500 }
    ],
    city: "Delhi",
    createdAt: ISODate("2026-09-20T17:00:00Z")
  }
]);