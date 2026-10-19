# MongoDB Aggregation Pipeline — Part 4

So far, you've learned how to filter, group, sort, join, reshape, and calculate values using aggregation pipelines. Now we'll move into advanced aggregation stages used for dashboards and analytics APIs.

In this lesson, we'll cover:

1. `$facet` — run multiple analysis pipelines on the same input.
    
2. `$bucket` — group numeric values into ranges you define.
    
3. `$bucketAuto` — let MongoDB create approximately even-sized buckets.
    
4. `$sortByCount` — group by a value and sort by frequency.
    

We'll continue using `aggregationDemo` and the existing `orders` collection in `mongosh`.

## 1. `$facet` — Multiple analyses in one pipeline

### What does `$facet` do?

Imagine you're building an e-commerce admin dashboard. On one page, you need:

- Total number of orders.
    
- Number of orders in each status.
    
- Top five most expensive orders.
    
- Total revenue.
    

You could run separate aggregation queries for each metric. Alternatively, `$facet` lets you run multiple independent sub-pipelines against the same incoming documents and returns their results together.

Think of it as one input splitting into several analysis branches.

Input documents

All orders

`$facet`

Runs independent sub-pipelines

Status counts

Group by status

Top orders

Sort and limit

Revenue summary

Sum amounts

Order count

Count documents

One result document

Each facet's results are stored in an array

### Syntax

```
{
  $facet: {
    outputArray1: [ /* stages */ ],
    outputArray2: [ /* stages */ ],
    outputArray3: [ /* stages */ ]
  }
}
```

Each key becomes an output field, and its value is an array of documents produced by that branch.

### Example 1: Build a dashboard summary

```
db.orders.aggregate([
  {
    $facet: {
      statusSummary: [
        {
          $group: {
            _id: "$status",
            totalOrders: { $sum: 1 }
          }
        },
        { $sort: { totalOrders: -1 } }
      ],

      topOrders: [
        { $sort: { amount: -1, _id: 1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 0,
            orderId: 1,
            amount: 1,
            status: 1
          }
        }
      ],

      revenueSummary: [
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            averageOrderAmount: { $avg: "$amount" }
          }
        },
        { $project: { _id: 0, totalRevenue: 1, averageOrderAmount: 1 } }
      ],

      orderCount: [
        { $count: "totalOrders" }
      ]
    }
  }
])
```

### Understand the output

The result has one top-level document shaped like this:

```
{
  statusSummary: [
    { _id: "delivered", totalOrders: 11 },
    { _id: "pending", totalOrders: 4 }
  ],
  topOrders: [
    { orderId: "ORD1001", amount: 3500, status: "delivered }
  ],
  revenueSummary: [
    { totalRevenue: 50000, averageOrderAmount: 2500 }
  ],
  orderCount: [
    { totalOrders: 20 }
  ]
}
```

The values above are illustrative, not a guaranteed exact result for your dataset. Each facet returns an array, even if its sub-pipeline produces only one document. If a sub-pipeline has no output, its array is empty.

### Important syntax details

- `statusSummary`, `topOrders`, `revenueSummary`, and `orderCount` are names you choose.
    
- Each field contains a separate pipeline.
    
- Each branch receives the documents that reach `$facet`.
    
- A `$match` before `$facet` filters the input for every branch.
    
- A `$match` inside one branch filters only that branch.
    

For example, adding `{ $match: { status: "delivered" } }` before `$facet` would make every summary report only delivered orders.

### Backend use case

A dashboard endpoint could return order counts, revenue metrics, and top orders in one response, reducing the need for multiple separate aggregation queries.

Performance note: `$facet` has memory and result-size limits. Keep each branch efficient, filter unnecessary documents before `$facet` where possible, and avoid producing excessively large arrays.

### Practice — `$facet`

1. Return order counts grouped by status and category in separate facet branches.
    
2. Create a facet with total revenue and average order amount.
    
3. Return the five highest-value orders alongside the count of all orders.
    
4. Add a branch that returns only pending orders.
    
5. Explain the difference between putting `$match` before `$facet` and placing it inside one branch.
    

## 2. `$bucket` — Group documents into defined ranges

### What does `$bucket` do?

Suppose you want to classify orders into amount ranges:

- Below ₹1,000
    
- ₹1,000–₹2,999
    
- ₹3,000–₹4,999
    
- ₹5,000 and above
    

You could write multiple queries, but `$bucket` groups documents into ranges in one aggregation stage.

Key idea: You define the boundaries yourself.

### Syntax

```
{
  $bucket: {
    groupBy: "$amount",
    boundaries: [0, 1000, 3000, 5000, 10000],
    default: "Other",
    output: {
      totalOrders: { $sum: 1 },
      totalAmount: { $sum: "$amount" }
    }
  }
}
```

Let's understand each field:

|Field|Meaning|
|---|---|
|`groupBy`|Field or expression whose value determines the bucket|
|`boundaries`|Ordered numeric or other comparable boundary values|
|`default`|Optional bucket label for values outside all specified ranges|
|`output`|Metrics calculated for each bucket|

