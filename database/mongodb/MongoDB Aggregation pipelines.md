# MongoDB Aggregation Pipeline --- Practical Course (Part 1)

We will learn aggregation step by step using `mongosh` first, then  
connect it to Node.js, Express.js, and Mongoose. This first part covers  
the database setup, aggregation syntax, and five stages: $match,  
$project, $group, $sort, and $limit.

## Course roadmap

1. **Part 1:** Foundation, sample database, $match, $project,  
    $group, $sort, $limit.
2. **Part 2:** $skip, pagination, $unwind, and arrays.
3. **Part 3:** $lookup, $addFields, $set, $count, $unset,  
    $replaceRoot, $replaceWith.
4. **Part 4:** $facet, $cond, $expr, $sample.
5. **Part 5:** Combined pipelines and Express/Mongoose integration.

# 1. What is MongoDB Aggregation?

Aggregation processes documents to calculate meaningful results. For  
example, a backend may need to calculate delivered orders, revenue per  
customer, average order value, or the top five customers by spending.

Think of an aggregation pipeline as an assembly line:

1. Filter documents.
2. Group them and calculate values.
3. Sort the results.
4. Limit the result count.
5. Shape the output.

Requirement Typical approach

---

Get one user by email `findOne()`  
Get all active users `find()`  
Update a user's status `updateOne()`  
Count delivered orders `countDocuments()` or aggregation  
Calculate revenue by customer `aggregate()`  
Find top five customers by spending `aggregate()`  
Join orders with customer details `aggregate()` with $lookup

Aggregation normally processes data without changing the original  
collection. $out and $merge are exceptions because they can write  
aggregation results to a collection.

# 2. Build the practice database

We will use the `aggregationDemo` database and a realistic `orders`  
collection with 20 documents.

**Safety note:** `use aggregationDemo` switches databases; it does not  
delete an existing database. `insertMany()` adds documents and does not  
clear the collection. If you rerun the insertion command, you will add  
duplicate sample orders with new `_id` values. Inspect existing data  
before rerunning.

## 2.1 Create and populate `orders`

Run the following in `mongosh`:

