# MongoDB Aggregation Pipeline — Part 3

In Part 1, we learned the basic stages. In Part 2, we covered `$skip`, `$unwind`, `$lookup`, `$addFields` / `$set`, and `$count`.

In this part, we’ll learn five more useful concepts:

1. `$unset` — remove fields from aggregation output.
    
2. `$replaceRoot` and `$replaceWith` — change the structure of documents.
    
3. `$sample` — select random documents.
    
4. `$cond` — apply if/else logic.
    
5. `$expr` — use expressions inside query conditions.
    

All examples continue using the `aggregationDemo` database and its existing collections. Run them in `mongosh`.

## 1. `$unset` — Remove fields from output

Purpose: `$unset` removes one or more fields from documents passing through the pipeline.

Think of it as the opposite of selecting specific fields with `$project`: instead of listing what to keep, you specify what to remove.

### Syntax

```
{ $unset: "fieldName" }
```

For multiple fields:

```
{ $unset: ["field1", "field2"] }
```

### Example 1: Remove customer and city details

```
db.orders.aggregate([
  { $unset: ["customerId", "city"] }
])
```

The output documents retain their other fields, but no longer contain `customerId` or `city`.

Important: This only changes the aggregation result. It does not delete fields from stored documents.

### Example 2: Remove `_id` and return selected fields

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $unset: ["_id", "items", "customerId"] }
])
```

This returns delivered orders without the listed fields. It is useful when an API response should not expose internal or unnecessary information.

### Example 3: Compare `$unset` and `$project`

Using `$unset`:

```
db.orders.aggregate([
  { $unset: ["items", "customerId", "city"] }
])
```

Using `$project`:

```
db.orders.aggregate([
  {
    $project: {
      orderId: 1,
      amount: 1,
      status: 1
    }
  }
])
```

Both can produce a smaller output, but they work differently:

- `$unset` removes specified fields and retains the others.
    
- `$project` can explicitly select fields, rename fields, and calculate new values.
    

### Backend use case

Suppose your admin dashboard needs order totals and statuses but not the full list of purchased products. `$unset` can simplify the output before returning it to the client.

### Practice — `$unset`

1. Remove `items` from every order.
    
2. Remove `customerId`, `city`, and `_id`.
    
3. Find pending orders and remove `items` from their output.
    
4. Remove `orderDate` and `city`, then sort by `amount` descending.
    
5. Explain when `$project` is a better choice than `$unset`.
    

## 2. `$replaceRoot` and `$replaceWith` — Restructure documents

Sometimes your data is nested, but your API needs the nested object as the main document.

For example, after `$lookup`, you may have a structure like this:

```
{
  orderId: "ORD1001",
  customerDetails: [
    {
      customerId: 101,
      name: "Aman Sharma",
      email: "aman@example.com"
    }
  ]
}
```

If you unwind `customerDetails`, you can make the customer object the root of the output.

### A. `$replaceRoot`

Purpose: Replaces the entire current document with a specified document expression.

Syntax:

```
{
  $replaceRoot: {
    newRoot: "$fieldName"
  }
}
```

The `newRoot` expression must evaluate to a document.

### Example 1: Return only customer documents

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
    $replaceRoot: {
      newRoot: "$customerDetails"
    }
  }
])
```

The resulting documents contain customer fields such as `customerId`, `name`, `email`, and `city`. The original order fields are no longer part of the output.

Why? `$replaceRoot` replaces the complete document, not just one field.

### B. `$replaceWith`

`$replaceWith` performs the same kind of operation with a simpler syntax.

```
{
  $replaceWith: "$fieldName"
}
```