The boundaries are lower-inclusive and upper-exclusive. For example, `[1000, 3000)` includes ₹1,000 and ₹2,999.99, but excludes ₹3,000.

### Example 1: Classify orders by amount

```
db.orders.aggregate([
  {
    $bucket: {
      groupBy: "$amount",
      boundaries: [0, 1000, 3000, 5000, 10000],
      default: "Other",
      output: {
        totalOrders: { $sum: 1 },
        totalAmount: { $sum: "$amount" },
        averageAmount: { $avg: "$amount" }
      }
    }
  }
])
```

Possible output structure:

```
[
  {
    _id: 0,
    totalOrders: 2,
    totalAmount: 1500,
    averageAmount: 750
  },
  {
    _id: 1000,
    totalOrders: 5,
    totalAmount: 10000,
    averageAmount: 2000
  },
  {
    _id: 3000,
    totalOrders: 6,
    totalAmount: 24000,
    averageAmount: 4000
  },
  {
    _id: 5000,
    totalOrders: 4,
    totalAmount: 28000,
    averageAmount: 7000
  }
]
```

The values above illustrate the output structure; your actual counts and totals depend on the records in `orders`.

The `_id` is the lower boundary of each bucket. With these boundaries, the ranges are:

- `_id: 0` → amounts from 0 up to, but not including, 1,000.
    
- `_id: 1000` → amounts from 1,000 up to, but not including, 3,000.
    
- `_id: 3000` → amounts from 3,000 up to, but not including, 5,000.
    
- `_id: 5000` → amounts from 5,000 up to, but not including, 10,000.
    
- `"Other"` → values that don't fit any defined interval, such as amounts below 0 or at least 10,000.
    

If no document falls into a bucket, `$bucket` normally doesn't output an empty bucket document.

### Example 2: Count orders in price ranges

```
db.orders.aggregate([
  {
    $bucket: {
      groupBy: "$amount",
      boundaries: [0, 2000, 4000, 6000, 10000],
      default: "OutsideRange",
      output: {
        orderCount: { $sum: 1 }
      }
    }
  },
  { $sort: { _id: 1 } }
])
```

This gives you a simple distribution of order values.