```
use aggregationDemo

db.orders.insertMany([
  {
    orderNo: "ORD1001", customerId: 101, customerName: "Aarav Sharma",
    amount: 2500, status: "delivered", category: "Electronics",
    items: [
      { name: "Mouse", quantity: 1, price: 500 },
      { name: "Keyboard", quantity: 1, price: 2000 }
    ],
    city: "Delhi", createdAt: ISODate("2026-09-01T10:00:00Z")
  },
  {
    orderNo: "ORD1002", customerId: 102, customerName: "Priya Verma",
    amount: 1200, status: "delivered", category: "Fashion",
    items: [{ name: "T-Shirt", quantity: 2, price: 600 }],
    city: "Noida", createdAt: ISODate("2026-09-02T11:00:00Z")
  },
  {
    orderNo: "ORD1003", customerId: 103, customerName: "Rohan Gupta",
    amount: 5000, status: "shipped", category: "Electronics",
    items: [{ name: "Monitor", quantity: 1, price: 5000 }],
    city: "Ghaziabad", createdAt: ISODate("2026-09-03T12:00:00Z")
  },
  {
    orderNo: "ORD1004", customerId: 101, customerName: "Aarav Sharma",
    amount: 800, status: "pending", category: "Books",
    items: [{ name: "DBMS Book", quantity: 1, price: 800 }],
    city: "Delhi", createdAt: ISODate("2026-09-04T09:30:00Z")
  },
  {
    orderNo: "ORD1005", customerId: 104, customerName: "Sneha Singh",
    amount: 3200, status: "delivered", category: "Electronics",
    items: [{ name: "Headphones", quantity: 1, price: 3200 }],
    city: "Lucknow", createdAt: ISODate("2026-09-05T13:15:00Z")
  },
  {
    orderNo: "ORD1006", customerId: 105, customerName: "Vikram Patel",
    amount: 1500, status: "cancelled", category: "Fashion",
    items: [{ name: "Shoes", quantity: 1, price: 1500 }],
    city: "Jaipur", createdAt: ISODate("2026-09-06T14:00:00Z")
  },
  {
    orderNo: "ORD1007", customerId: 102, customerName: "Priya Verma",
    amount: 2700, status: "delivered", category: "Electronics",
    items: [{ name: "SSD", quantity: 1, price: 2700 }],
    city: "Noida", createdAt: ISODate("2026-09-07T10:45:00Z")
  },
  {
    orderNo: "ORD1008", customerId: 106, customerName: "Karan Mehta",
    amount: 600, status: "pending", category: "Books",
    items: [{ name: "Java Book", quantity: 1, price: 600 }],
    city: "Delhi", createdAt: ISODate("2026-09-08T15:20:00Z")
  },
  {
    orderNo: "ORD1009", customerId: 103, customerName: "Rohan Gupta",
    amount: 4500, status: "delivered", category: "Electronics",
    items: [{ name: "Graphics Tablet", quantity: 1, price: 4500 }],
    city: "Ghaziabad", createdAt: ISODate("2026-09-09T08:00:00Z")
  },
  {
    orderNo: "ORD1010", customerId: 107, customerName: "Ananya Das",
    amount: 900, status: "shipped", category: "Fashion",
    items: [{ name: "Jeans", quantity: 1, price: 900 }],
    city: "Kanpur", createdAt: ISODate("2026-09-10T16:10:00Z")
  },
  {
    orderNo: "ORD1011", customerId: 101, customerName: "Aarav Sharma",
    amount: 1800, status: "delivered", category: "Books",
    items: [{ name: "MongoDB Book", quantity: 2, price: 900 }],
    city: "Delhi", createdAt: ISODate("2026-09-11T10:30:00Z")
  },
  {
    orderNo: "ORD1012", customerId: 104, customerName: "Sneha Singh",
    amount: 2200, status: "shipped", category: "Fashion",
    items: [{ name: "Jacket", quantity: 1, price: 2200 }],
    city: "Lucknow", createdAt: ISODate("2026-09-12T12:40:00Z")
  },
  {
    orderNo: "ORD1013", customerId: 105, customerName: "Vikram Patel",
    amount: 3500, status: "delivered", category: "Electronics",
    items: [{ name: "Smartwatch", quantity: 1, price: 3500 }],
    city: "Jaipur", createdAt: ISODate("2026-09-13T09:00:00Z")
  },
  {
    orderNo: "ORD1014", customerId: 106, customerName: "Karan Mehta",
    amount: 1100, status: "delivered", category: "Books",
    items: [{ name: "OS Book", quantity: 1, price: 1100 }],
    city: "Delhi", createdAt: ISODate("2026-09-14T14:30:00Z")
  },
  {
    orderNo: "ORD1015", customerId: 107, customerName: "Ananya Das",
    amount: 4200, status: "cancelled", category: "Electronics",
    items: [{ name: "Tablet", quantity: 1, price: 4200 }],
    city: "Kanpur", createdAt: ISODate("2026-09-15T11:20:00Z")
  },
  {
    orderNo: "ORD1016", customerId: 102, customerName: "Priya Verma",
    amount: 700, status: "pending", category: "Fashion",
    items: [{ name: "Cap", quantity: 2, price: 350 }],
    city: "Noida", createdAt: ISODate("2026-09-16T08:45:00Z")
  },
  {
    orderNo: "ORD1017", customerId: 103, customerName: "Rohan Gupta",
    amount: 1600, status: "delivered", category: "Books",
    items: [{ name: "Networking Book", quantity: 2, price: 800 }],
    city: "Ghaziabad", createdAt: ISODate("2026-09-17T13:00:00Z")
  },
  {
    orderNo: "ORD1018", customerId: 104, customerName: "Sneha Singh",
    amount: 2800, status: "pending", category: "Electronics",
    items: [{ name: "Router", quantity: 1, price: 2800 }],
    city: "Lucknow", createdAt: ISODate("2026-09-18T10:15:00Z")
  },
  {
    orderNo: "ORD1019", customerId: 105, customerName: "Vikram Patel",
    amount: 950, status: "delivered", category: "Fashion",
    items: [{ name: "Wallet", quantity: 1, price: 950 }],
    city: "Jaipur", createdAt: ISODate("2026-09-19T15:45:00Z")
  },
  {
    orderNo: "ORD1020", customerId: 101, customerName: "Aarav Sharma",
    amount: 6500, status: "delivered", category: "Electronics",
    items: [{ name: "Laptop", quantity: 1, price: 6500 }],
    city: "Delhi", createdAt: ISODate("2026-09-20T17:00:00Z")
  }
]);
```

