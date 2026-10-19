# MongoDB Aggregation Pipeline — Part 2

In Part 1, we covered the first five stages: `$match`, `$project`, `$group`, `$sort`, and `$limit`.

Now we’ll continue with `$skip`, `$unwind`, `$lookup`, `$addFields` / `$set`, and `$count`. These are especially useful when building real backend APIs such as product listings, order history, dashboards, and admin panels.

We’ll continue using the same `aggregationDemo` database and `orders` collection. Run the commands in mongosh.

## 1. `$skip` — Skip documents

Purpose: `$skip` skips a specified number of documents in the pipeline.

Syntax:

```
{ $skip: number }
```

For example, imagine your API returns 10 orders per page. To fetch page 2, you skip the first 10 orders.

```
use aggregationDemo

db.orders.aggregate([
  { $sort: { orderDate: -1, _id: 1 } },
  { $skip: 5 },
  { $limit: 5 }
])
```

### How it works

1. `$sort` arranges orders by the newest date first.
    
2. `_id: 1` provides a consistent tie-breaker when dates are equal.
    
3. `$skip: 5` ignores the first five results.
    
4. `$limit: 5` returns the next five results.
    

Backend use case: Pagination for an order-history API.

```
const page = 2;
const limit = 5;
const skip = (page - 1) * limit;

const orders = await Order.aggregate([
  { $sort: { orderDate: -1, _id: 1 } },
  { $skip: skip },
  { $limit: limit }
]);
```

Here, `Order` represents your Mongoose model. We’ll cover Mongoose aggregation in a later part.

Important: `$skip` is commonly used with `$sort` and `$limit`. For very large collections, cursor-based pagination can be more efficient than skipping many documents.

### Practice — `$skip`

Try these in mongosh:

1. Display all orders after skipping the first 3 documents.
    
2. Sort orders by `amount` in descending order, then skip 5.
    
3. Return 5 orders after skipping the first 10, sorted by `amount` ascending.
    
4. Find delivered orders, sort them by `orderDate` descending, skip 2, and return 3.
    
5. For page 4 with a page size of 5, calculate the value of `$skip`.
    

## 2. `$unwind` — Break an array into separate documents

Purpose: `$unwind` converts each element of an array into a separate output document.

Suppose an order contains three products inside its `items` array. Without `$unwind`, the products stay inside one order document. With `$unwind`, MongoDB produces one document for each product.

### Syntax

```
{
  $unwind: "$arrayField"
}
```

The `$` before `items` means that MongoDB should read the value of the `items` field.

### Example 1: Unwind an order's items

```
db.orders.aggregate([
  { $match: { orderId: "ORD1001" } },
  { $unwind: "$items" }
])
```

A simplified example input document:

```
{
  orderId: "ORD1001",
  customerId: 101,
  items: [
    { name: "Keyboard", price: 2500, quantity: 1 },
    { name: "Mouse", price: 1000, quantity: 2 }
  ]
}
```

Expected output, simplified:

```
{
  orderId: "ORD1001",
  customerId: 101,
  items: { name: "Keyboard", price: 2500, quantity: 1 }
}
{
  orderId: "ORD1001",
  customerId: 101,
  items: { name: "Mouse", price: 1000, quantity: 2 }
}
```

Notice that the original array is no longer an array in each output document. Each document contains one `items` object.

The example products above illustrate the transformation; your actual output depends on the products stored in `ORD1001`.

### Example 2: Calculate revenue for each product line

```
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $project: {
      _id: 0,
      orderId: 1,
      productName: "$items.name",
      quantity: "$items.quantity",
      price: "$items.price",
      lineRevenue: {
        $multiply: ["$items.price", "$items.quantity"]
      }
    }
  }
])
```

New operator: `$multiply`

```
{ $multiply: [value1, value2] }
```

It multiplies numeric values. For example, if a product costs ₹1,000 and the quantity is 2, the line revenue is ₹2,000.

Why is `$unwind` needed here? Because you want revenue calculated for each individual product line, not just for the entire order.

### Example 3: Count how many times each product appears

```
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.name",
      timesAppeared: { $sum: 1 }
    }
  },
  { $sort: { timesAppeared: -1 } }
])
```

This counts how many order-item entries contain each product name. It does not count the total quantity purchased; for that, sum `$items.quantity` instead.

### A useful option: `preserveNullAndEmptyArrays`

By default, `$unwind` omits documents whose array is missing, null, or empty. You can preserve them:

```
{
  $unwind: {
    path: "$items",
    preserveNullAndEmptyArrays: true
  }
}
```

Use this when you need to retain orders even when they have no items.

Backend use cases

- Product-wise sales reports.
    
- Total quantity sold per product.
    
- Category-wise revenue reports.
    
- Analyzing individual items within each order.
    

### Practice — `$unwind`

1. Display each product entry for order `ORD1002`.
    
2. Show only `orderId` and product name after unwinding `items`.
    