The previous example can be written as:

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
  { $replaceWith: "$customerDetails" }
])
```

### Example 2: Preserve order fields while flattening customer data

What if you want the order details and customer details together, rather than replacing the entire order?

Use `$project` or `$set` instead:

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

This preserves the order information and selects the customer fields you need.

### Important error to understand

If you try to replace the root with a field that is missing or is not a document, the pipeline can fail. Ensure that the selected field exists and has the correct structure.

### Backend use case

These stages are useful for transforming nested data into the shape expected by a frontend, especially in reporting pipelines and APIs that join related collections.

### Practice — `$replaceRoot` / `$replaceWith`

1. Return only customer details for all orders.
    
2. Use `$replaceWith` instead of `$replaceRoot` in the previous example.
    
3. Explain why the original `orderId` disappears after replacing the root with customer details.
    
4. Return both order information and customer name without replacing the root.
    
5. What can happen if the field used as `newRoot` is missing or is not a document?
    

## 3. `$sample` — Select random documents

Purpose: `$sample` selects a specified number of documents randomly from the documents that reach that stage.

### Syntax

```
{
  $sample: {
    size: number
  }
}
```

- `size` specifies how many documents you want.
    
- The results can differ between executions because the selection is random.
    

### Example 1: Get 3 random orders

```
db.orders.aggregate([
  {
    $sample: { size: 3 }
  }
])
```

If the collection contains 20 orders, MongoDB returns three randomly selected orders.

Run it several times and you may see different results.

### Example 2: Get 3 random delivered orders

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $sample: { size: 3 } }
])
```

Pipeline flow:

1. `$match` filters the delivered orders.
    
2. `$sample` randomly selects three from that filtered set.
    

If fewer than three documents match, the pipeline returns the available matching documents.

### Example 3: Randomly select products from order items

Because `items` is an array, unwind it before sampling individual items.

```
db.orders.aggregate([
  { $unwind: "$items" },
  { $sample: { size: 5 } },
  {
    $project: {
      _id: 0,
      orderId: 1,
      productName: "$items.name",
      price: "$items.price"
    }
  }
])
```

This samples five order-item entries, not necessarily five unique products. A product that appears in multiple orders may appear more than once.

### Backend use cases

- Randomly display products on a homepage.
    
- Select random records for testing or demos.
    
- Build a random practice-question endpoint.
    
- Sample data for exploratory analysis.
    

Performance note: Random sampling can become expensive on large datasets depending on the pipeline and execution plan. Use it thoughtfully in production.

### Practice — `$sample`

1. Return 5 random orders.
    
2. Return 3 random pending orders.
    
3. Return 4 random orders and show only `orderId` and `amount`.
    
4. Return 5 random order-item entries using `$unwind`.
    
5. Explain the difference between sampling orders and sampling after unwinding items.
    

## 4. `$cond` — Apply if/else logic

Purpose: `$cond` evaluates a condition and returns one value if the condition is true and another if it is false.

Think of it as JavaScript's ternary operator:

```
condition ? valueIfTrue : valueIfFalse
```

### Syntax

```
{
  $cond: {
    if: condition,
    then: valueIfTrue,
    else: valueIfFalse
  }
}
```

MongoDB also supports an array syntax:

```
{
  $cond: [
    condition,
    valueIfTrue,
    valueIfFalse
  ]
}
```

Both forms express the same conditional logic.

### Example 1: Categorize orders by amount

Suppose orders above ₹5,000 are considered high-value for this example.

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      category: {
        $cond: {
          if: { $gt: ["$amount", 5000] },
          then: "High Value",
          else: "Regular Value"
        }
      }
    }
  }
])
```

If `amount` is `6500`, the category is `"High Value"`.

If `amount` is `2500`, the category is `"Regular Value"`.

These labels are just business rules for this demonstration.

### Syntax explained

- `if` contains the condition.
    
- `$gt` compares the amount with `5000`.
    
- `then` specifies the value returned when the condition is true.
    
- `else` specifies the value returned when the condition is false.
    
- `category` is the name of the new output field.
    

### Example 2: Calculate a discount

Suppose orders worth ₹5,000 or more receive a demonstration discount of 10%; other orders receive no discount.

```
db.orders.aggregate([
  {
    $addFields: {
      discount: {
        $cond: {
          if: { $gte: ["$amount", 5000] },
          then: { $multiply: ["$amount", 0.10] },
          else: 0
        }
      }
    }
  },
  {
    $addFields: {
      finalAmount: {
        $subtract: ["$amount", "$discount"]
      }
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      discount: 1,
      finalAmount: 1
    }
  }
])
```

New operators:

- `$gte` means greater than or equal to.
    
- `$subtract` subtracts the second value from the first.
    

For an order amount of ₹6,000:

- Discount = ₹600
    
- Final amount = ₹5,400
    

### Example 3: Status-based labels

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      status: 1,
      message: {
        $cond: [
          { $eq: ["$status", "delivered"] },
          "Order completed",
          "Order not yet delivered"
        ]
      }
    }
  }
])
```

`$eq` checks whether two values are equal.

This condition distinguishes delivered orders from all other statuses. It does not separately distinguish cancelled, pending, or shipped orders.