Verify the collection:

```
db.orders.countDocuments()
db.orders.find().limit(3)
```

On a fresh collection, `countDocuments()` returns `20`.

Each document has: - Identity fields: `orderNo`, `customerId`,  
`customerName`. - Numeric field: `amount`. - Classification fields:  
`status`, `category`, `city`. - Array field: `items`. - Date field:  
`createdAt`, stored as a BSON Date.

Repeated `customerId` values let us group a customer's orders. Numeric  
amounts support arithmetic accumulators. The array will be useful when  
learning $unwind.

# 3. Aggregation syntax: five basic examples

General syntax:

```
db.orders.aggregate([
  { stage1: { /* configuration */ } },
  { stage2: { /* configuration */ } },
  { stage3: { /* configuration */ } }
]);
```

- `db.orders` selects the collection.
- `.aggregate()` starts an aggregation.
- `[...]` is an ordered array of pipeline stages.
- Each stage is an object with a stage operator such as $match or  
    $sort.

## Example 1: Empty pipeline

```
db.orders.aggregate([]);
```

All 20 documents pass through unchanged.

## Example 2: Filter

```
db.orders.aggregate([
  { $match: { status: "delivered" } }
]);
```

Expected count: 11 documents.

## Example 3: Select fields

```
db.orders.aggregate([
  { $project: { _id: 0, orderNo: 1, amount: 1 } }
]);
```

The first output document is:

```
{ orderNo: "ORD1001", amount: 2500 }
```

`1` includes a field, while `_id: 0` excludes the identifier.

## Example 4: Chain two stages

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $project: { _id: 0, orderNo: 1, amount: 1 } }
]);
```

The pipeline filters first and then shapes the 11 matching documents.

## Example 5: Filter, sort, limit, and project

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $sort: { amount: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, orderNo: 1, customerName: 1, amount: 1 } }
]);
```

Expected output:

```
[
  { orderNo: "ORD1020", customerName: "Aarav Sharma", amount: 6500 },
  { orderNo: "ORD1009", customerName: "Rohan Gupta", amount: 4500 },
  { orderNo: "ORD1013", customerName: "Vikram Patel", amount: 3500 }
]
```

This illustrates a common analytics pattern: filter → sort → limit →  
shape.

# 4. Stage 1 --- $match

## What it does

$match filters documents based on a condition. It resembles the filter  
object used in `find()`. It does not delete documents; it determines  
which documents continue through the pipeline.

Hinglish: collection mein 20 documents hain aur sirf delivered orders  
chahiye, toh $match baaki documents ko pipeline se bahar kar dega.

### General syntax

```
{ $match: { fieldName: value } }
```

It supports query operators such as $gt, $gte, $lt, $lte, $in,  
$ne, $and, and $or.