### Example 3: Add a status filter before bucketing

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  {
    $bucket: {
      groupBy: "$amount",
      boundaries: [0, 2000, 4000, 6000, 10000],
      default: "OutsideRange",
      output: {
        deliveredOrders: { $sum: 1 },
        deliveredRevenue: { $sum: "$amount" }
      }
    }
  }
])
```

The buckets now include only delivered orders because `$match` runs first.

### Backend use cases

- Sales distribution by order value.
    
- Customer spending ranges.
    
- Product price-range analytics.
    
- Classifying transactions into amount bands for reports.
    

### Practice — `$bucket`

1. Create buckets with boundaries `[0, 1000, 2500, 5000, 10000]`.
    
2. Count orders in each bucket.
    
3. Calculate total `amount` and average `amount` for each bucket.
    
4. Create buckets only for delivered orders.
    
5. Explain what happens to a document whose amount is outside the defined boundaries when no `default` bucket is provided.
    

## 3. `$bucketAuto` — Let MongoDB choose the ranges

### What does `$bucketAuto` do?

With `$bucket`, you decide the exact boundaries. But sometimes you don't know the right ranges beforehand.

For example, your product prices might vary from ₹100 to ₹50,000. You want four groups containing roughly similar numbers of documents.

`$bucketAuto` lets MongoDB determine the boundaries automatically.

### Syntax

```
{
  $bucketAuto: {
    groupBy: "$amount",
    buckets: 4,
    output: {
      totalOrders: { $sum: 1 },
      averageAmount: { $avg: "$amount" }
    }
  }
}
```

- `groupBy`: the value used to classify documents.
    
- `buckets`: the requested number of buckets.
    
- `output`: the metrics to calculate in each bucket.
    

### Example 1: Create four automatic amount buckets

```
db.orders.aggregate([
  {
    $bucketAuto: {
      groupBy: "$amount",
      buckets: 4,
      output: {
        totalOrders: { $sum: 1 },
        totalAmount: { $sum: "$amount" },
        averageAmount: { $avg: "$amount" }
      }
    }
  }
])
```

The result uses a structure similar to this:

```
[
  {
    _id: {
      min: 500,
      max: 1800
    },
    totalOrders: 5,
    totalAmount: 6500,
    averageAmount: 1300
  },
  {
    _id: {
      min: 1800,
      max: 3000
    },
    totalOrders: 5,
    totalAmount: 12000,
    averageAmount: 2400
  }
]
```

These numbers are illustrative. Your actual boundaries and number of returned buckets depend on the dataset.

Notice the difference in the `_id` field:

- `$bucket` uses a boundary value or your `default` label.
    
- `$bucketAuto` returns an object with `min` and `max` boundaries.
    

### Example 2: Automatically group product entries by price

```
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $bucketAuto: {
      groupBy: "$items.price",
      buckets: 5,
      output: {
        productEntries: { $sum: 1 },
        totalQuantity: { $sum: "$items.quantity" }
      }
    }
  }
])
```

This analyzes individual product entries rather than whole orders because `$unwind` runs before `$bucketAuto`.

### `$bucket` vs. `$bucketAuto`

|`$bucket`|`$bucketAuto`|
|---|---|
|You define boundaries|MongoDB chooses boundaries|
|Good for fixed business categories|Good for exploratory analysis|
|Some ranges may have many records and others few|Attempts to distribute documents relatively evenly|
|Supports a `default` bucket for out-of-range values|Does not use the same `default` option|

Important: `$bucketAuto` aims for relatively even document counts; it does not guarantee equal counts in every bucket. Equal numeric ranges and equal document counts are different things.

### Backend use cases

- Explore price distributions when ranges aren't known.
    
- Analyze transaction values.
    
- Create preliminary analytics reports.
    
- Discover useful boundaries before designing fixed business categories.
    

### Practice — `$bucketAuto`

1. Divide orders into 3 automatic buckets by `amount`.
    
2. Return the number of orders and total amount in each bucket.
    
3. Use `$unwind` to group product entries into 4 price buckets.
    
4. Compare the boundaries returned by `$bucket` and `$bucketAuto`.
    
5. Explain why four automatic buckets don't necessarily contain exactly one-quarter of the documents each.
    

## 4. `$sortByCount` — Group by value and sort by frequency

### What does `$sortByCount` do?

This stage combines two operations:

1. Groups documents by a specified expression.
    
2. Sorts groups by their document count in descending order.
    

It is a shortcut for `$group` with `$sum: 1`, followed by `$sort`.

### Syntax

```
{
  $sortByCount: "$fieldName"
}
```

### Example 1: Count orders by status

```
db.orders.aggregate([
  { $sortByCount: "$status" }
])
```

Possible output structure:

```
[
  { _id: "delivered", count: 11 },
  { _id: "pending", count: 4 },
  { _id: "shipped", count: 3 },
  { _id: "cancelled", count: 2 }
]
```

These counts illustrate the 20-order sample dataset. If you've inserted additional documents, your counts will differ.

The output fields mean:

- `_id`: the distinct status value.
    
- `count`: the number of documents having that value.
    

The groups are sorted by `count` in descending order.

### Example 2: Count orders by city

```
db.orders.aggregate([
  { $sortByCount: "$city" }
])
```

This answers the question: Which cities have the most orders?

It is useful when you want to find the most frequent values of a field.

### Example 3: Count individual product entries

```
db.orders.aggregate([
  { $unwind: "$items" },
  { $sortByCount: "$items.name" },
  { $limit: 5 }
])
```

This returns the five product names with the most order-item entries.

Remember that this counts entries, not the total quantity sold. To calculate quantity sold, use `$group` with `{ $sum: "$items.quantity" }`.

### Equivalent pipeline using `$group` and `$sort`

The previous status example can also be written as:

```
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } }
])
```

Both pipelines perform the same essential task. The explicit `$group` version is more flexible if you also want revenue, averages, or other metrics.

### Backend use cases

- Most common order statuses.
    
- Most popular cities.
    
- Product-entry frequency reports.
    
- Category distribution for an admin dashboard.
    

### Practice — `$sortByCount`

1. Count orders by `category`.
    
2. Count orders by `status` and return only the top two groups.
    
3. Count orders by `city`.
    
4. Count individual product entries by name.
    
5. Rewrite a `$sortByCount` pipeline using `$group` and `$sort`.
    

## 5. Practical challenge — Build an analytics dashboard

Now combine `$facet`, `$bucket`, `$sortByCount`, `$group`, and `$limit` into one pipeline.

```
db.orders.aggregate([
  {
    $facet: {
      statusDistribution: [
        { $sortByCount: "$status" }
      ],

      amountDistribution: [
        {
          $bucket: {
            groupBy: "$amount",
            boundaries: [0, 2000, 4000, 6000, 10000],
            default: "OutsideRange",
            output: {
              orderCount: { $sum: 1 },
              totalAmount: { $sum: "$amount" }
            }
          }
        },
        { $sort: { _id: 1 } }
      ],

      topFiveOrders: [
        { $sort: { amount: -1, _id: 1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 0,
            orderId: 1,
            amount: 1,
            status: 1
          }
        }
      ],

      overallMetrics: [
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
            averageAmount: { $avg: "$amount" }
          }
        },
        { $project: { _id: 0, totalOrders: 1, totalAmount: 1, averageAmount: 1 } }
      ]
    }
  }
])
```

### What does the API response contain?

One result document with four arrays:

- `statusDistribution` — counts by status.
    
- `amountDistribution` — order-value ranges.
    
- `topFiveOrders` — the five highest-value orders.
    
- `overallMetrics` — total orders, total amount, and average amount.
    

This is a good example of an aggregation pipeline powering an admin analytics endpoint.

