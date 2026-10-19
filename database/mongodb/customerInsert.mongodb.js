
use("aggregationDemo")

db.customers.insertMany([
  {
    customerId: 101,
    name: "Aman Sharma",
    email: "aman@example.com",
    city: "Delhi"
  },
  {
    customerId: 102,
    name: "Priya Verma",
    email: "priya@example.com",
    city: "Noida"
  },
  {
    customerId: 103,
    name: "Rahul Singh",
    email: "rahul@example.com",
    city: "Lucknow"
  },
  {
    customerId: 104,
    name: "Neha Gupta",
    email: "neha@example.com",
    city: "Ghaziabad"
  },
  {
    customerId: 105,
    name: "Arjun Patel",
    email: "arjun@example.com",
    city: "Jaipur"
  },
  {
    customerId: 106,
    name: "Sneha Yadav",
    email: "sneha@example.com",
    city: "Delhi"
  },
  {
    customerId: 107,
    name: "Vikas Kumar",
    email: "vikas@example.com",
    city: "Kanpur"
  }
])