## Example A: Match a status

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $project: { _id: 0, orderNo: 1, customerName: 1, status: 1 } }
]);
```

The result contains 11 documents. The first two are:

```
[
  { orderNo: "ORD1001", customerName: "Aarav Sharma", status: "delivered" },
  { orderNo: "ORD1002", customerName: "Priya Verma", status: "delivered" }
]
```

`status: "delivered"` is an exact equality condition. $project  
controls the output fields.

## Example B: Numeric comparison

Find orders with amount greater than ₹2,000:

```
db.orders.aggregate([
  { $match: { amount: { $gt: 2000 } } },
  { $sort: { amount: -1 } },
  { $project: { _id: 0, orderNo: 1, amount: 1 } }
]);
```

Expected output:

```
[
  { orderNo: "ORD1020", amount: 6500 },
  { orderNo: "ORD1003", amount: 5000 },
  { orderNo: "ORD1009", amount: 4500 },
  { orderNo: "ORD1015", amount: 4200 },
  { orderNo: "ORD1013", amount: 3500 },
  { orderNo: "ORD1005", amount: 3200 },
  { orderNo: "ORD1018", amount: 2800 },
  { orderNo: "ORD1007", amount: 2700 },
  { orderNo: "ORD1001", amount: 2500 },
  { orderNo: "ORD1012", amount: 2200 }
]
```

There are 10 matching orders. $gt means strictly greater than, so an  
amount equal to 2,000 would not match.

Operator Meaning

---

$gt Greater than  
$gte Greater than or equal to  
$lt Less than  
$lte Less than or equal to  
$eq Equal to  
$ne Not equal to  
$in Matches any value in an array  
$nin Does not match any value in an array

## Example C: Multiple conditions

Find delivered orders worth at least ₹2,000:

```
db.orders.aggregate([
  {
    $match: {
      status: "delivered",
      amount: { $gte: 2000 }
    }
  },
  {
    $project: {
      _id: 0,
      orderNo: 1,
      customerName: 1,
      amount: 1
    }
  }
]);
```

Expected output:

```
[
  { orderNo: "ORD1001", customerName: "Aarav Sharma", amount: 2500 },
  { orderNo: "ORD1005", customerName: "Sneha Singh", amount: 3200 },
  { orderNo: "ORD1007", customerName: "Priya Verma", amount: 2700 },
  { orderNo: "ORD1009", customerName: "Rohan Gupta", amount: 4500 },
  { orderNo: "ORD1013", customerName: "Vikram Patel", amount: 3500 },
  { orderNo: "ORD1020", customerName: "Aarav Sharma", amount: 6500 }
]
```

Conditions in the same filter object are combined with logical AND.

## Example D: Match several values

```
db.orders.aggregate([
  { $match: { status: { $in: ["pending", "shipped"] } } },
  { $project: { _id: 0, orderNo: 1, status: 1, amount: 1 } }
]);
```

Expected count: 7 documents --- 4 pending and 3 shipped. $in matches  
any value in the supplied array.

## Example E: Use $or

Find orders from Delhi or with an amount above ₹4,000:

```
db.orders.aggregate([
  {
    $match: {
      $or: [
        { city: "Delhi" },
        { amount: { $gt: 4000 } }
      ]
    }
  },
  { $project: { _id: 0, orderNo: 1, city: 1, amount: 1 } }
]);
```

Expected count: 10 documents. A document matching both conditions is  
still returned only once by this $match.

## Backend use case

A `GET /api/orders?status=delivered` endpoint can filter records using  
an aggregation pipeline:

```
const orders = await Order.aggregate([
  { $match: { status: "delivered" } }
]);

res.status(200).json({
  success: true,
  count: orders.length,
  data: orders
});
```

In a real API, validate allowed status values and enforce authorization  
where needed. Never assume a client-supplied filter is trustworthy.

## Five practice questions --- $match

1. Return every order whose status is `cancelled`.
2. Find orders with amount less than ₹1,500.
3. Find delivered orders with amount greater than ₹2,000.
4. Find orders belonging to Delhi or Noida.
5. Find orders whose status is pending or cancelled and whose amount is  
    at least ₹700.

# 5. Stage 2 --- $project

## What it does

$project determines the shape of documents passed to the next stage.  
It can include fields, exclude fields, rename fields, calculate values,  
and create nested output structures.

### General syntax

```
{
  $project: {
    fieldA: 1,
    fieldB: 0,
    newField: "$existingField"
  }
}
```

- `1` includes a field.
- `0` excludes a field.
- `"$existingField"` references the value of an existing field.
- An expression can calculate a new field.

In a normal $project, inclusion and exclusion specifications generally  
cannot be mixed, except for excluding `_id`. Inclusion can be combined  
with computed or renamed fields.

## Example A: Include selected fields

```
db.orders.aggregate([
  { $project: { _id: 0, orderNo: 1, customerName: 1, amount: 1 } }
]);
```

First output document:

```
{ orderNo: "ORD1001", customerName: "Aarav Sharma", amount: 2500 }
```

Other fields are excluded from the output. The stored document is  
unchanged.

## Example B: Exclude fields

```
db.orders.aggregate([
  { $project: { items: 0, createdAt: 0 } }
]);
```

All other fields remain in the pipeline output, including `_id`. Do not  
add unrelated inclusion fields such as `amount: 1` to this exclusion  
projection.

## Example C: Rename fields

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: "$orderNo",
      customer: "$customerName",
      totalAmount: "$amount"
    }
  }
]);
```

Expected first document:

```
{ orderId: "ORD1001", customer: "Aarav Sharma", totalAmount: 2500 }
```

The dollar prefix reads a field value; it does not produce the literal  
text `"orderNo"`.

## Example D: Calculate a new field

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderNo: 1,
      amount: 1,
      discount: { $multiply: ["$amount", 0.10] },
      discountedAmount: { $multiply: ["$amount", 0.90] }
    }
  }
]);
```

Expected first document:

```
{
  orderNo: "ORD1001",
  amount: 2500,
  discount: 250,
  discountedAmount: 2250
}
```

$multiply multiplies the values in its array. The example calculates a  
10% discount and the remaining 90% of the original amount. A real  
checkout system must apply actual discount rules and currency-rounding  
requirements.

## Example E: Create nested output

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderNo: 1,
      customer: {
        name: "$customerName",
        city: "$city"
      },
      payment: {
        amount: "$amount",
        currency: { $literal: "INR" }
      }
    }
  }
]);
```

Expected first document:

```
{
  orderNo: "ORD1001",
  customer: { name: "Aarav Sharma", city: "Delhi" },
  payment: { amount: 2500, currency: "INR" }
}
```

$literal treats `"INR"` as a literal value rather than an expression  
or field reference.

## Backend use case

```
const orders = await Order.aggregate([
  { $match: { status: "delivered" } },
  {
    $project: {
      _id: 0,
      orderNo: 1,
      customer: "$customerName",
      total: "$amount",
      category: 1
    }
  }
]);

res.status(200).json({ success: true, data: orders });
```

The API can expose `total` without storing a second field named `total`  
in the original document.

## Five practice questions --- $project

1. Return only `orderNo` and `amount`, excluding `_id`.
2. Rename `customerName` to `customer` and `amount` to `total`.
3. Return `orderNo`, `amount`, and a calculated 5% discount.
4. Return `orderNo` and a nested `customer` object containing `name`  
    and `city`.
5. Exclude `items` and `createdAt` while preserving all other fields in  
    the pipeline output.

# 6. Stage 3 --- $group

## What it does

$group combines documents that share a grouping key and calculates a  
result for each group. It is central to reports such as revenue per  
customer, order counts by status, and average order amount by category.

### General syntax

```
{
  $group: {
    _id: "$fieldName",
    resultField1: { $sum: 1 },
    resultField2: { $avg: "$amount" }
  }
}
```

**Important:** `_id` is the grouping key inside $group. It is not  
necessarily the original document's `_id`.

- `_id: "$customerId"` creates one group per distinct customer ID.
- `$sum: "$amount"` adds the numeric amount values.
- `$sum: 1` counts documents because each document contributes one.

## Example A: Count orders by status

```
db.orders.aggregate([
  { $group: { _id: "$status", totalOrders: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);
```

Expected output:

```
[
  { _id: "cancelled", totalOrders: 2 },
  { _id: "delivered", totalOrders: 11 },
  { _id: "pending", totalOrders: 4 },
  { _id: "shipped", totalOrders: 3 }
]
```

The 20 input documents become four grouped documents, one per status.

## Example B: Total spending per customer

```
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      customerName: { $first: "$customerName" },
      totalSpending: { $sum: "$amount" }
    }
  },
  { $sort: { _id: 1 } }
]);
```

Expected output:

```
[
  { _id: 101, customerName: "Aarav Sharma", totalSpending: 11600 },
  { _id: 102, customerName: "Priya Verma", totalSpending: 4600 },
  { _id: 103, customerName: "Rohan Gupta", totalSpending: 11100 },
  { _id: 104, customerName: "Sneha Singh", totalSpending: 8200 },
  { _id: 105, customerName: "Vikram Patel", totalSpending: 5950 },
  { _id: 106, customerName: "Karan Mehta", totalSpending: 1700 },
  { _id: 107, customerName: "Ananya Das", totalSpending: 5100 }
]
```

Customer 101 has four orders: ₹2,500 + ₹800 + ₹1,800 + ₹6,500 = ₹11,600.

$first returns the first value encountered for that field within the  
group. It is consistent here because each customer ID has the same name  
across documents. If the selected first value matters, use a  
deterministic $sort before $group.

## Example C: Count, sum, average, maximum, and minimum