3. Calculate each product line's revenue using price × quantity.
    
4. Find the total quantity sold for each product name.
    
5. Count the number of order-item entries per product and sort by count descending.
    

## 3. `$lookup` — Join two collections

Purpose: `$lookup` combines related information from another collection. It is similar in concept to a SQL `LEFT OUTER JOIN`.

Suppose your database has two collections:

- `orders`: contains orders and `customerId`.
    
- `customers`: contains customer names, emails, and cities.
    

An order might store only `customerId: 101`. Your API may need the customer's name and email too. `$lookup` can bring those fields into the result.

### Step 1: Create a customers collection

Run this setup once. It creates example customer records that match the IDs used in our order dataset.

```
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
```

If you have already inserted these records, don't rerun `insertMany()` unless you want duplicates. You can check using `db.customers.find()`.

### Syntax

```
{
  $lookup: {
    from: "customers",
    localField: "customerId",
    foreignField: "customerId",
    as: "customerDetails"
  }
}
```

|Field|Meaning|
|---|---|
|`from`|Collection to join with|
|`localField`|Matching field in the current collection|
|`foreignField`|Matching field in the other collection|
|`as`|Name of the output field that receives matching documents|

### Example 1: Attach customer details to orders

```
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerDetails"
    }
  }
])
```

Simplified output:

```
{
  orderId: "ORD1001",
  customerId: 101,
  customerDetails: [
    {
      customerId: 101,
      name: "Aman Sharma",
      email: "aman@example.com",
      city: "Delhi"
    }
  ]
}
```

The exact order fields and customer information depend on the stored documents.

Important: `$lookup` returns an array, even if only one customer matches.

### Example 2: Flatten customer details

If you want the customer's name directly in each output document, combine `$lookup` with `$unwind` and `$project`.

```
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerDetails"
    }
  },
  { $unwind: "$customerDetails" },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      status: 1,
      customerName: "$customerDetails.name",
      customerEmail: "$customerDetails.email"
    }
  }
])
```

The result contains fields such as:

```
{
  orderId: "ORD1001",
  amount: 3500,
  status: "delivered",
  customerName: "Aman Sharma",
  customerEmail: "aman@example.com"
}
```

The amount and status shown are illustrative; check your actual order record for its values.

### Example 3: Find orders belonging to customers in Delhi

```
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerDetails"
    }
  },
  { $unwind: "$customerDetails" },
  { $match: { "customerDetails.city": "Delhi" } },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      customerName: "$customerDetails.name",
      customerCity: "$customerDetails.city"
    }
  }
])
```

This demonstrates a common pattern: join → flatten → filter → select fields.

Backend use cases

- Show customer details on an order-history page.
    
- Create admin reports with customer and order information.
    
- Filter orders based on customer attributes.
    
- Build dashboards that combine related collections.
    

Performance note: For frequent joins, index the relevant join fields, especially on the foreign collection. In our example, consider an index on `customers.customerId`. Also, if you use ObjectId references in a real application, the matching fields must have compatible types.

### Practice — `$lookup`

1. Join `orders` with `customers`.
    
2. Display `orderId`, `amount`, and customer name.
    
3. Find all orders belonging to customers in Noida.
    
4. Show each customer's email alongside their order status.
    
5. Return only delivered orders, including their customer names.
    

## 4. `$addFields` and `$set` — Add or update fields

Purpose: These stages add new fields to documents or replace values of existing fields.

- `$addFields` adds computed fields while retaining existing fields.
    
- `$set` does the same thing and is an alias for `$addFields` in aggregation pipelines.
    

### Syntax

```
{
  $addFields: {
    newField: expression
  }
}
```

### Example 1: Add a tax field

Assume `amount` is the order amount and the example calculation uses a 5% tax rate.

```
db.orders.aggregate([
  {
    $addFields: {
      tax: { $multiply: ["$amount", 0.05] }
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      tax: 1
    }
  }
])
```

If an order has `amount: 2000`, the calculated `tax` is `100`.

This is only a demonstration of aggregation arithmetic, not a statement about the applicable tax rate for a real product.

### Example 2: Calculate total including tax

```
db.orders.aggregate([
  {
    $addFields: {
      tax: { $multiply: ["$amount", 0.05] }
    }
  },
  {
    $addFields: {
      totalWithTax: { $add: ["$amount", "$tax"] }
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      tax: 1,
      totalWithTax: 1
    }
  }
])
```

New operator: `$add`

```
{ $add: [value1, value2] }
```

It adds numeric values. Here it adds `amount` and `tax`.

You could also calculate `totalWithTax` in the same `$addFields` stage by writing the full expression directly. Using two stages makes the intermediate calculation easier to understand.

### Example 3: Add a high-value flag

```
db.orders.aggregate([
  {
    $addFields: {
      isHighValue: { $gt: ["$amount", 5000] }
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      isHighValue: 1
    }
  }
])
```

New operator: `$gt`