### Backend use cases

- Apply discounts based on order value.
    
- Categorize users or products.
    
- Add status messages to API responses.
    
- Compute conditional fees or eligibility flags.
    

### Practice — `$cond`

1. Label orders above ₹3,000 as `"Expensive"` and the rest as `"Affordable"`.
    
2. Add a `freeDelivery` field that is `true` when `amount` is at least ₹2,000.
    
3. Apply a 5% demonstration discount to delivered orders and 0 otherwise.
    
4. Add a `statusMessage` field that distinguishes pending orders from all other statuses.
    
5. Calculate a 20% discount for orders above ₹5,000 and show the final amount.
    

## 5. `$expr` — Use expressions inside query conditions

This is an important concept because it lets you compare fields with other fields or use expressions in a `$match` condition.

Normally, a query condition looks like this:

```
{ amount: { $gt: 3000 } }
```

It compares `amount` against a fixed value.

But what if you want to compare one field with another field in the same document?

For example, suppose a document has:

```
{
  price: 1000,
  quantity: 5
}
```

You want to find documents where `quantity` is greater than `price`. That is where `$expr` becomes useful.

### Syntax

```
{
  $match: {
    $expr: {
      // expression that evaluates to true or false
    }
  }
}
```

Inside `$expr`, use aggregation expressions such as `$gt`, `$eq`, `$add`, and `$multiply`.

### Example 1: Compare two fields

```
db.orders.aggregate([
  {
    $match: {
      $expr: {
        $gt: ["$amount", "$customerId"]
      }
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      customerId: 1
    }
  }
])
```

This returns orders where the numeric `amount` is greater than `customerId`.

Why write `"$amount"` and `"$customerId"` with `$`? Because inside an aggregation expression, the `$` prefix refers to a document field.

This particular comparison is for learning the syntax; a real business rule would usually compare more meaningful fields.

### Example 2: Find orders above a calculated threshold

Suppose you want to find orders whose amount is greater than twice their customer ID. This is also technically valid, though it is only a demonstration.

```
db.orders.aggregate([
  {
    $match: {
      $expr: {
        $gt: [
          "$amount",
          { $multiply: ["$customerId", 2] }
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      customerId: 1
    }
  }
])
```

The second argument is calculated separately for each document.

### Example 3: Compare an amount with a computed value

Suppose your order documents contain `amount` and `discount`. You can find orders where the amount is greater than the discount:

```
db.orders.aggregate([
  {
    $match: {
      $expr: {
        $gt: ["$amount", "$discount"]
      }
    }
  }
])
```

This query only makes sense if the documents actually have a `discount` field. If the field is missing, the comparison may not match as you expect. You can first create the field with `$addFields` if necessary.

### `$expr` versus a normal `$match`

|Normal `$match`|`$match` with `$expr`|
|---|---|
|Convenient for comparing fields with constants|Supports comparisons between fields and computed expressions|
|Example: `amount > 3000`|Example: `amount > quantity * price`|
|Often simpler for straightforward filters|Useful for more complex document-level conditions|

### Backend use cases

- Compare a balance against a minimum threshold stored on the same document.
    
- Check whether a total exceeds a computed limit.
    
- Filter records using arithmetic expressions.
    
- Apply dynamic business rules that depend on multiple fields.
    

### Practice — `$expr`

1. Find orders where `amount` is greater than `customerId`.
    
2. Find orders where `amount` is less than twice `customerId`.
    
3. Use `$expr` to compare `amount` with `amount * 0.9`.
    
4. If your documents contain `discount`, find orders where `amount` is greater than `discount`.
    
5. Explain why `"$amount"` is a field reference inside `$expr`, while `3000` is a literal number.
    

## 6. Combined pipeline challenge

Now combine several stages from Parts 1–3. This pipeline classifies delivered orders by amount, sorts them, and returns five random-looking top-value candidates—but note that if you want the actual top five, do not use `$sample`; use `$sort` and `$limit` as shown below.

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  {
    $addFields: {
      valueCategory: {
        $cond: [
          { $gte: ["$amount", 5000] },
          "High Value",
          "Regular Value"
        ]
      }
    }
  },
  { $sort: { amount: -1, _id: 1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      status: 1,
      valueCategory: 1
    }
  }
])
```

This is a useful pattern for an admin dashboard that displays the five highest-value delivered orders.