```
db.orders.aggregate([
  {
    $group: {
      _id: "$category",
      orderCount: { $sum: 1 },
      totalAmount: { $sum: "$amount" },
      averageAmount: { $avg: "$amount" },
      highestAmount: { $max: "$amount" },
      lowestAmount: { $min: "$amount" }
    }
  },
  { $sort: { _id: 1 } }
]);
```

Expected output:

```
[
  {
    _id: "Books", orderCount: 5, totalAmount: 5900,
    averageAmount: 1180, highestAmount: 1800, lowestAmount: 600
  },
  {
    _id: "Electronics", orderCount: 9, totalAmount: 30400,
    averageAmount: 3377.777777777778, highestAmount: 6500, lowestAmount: 2500
  },
  {
    _id: "Fashion", orderCount: 6, totalAmount: 10450,
    averageAmount: 1741.6666666666667, highestAmount: 3200, lowestAmount: 700
  }
]
```

These calculations include all statuses, including cancelled and pending  
orders. For delivered-only revenue, place $match before $group.

Accumulator Meaning

---

`$sum: 1` Count documents in the group  
`$sum: "$amount"` Add amount values  
`$avg: "$amount"` Calculate average amount  
`$max: "$amount"` Highest amount  
`$min: "$amount"` Lowest amount

## Example D: $push and $addToSet

```
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      customerName: { $first: "$customerName" },
      orderNumbers: { $push: "$orderNo" },
      categories: { $addToSet: "$category" }
    }
  },
  { $match: { _id: 101 } }
]);
```

Expected output:

```
[
  {
    _id: 101,
    customerName: "Aarav Sharma",
    orderNumbers: ["ORD1001", "ORD1004", "ORD1011", "ORD1020"],
    categories: ["Electronics", "Books"]
  }
]
```

- $push collects values and retains duplicates.
- $addToSet collects distinct values.

The order of collected values is not guaranteed unless you establish  
input order before grouping. $addToSet does not promise a particular  
order for its resulting array.

## Example E: $first and $last

```
db.orders.aggregate([
  { $sort: { createdAt: 1, orderNo: 1 } },
  {
    $group: {
      _id: "$customerId",
      customerName: { $first: "$customerName" },
      firstOrderDate: { $first: "$createdAt" },
      lastOrderDate: { $last: "$createdAt" },
      firstOrderAmount: { $first: "$amount" },
      lastOrderAmount: { $last: "$amount" }
    }
  },
  { $sort: { _id: 1 } }
]);
```

For customer 101:

```
{
  _id: 101,
  customerName: "Aarav Sharma",
  firstOrderDate: ISODate("2026-09-01T10:00:00Z"),
  lastOrderDate: ISODate("2026-09-20T17:00:00Z"),
  firstOrderAmount: 2500,
  lastOrderAmount: 6500
}
```

$first and $last refer to the first and last documents received by  
the group. The preceding $sort establishes which documents those are.

## Group by multiple fields

```
db.orders.aggregate([
  {
    $group: {
      _id: { customerId: "$customerId", status: "$status" },
      orderCount: { $sum: 1 },
      totalAmount: { $sum: "$amount" }
    }
  },
  {
    $sort: {
      "_id.customerId": 1,
      "_id.status": 1
    }
  }
]);
```

This creates a group for every distinct combination of customer ID and  
status. For customer 101, the result includes:

```
[
  {
    _id: { customerId: 101, status: "delivered" },
    orderCount: 3,
    totalAmount: 10800
  },
  {
    _id: { customerId: 101, status: "pending" },
    orderCount: 1,
    totalAmount: 800
  }
]
```

This pattern supports reports such as revenue by city and category,  
orders by customer and status, or sales by month and product.

## Backend use case: customer spending report

```
const report = await Order.aggregate([
  { $match: { status: "delivered" } },
  {
    $group: {
      _id: "$customerId",
      customerName: { $first: "$customerName" },
      orderCount: { $sum: 1 },
      totalSpending: { $sum: "$amount" },
      averageOrderAmount: { $avg: "$amount" }
    }
  },
  { $sort: { totalSpending: -1 } }
]);

res.status(200).json({ success: true, data: report });
```

The filter must precede the group because the report should exclude  
pending, shipped, and cancelled orders before calculating spending.

## Five practice questions --- $group