`$gt` means “greater than.” It returns `true` when the first value is greater than the second; otherwise it returns `false`.

For example, `amount: 6000` results in `isHighValue: true`.

### Example 4: Use `$set` to add a label

```
db.orders.aggregate([
  {
    $set: {
      statusLabel: "$status"
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      status: 1,
      statusLabel: 1
    }
  }
])
```

This creates a new `statusLabel` field containing the existing `status` value. `$set` here changes only the aggregation output; it does not permanently update the collection.

To permanently update stored documents, you would use an update operation such as `updateOne()` or `updateMany()` instead.

Backend use cases

- Calculate order totals and derived values.
    
- Mark orders as high-value for reporting.
    
- Add display-friendly fields for API responses.
    
- Compute metrics before grouping or sorting.
    

### Practice — `$addFields` / `$set`

1. Add a field named `doubleAmount` that is twice the order amount.
    
2. Add `isExpensive`, which is true when `amount` exceeds 3000.
    
3. Add a field called `deliveryMessage` containing the existing status value.
    
4. Calculate a 10% demonstration discount and a final amount after that discount.
    
5. Add a field called `orderSummary` that combines existing fields using an appropriate expression. Research `$concat` if needed.
    

## 5. `$count` — Count documents in a pipeline

Purpose: `$count` returns the number of documents that reach that stage.

### Syntax

```
{ $count: "fieldName" }
```

The string is the name of the output field containing the count.

### Example 1: Count all orders

```
db.orders.aggregate([
  { $count: "totalOrders" }
])
```

If your collection contains 20 documents, the output is:

```
{ totalOrders: 20 }
```

This is a single summary document, not 20 individual documents.

### Example 2: Count delivered orders

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $count: "deliveredOrders" }
])
```

The `$match` stage filters the documents first. `$count` then counts only the documents that remain.

If there are 11 delivered orders in your dataset, the output is:

```
{ deliveredOrders: 11 }
```

### Example 3: Count orders by city

For grouped counts, `$group` is more appropriate than `$count` because you want multiple counts, one for each city.

```
db.orders.aggregate([
  {
    $group: {
      _id: "$city",
      totalOrders: { $sum: 1 }
    }
  },
  { $sort: { totalOrders: -1 } }
])
```

Here, `$sum: 1` counts the number of documents in each city group.

### `$count` versus `$sum: 1`

|`$count`|`$sum: 1` inside `$group`|
|---|---|
|Counts all documents reaching that stage|Counts documents separately for each group|
|Produces one summary document when input is non-empty|Produces one output document per group|
|Useful for totals and filtered totals|Useful for city-wise, status-wise, or category-wise counts|

Important: If the pipeline has no documents left, `$count` produces no output document. It does not automatically return `{ totalOrders: 0 }`.

Backend use cases

- Total number of orders.
    
- Number of pending orders.
    
- Count of filtered search results.
    
- Admin dashboard metrics.
    

### Practice — `$count`

1. Count all orders.
    
2. Count only pending orders.
    
3. Count orders with `amount` greater than 3000.
    
4. Count orders from Delhi.
    
5. Count delivered orders after sorting by `orderDate` descending and limiting to 5. How does the stage order affect the answer?
    

## 6. Combine the stages into a practical pipeline

Now combine what you've learned to generate a simple report of product sales. This example assumes each item has `name`, `price`, and `quantity` fields.

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $unwind: "$items" },
  {
    $addFields: {
      lineRevenue: {
        $multiply: ["$items.price", "$items.quantity"]
      }
    }
  },
  {
    $group: {
      _id: "$items.name",
      totalQuantitySold: { $sum: "$items.quantity" },
      totalRevenue: { $sum: "$lineRevenue" }
    }
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      productName: "$_id",
      totalQuantitySold: 1,
      totalRevenue: 1
    }
  }
])
```

### Read it in order

1. `$match` selects delivered orders.
    
2. `$unwind` turns each item in each selected order into a separate document.
    
3. `$addFields` calculates each item's line revenue.
    
4. `$group` aggregates quantity and revenue by product name.
    
5. `$sort` ranks products by revenue, highest first.
    
6. `$limit` keeps the top five products.
    
7. `$project` formats the final response.
    

This is a realistic example of the kind of processing you might perform for an admin dashboard or sales analytics endpoint.

## Revision checklist

Part 2 progress

0 of 6

$skip — skip documents, commonly for pagination

$unwind — turn array elements into separate documents

$lookup — combine related collections

$addFields / $set — add computed fields to pipeline results

$count — count documents reaching a stage

Understand why stage order changes the result

Your task before Part 3: Try the 25 practice questions from these five sections in mongosh. Don't worry if some take time; the goal is to understand how documents change after each stage.

Next, we can cover `$skip` in deeper pagination patterns, `$unset`, `$replaceRoot` / `$replaceWith`, `$sample`, `$cond`, and `$expr`, with examples and practice questions.