1. Count orders separately for every status.
2. Calculate the total amount for each category.
3. Group by `customerId` and calculate order count, total spending, and  
    average order amount.
4. For each category, return its highest and lowest order amount.
5. For each customer, collect `orderNo` values using $push and unique  
    category values using $addToSet.

# 7. Stage 4 --- $sort

## What it does

$sort orders documents by one or more fields. It does not calculate  
totals or remove documents.

### General syntax

```
{ $sort: { fieldName: 1 } }
```

- `1` means ascending order.
- `-1` means descending order.

String ordering follows MongoDB's comparison rules. Locale-specific  
ordering can be configured using collation.

## Example A: Sort amounts ascending

```
db.orders.aggregate([
  { $sort: { amount: 1 } },
  { $project: { _id: 0, orderNo: 1, amount: 1 } }
]);
```

Expected first five documents:

```
[
  { orderNo: "ORD1008", amount: 600 },
  { orderNo: "ORD1016", amount: 700 },
  { orderNo: "ORD1004", amount: 800 },
  { orderNo: "ORD1010", amount: 900 },
  { orderNo: "ORD1019", amount: 950 }
]
```

## Example B: Sort amounts descending

```
db.orders.aggregate([
  { $sort: { amount: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, orderNo: 1, customerName: 1, amount: 1 } }
]);
```

Expected output:

```
[
  { orderNo: "ORD1020", customerName: "Aarav Sharma", amount: 6500 },
  { orderNo: "ORD1003", customerName: "Rohan Gupta", amount: 5000 },
  { orderNo: "ORD1009", customerName: "Rohan Gupta", amount: 4500 },
  { orderNo: "ORD1015", customerName: "Ananya Das", amount: 4200 },
  { orderNo: "ORD1013", customerName: "Vikram Patel", amount: 3500 }
]
```

## Example C: Sort by multiple fields

```
db.orders.aggregate([
  { $sort: { amount: -1, orderNo: 1 } },
  { $project: { _id: 0, orderNo: 1, amount: 1 } }
]);
```

Amount is the primary sort key. `orderNo` ascending breaks ties.

## Example D: Sort after grouping

```
db.orders.aggregate([
  { $group: { _id: "$customerId", totalSpending: { $sum: "$amount" } } },
  { $sort: { totalSpending: -1, _id: 1 } }
]);
```

This sorts grouped customer results, not individual orders.

## Example E: Stable ordering for pagination

```
db.orders.aggregate([
  { $sort: { createdAt: -1, _id: 1 } },
  { $skip: 5 },
  { $limit: 5 }
]);
```

The unique `_id` tie-breaker helps make the ordering deterministic when  
timestamps are equal. Concurrent changes can still shift offset-based  
pages; cursor-based pagination can be more reliable for frequently  
changing datasets.

## Backend use case: newest delivered orders

```
const orders = await Order.aggregate([
  { $match: { status: "delivered" } },
  { $sort: { createdAt: -1, _id: 1 } },
  { $limit: 20 }
]);

res.status(200).json({
  success: true,
  count: orders.length,
  data: orders
});
```

This returns up to 20 delivered orders in newest-first order.

## Five practice questions --- $sort

1. Sort all orders from lowest amount to highest amount.
2. Sort all orders from newest to oldest.
3. Sort by category ascending and amount descending.
4. Sort customer spending totals from highest to lowest after grouping.
5. Sort by `createdAt` descending, using `orderNo` ascending to break  
    ties.

# 8. Stage 5 --- $limit

## What it does

$limit restricts how many documents pass to the next stage. It is  
useful for top-N queries, previews, and API result limits.

### General syntax

```
{ $limit: 5 }
```

The limit must be a positive integer.

## Example A: Return five documents

```
db.orders.aggregate([
  { $limit: 5 },
  { $project: { _id: 0, orderNo: 1, amount: 1 } }
]);
```

This returns five documents from the input stream. Without $sort, do  
not assume they are the newest, oldest, or highest-priced.

## Example B: Five highest-value orders

```
db.orders.aggregate([
  { $sort: { amount: -1, _id: 1 } },
  { $limit: 5 },
  { $project: { _id: 0, orderNo: 1, amount: 1 } }
]);
```

Expected output:

```
[
  { orderNo: "ORD1020", amount: 6500 },
  { orderNo: "ORD1003", amount: 5000 },
  { orderNo: "ORD1009", amount: 4500 },
  { orderNo: "ORD1015", amount: 4200 },
  { orderNo: "ORD1013", amount: 3500 }
]
```

## Example C: Top three delivered orders

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $sort: { amount: -1, _id: 1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 0,
      orderNo: 1,
      customerName: 1,
      amount: 1
    }
  }
]);
```

Expected output:

```
[
  { orderNo: "ORD1020", customerName: "Aarav Sharma", amount: 6500 },
  { orderNo: "ORD1009", customerName: "Rohan Gupta", amount: 4500 },
  { orderNo: "ORD1013", customerName: "Vikram Patel", amount: 3500 }
]
```

## Example D: Limit after grouping

```
db.orders.aggregate([
  { $group: { _id: "$customerId", totalSpending: { $sum: "$amount" } } },
  { $sort: { totalSpending: -1, _id: 1 } },
  { $limit: 3 }
]);
```

Expected output:

```
[
  { _id: 101, totalSpending: 11600 },
  { _id: 103, totalSpending: 11100 },
  { _id: 104, totalSpending: 8200 }
]
```

This returns three customer groups, not three orders.

## Example E: Why stage ordering matters

Pipeline A:

```
db.orders.aggregate([
  { $sort: { amount: -1 } },
  { $limit: 3 }
]);
```

Pipeline B:

```
db.orders.aggregate([
  { $limit: 3 },
  { $sort: { amount: -1 } }
]);
```

Pipeline A finds the three largest orders across the collection.  
Pipeline B first selects three input documents and sorts only those. It  
cannot generally find the largest three orders across the entire  
collection.

For top-N queries, put $sort before $limit. MongoDB may optimize  
compatible sort-and-limit stages internally without changing their  
logical meaning.

## Backend use case: customer leaderboard

```
const topCustomers = await Order.aggregate([
  { $match: { status: "delivered" } },
  {
    $group: {
      _id: "$customerId",
      customerName: { $first: "$customerName" },
      totalSpending: { $sum: "$amount" }
    }
  },
  { $sort: { totalSpending: -1, _id: 1 } },
  { $limit: 5 }
]);

res.status(200).json({ success: true, data: topCustomers });
```

This filters valid orders, groups by customer, calculates spending,  
sorts the leaderboard, and returns only the top five customers.

## Five practice questions --- $limit

1. Return any five documents from the orders collection.
2. Find the three highest-value orders across all statuses.
3. Find the five most recent delivered orders.
4. Group orders by `customerId`, sort by total amount, and return the  
    top four customers.
5. Explain why placing $limit before $sort does not generally solve  
    a top-N query.

# 9. Understand pipeline execution order

Consider the following pipeline:

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  {
    $group: {
      _id: "$customerId",
      totalSpending: { $sum: "$amount" }
    }
  },
  { $sort: { totalSpending: -1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 0,
      customerId: "$_id",
      totalSpending: 1
    }
  }
]);
```

Conceptual flow:

1. $match: 20 orders → 11 delivered orders.
2. $group: 11 orders → 7 customer groups.
3. $sort: highest spending first.
4. $limit: retain the top 3 customers.
5. $project: rename and shape the output.

After $group, original order fields are not automatically available.  
The grouped document contains `_id` and the fields explicitly created by  
the group. Here the original customer ID is held in `_id`, so the final  
projection maps it to `customerId: "$_id"`.

## Revision table

Stage Main purpose Example

---

$match Filter documents Delivered orders only  
$project Shape output Select and rename fields  
$group Aggregate by key Total spending per customer  
$sort Order documents Highest spending first  
$limit Restrict result count Top five customers

# 10. Recommended learning sequence

1. Practise the five stages in this lesson using  
    `aggregationDemo.orders`.
2. Learn $skip and pagination, then $unwind for arrays.
3. Learn $lookup for joins, then $addFields, $set, $count,  
    $unset, $replaceRoot, and $replaceWith.
4. Learn $facet, $cond, $expr, and $sample.
5. Build combined pipelines in Mongoose controllers and test the  
    endpoints.

The operators covered here are a starting set, not every aggregation  
operator MongoDB provides. Next, continue with $skip and pagination,  
followed by $unwind and arrays.