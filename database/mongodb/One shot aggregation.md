# MongoDB Aggregation Pipelines --- Complete Learning Handbook

## Parts 1--6 | mongosh → Mongoose → Express.js

**Purpose:** A consolidated learning document based on this chat's  
MongoDB aggregation lessons. It organizes the material into a single  
reference guide rather than reproducing every conversational message  
word-for-word.

## How to use this handbook

- Run the examples in `mongosh` one at a time.
- Use the same database and collections throughout the lessons.
- Read the output after each stage; aggregation is easiest to  
    understand by observing how the documents change.
- Complete the practice questions before moving to the next topic.
- Treat sample output values as illustrative unless explicitly tied to  
    your actual database.

## Learning roadmap

---

Part Topics

---

1 Aggregation basics, $match,  
$project, $group, $sort,  
$limit

2 $skip, $unwind, $lookup,  
$addFields, $set, $count

3 $unset, $replaceRoot,  
$replaceWith, $sample, $cond,  
$expr

4 $facet, $bucket, $bucketAuto,  
$sortByCount

5 $map, $filter, $reduce,  
nested-array calculations

6 Mongoose aggregation, Express  
controller, filtering, pagination,  
ObjectId casting

---

# Part 1 --- Aggregation fundamentals

## 1. What is an aggregation pipeline?

An aggregation pipeline processes documents through an ordered sequence  
of stages. Each stage performs a task---filtering, reshaping, grouping,  
sorting, joining, or calculating---and passes its output to the next  
stage.

Think of it as a data-processing assembly line:

`Documents → $match → $group → $sort → $project → Result`

Backend developers use aggregation to power admin dashboards, sales  
reports, filtered order lists, product statistics, and API responses  
that need computed fields.

## 2. General syntax

```
db.collectionName.aggregate([
  { $match: { status: "delivered" } },
  { $sort: { amount: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, orderId: 1, amount: 1 } }
])
```

The pipeline is an array; each item is a stage document. Stage order  
matters. $match reduces input, $sort orders the current documents,  
$limit keeps the first N, and $project shapes the response.

Use the `aggregationDemo` database from the lessons:

```
use aggregationDemo
db.orders.find().limit(5)
```

The lesson dataset uses an `orders` collection with fields such as  
`orderId`, `customerId`, `status`, `amount`, `category`, `items`,  
`city`, and `orderDate`. The `items` field is an array of product  
objects, often with `name`, `price`, and `quantity`. A `customers`  
collection is used for $lookup.

**Setup caution:** Run sample `insertMany()` setup only once. Re-running  
inserts can create duplicates. `use aggregationDemo` switches databases;  
it does not delete data.

## 3. $match --- Filter documents

$match filters documents using query conditions. It is similar to  
`find()` and often belongs early in a pipeline.

```
db.orders.aggregate([
  { $match: { status: "delivered" } }
])
```

More conditions:

```
db.orders.aggregate([
  { $match: { status: "delivered", amount: { $gt: 3000 } } }
])
```

Use $in to match one of several values:

```
db.orders.aggregate([
  { $match: { status: { $in: ["pending", "shipped"] } } }
])
```

Use $or for alternative conditions:

```
db.orders.aggregate([
  { $match: { $or: [{ city: "Delhi" }, { amount: { $gt: 4000 } }] } }
])
```

**Backend use:** Filter an order history by status, date, city, or  
minimum amount.

**Practice** 1. Find delivered orders. 2. Find orders with amount  
greater than 3,000. 3. Find pending or shipped orders. 4. Find orders  
from Delhi or with amount above 4,000. 5. Combine status and amount  
filters.

## 4. $project --- Shape output documents

$project selects fields, excludes fields, renames fields, and computes  
output values.

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      status: 1
    }
  }
])
```

Rename a field:

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      orderAmount: "$amount"
    }
  }
])
```

Compute a field:

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      amount: 1,
      doubleAmount: { $multiply: ["$amount", 2] }
    }
  }
])
```

A field reference starts with `$`, for example `"$amount"`. A literal  
string is written as a normal string. $literal can force a value to be  
treated literally when needed.

**Backend use:** Return only the fields required by a frontend and avoid  
exposing unnecessary fields.

**Practice** 1. Return only `orderId` and `status`. 2. Rename `amount`  
to `orderAmount`. 3. Add `doubleAmount`. 4. Return `orderId`, `city`,  
and `amount`, excluding `_id`. 5. Create a response with a nested object  
containing order ID and amount.

## 5. $group --- Aggregate documents

$group creates one output document for each group key. The group key  
is specified by `_id`.

Count orders by status:

```
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalOrders: { $sum: 1 }
    }
  }
])
```

`$sum: 1` counts documents. `$sum: "$amount"` sums a field.

```
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" },
      averageOrder: { $avg: "$amount" },
      highestOrder: { $max: "$amount" },
      lowestOrder: { $min: "$amount" }
    }
  }
])
```

Useful accumulators: - $sum: sum values or count documents with  
`$sum: 1`. - $avg: average. - $min / $max: minimum / maximum. -  
$push: collect values, including duplicates. - $addToSet: collect  
unique values. - $first / $last: first or last value in the current  
input order; use $sort first when order matters.

Group by multiple fields:

```
db.orders.aggregate([
  {
    $group: {
      _id: { city: "$city", status: "$status" },
      count: { $sum: 1 }
    }
  }
])
```

**Backend use:** Customer spending summaries, status distribution,  
revenue by category, and admin reports.

**Practice** 1. Count orders by status. 2. Calculate total amount by  
city. 3. Calculate average order amount by category. 4. Find each  
customer's maximum order. 5. Group by both city and status.

## 6. $sort --- Sort documents

```
db.orders.aggregate([
  { $sort: { amount: -1 } }
])
```

`1` means ascending; `-1` means descending. Sort on multiple fields:

```
db.orders.aggregate([
  { $sort: { orderDate: -1, _id: 1 } }
])
```

The `_id` tie-breaker helps make ordering stable when dates are equal.

**Practice** 1. Sort amount ascending. 2. Sort amount descending. 3.  
Sort by status then amount descending. 4. Sort delivered orders by date  
newest first. 5. Sort grouped customer totals from highest to lowest.

## 7. $limit --- Limit results

```
db.orders.aggregate([
  { $sort: { amount: -1, _id: 1 } },
  { $limit: 5 }
])
```

For top-N queries, sort before limiting. $limit alone does not mean  
"top five"; it just keeps five documents from the current input order.

**Practice** 1. Return five orders. 2. Return the three highest-value  
orders. 3. Find the top five delivered orders. 4. Return two orders  
after sorting by date. 5. Explain why $sort should precede $limit  
for top-N results.

# Part 2 --- Pagination, arrays, joins, and counts

## 8. $skip --- Offset pagination

```
db.orders.aggregate([
  { $sort: { orderDate: -1, _id: 1 } },
  { $skip: 5 },
  { $limit: 5 }
])
```

For page-based pagination:

```
const page = 2;
const limit = 5;
const skip = (page - 1) * limit;
```

$skip ignores the first N documents. Large skip values can be  
inefficient on large collections; cursor-based pagination may be better  
at scale.

**Practice** 1. Skip the first three orders. 2. Sort amount descending  
and skip five. 3. Return page 4 with five items per page. 4. Filter  
delivered orders, sort by date, skip two, and return three. 5. Explain  
the pagination formula.

## 9. $unwind --- Expand array elements

$unwind creates a separate pipeline document for each element of an  
array.

```
db.orders.aggregate([
  { $match: { orderId: "ORD1001" } },
  { $unwind: "$items" }
])
```

Calculate item-line revenue:

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

Count entries by product:

```
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.name",
      timesAppeared: { $sum: 1 },
      totalQuantity: { $sum: "$items.quantity" }
    }
  },
  { $sort: { timesAppeared: -1 } }
])
```

`timesAppeared` counts order-item entries; `totalQuantity` sums the  
quantity field. They are different metrics.

To preserve documents with null, missing, or empty arrays:

```
{
  $unwind: {
    path: "$items",
    preserveNullAndEmptyArrays: true
  }
}
```

**Practice** 1. Unwind items for `ORD1002`. 2. Return order ID and  
product name. 3. Calculate each line's revenue. 4. Sum quantity sold by  
product. 5. Explain the difference between entry count and total  
quantity.

## 10. $lookup --- Join collections

Suppose `orders.customerId` matches `customers.customerId`.

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

- `from`: foreign collection name.
- `localField`: field in the current collection.
- `foreignField`: matching field in the other collection.
- `as`: output array field.

$lookup returns an array, even when one document matches. Use  
$unwind to flatten it:

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
      customerName: "$customerDetails.name",
      customerEmail: "$customerDetails.email"
    }
  }
])
```

Filter by joined data:

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
  { $match: { "customerDetails.city": "Delhi" } }
])
```

For frequent joins, index the foreign join field. Matching fields must  
have compatible BSON types.

**Practice** 1. Join orders to customers. 2. Return order ID, amount,  
and customer name. 3. Find orders for customers in Noida. 4. Include  
customer email and order status. 5. Return delivered orders with  
customer names.

## 11. $addFields and $set --- Add calculated fields

$set is an alias for $addFields in aggregation. Both add fields or  
replace values in the pipeline output; they do not permanently update  
stored documents.

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
  }
])
```

Conditional flag:

```
db.orders.aggregate([
  {
    $addFields: {
      isHighValue: { $gt: ["$amount", 5000] }
    }
  }
])
```

$gt means greater than. $add adds values. The 5% tax here is only a  
demonstration calculation, not a tax recommendation.

**Practice** 1. Add `doubleAmount`. 2. Add `isExpensive` for amount  
above 3,000. 3. Copy `status` into `statusLabel`. 4. Calculate a  
demonstration discount and final amount. 5. Use $concat to create an  
order summary.

## 12. $count --- Count documents reaching a stage

```
db.orders.aggregate([
  { $count: "totalOrders" }
])
```

Count filtered documents:

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $count: "deliveredOrders" }
])
```

For counts per group, use $group with `$sum: 1`. $count produces no  
output document if the input is empty.

**Practice** 1. Count all orders. 2. Count pending orders. 3. Count  
orders above 3,000. 4. Count orders from Delhi. 5. Sort, limit to five,  
then count; explain what the result means.

# Part 3 --- Reshaping, sampling, and conditions

## 13. $unset --- Remove fields from pipeline output

```
db.orders.aggregate([
  { $unset: ["customerId", "city", "items"] }
])
```

This removes fields from the aggregation result, not from the stored  
collection. $unset is convenient when removing a few fields;  
$project is often better when explicitly selecting a small set of  
fields.

**Practice** 1. Remove `items`. 2. Remove `customerId`, `city`, and  
`_id`. 3. Match pending orders then remove `items`. 4. Remove  
`orderDate` and `city`, then sort by amount. 5. Compare $unset and  
$project.

## 14. $replaceRoot and $replaceWith

These replace the entire current document with a document expression.

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

Equivalent $replaceRoot syntax:

```
{ $replaceRoot: { newRoot: "$customerDetails" } }
```

After replacement, original order fields disappear unless you explicitly  
preserve them in a new structure. The target must evaluate to a  
document; missing or unsuitable values can cause an error.

**Practice** 1. Return only customer documents. 2. Rewrite using  
$replaceWith. 3. Explain why `orderId` disappears. 4. Keep order  
details and customer name with $project. 5. Explain the error risk  
when the target is missing.

## 15. $sample --- Random selection

```
db.orders.aggregate([
  { $sample: { size: 3 } }
])
```

Random delivered orders:

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $sample: { size: 3 } }
])
```

After $unwind, $sample selects order-item entries rather than whole  
orders. Results may vary across executions.

**Practice** 1. Return five random orders. 2. Return three random  
pending orders. 3. Project order ID and amount from a random sample. 4.  
Sample five item entries after $unwind. 5. Explain the difference  
between sampling before and after $unwind.

## 16. $cond --- If/else logic

Object syntax:

```
{
  $cond: {
    if: { $gt: ["$amount", 5000] },
    then: "High Value",
    else: "Regular Value"
  }
}
```

Array syntax:

```
{ $cond: [{ $gte: ["$amount", 5000] }, "High", "Regular"] }
```

Calculate a demonstration discount:

```
db.orders.aggregate([
  {
    $addFields: {
      discount: {
        $cond: [
          { $gte: ["$amount", 5000] },
          { $multiply: ["$amount", 0.10] },
          0
        ]
      }
    }
  },
  {
    $addFields: {
      finalAmount: { $subtract: ["$amount", "$discount"] }
    }
  }
])
```

$gte means greater than or equal to; $subtract subtracts the second  
value from the first.

**Practice** 1. Label orders above 3,000 as expensive. 2. Add a  
free-delivery boolean for amount at least 2,000. 3. Apply a  
demonstration discount only to delivered orders. 4. Add a pending-order  
message. 5. Apply a 20% demonstration discount above 5,000.

## 17. $expr --- Expressions in match conditions

Use $expr to compare fields with each other or use computed  
expressions inside a query condition.

```
db.orders.aggregate([
  {
    $match: {
      $expr: { $gt: ["$amount", "$customerId"] }
    }
  }
])
```

Compare amount with a calculated value:

```
db.orders.aggregate([
  {
    $match: {
      $expr: {
        $gt: ["$amount", { $multiply: ["$customerId", 2] }]
      }
    }
  }
])
```

These comparisons demonstrate syntax; real business rules should compare  
meaningful fields. A missing field may prevent the expression from  
matching as expected.

**Practice** 1. Find amount greater than customer ID. 2. Find amount  
less than twice customer ID. 3. Compare amount against a computed  
expression. 4. If `discount` exists, compare amount and discount. 5.  
Explain field references such as `"$amount"`.

# Part 4 --- Analytics stages

## 18. $facet --- Multiple pipelines in one query

$facet runs independent sub-pipelines against the same incoming  
documents and returns each branch's results in an array.

```
db.orders.aggregate([
  {
    $facet: {
      statusSummary: [
        { $sortByCount: "$status" }
      ],
      topOrders: [
        { $sort: { amount: -1, _id: 1 } },
        { $limit: 5 },
        { $project: { _id: 0, orderId: 1, amount: 1, status: 1 } }
      ],
      revenueSummary: [
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            averageAmount: { $avg: "$amount" }
          }
        },
        { $project: { _id: 0, totalRevenue: 1, averageAmount: 1 } }
      ],
      orderCount: [
        { $count: "totalOrders" }
      ]
    }
  }
])
```

A $match before $facet filters every branch. A $match inside a  
branch filters only that branch. Empty branches return empty arrays.  
Keep facet outputs bounded and be mindful of memory and result-size  
limits.

**Practice** 1. Count by status and category in separate branches. 2.  
Return total and average amount. 3. Return top five orders and total  
count. 4. Add a pending-orders branch. 5. Compare $match before and  
inside $facet.

## 19. $bucket --- User-defined ranges

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

Boundaries are lower-inclusive and upper-exclusive. `[1000, 3000)`  
includes 1,000 but excludes 3,000. `default` catches values outside the  
defined ranges. Without a default bucket, out-of-range values can cause  
an error.

**Practice** 1. Define `[0, 1000, 2500, 5000, 10000]` boundaries. 2.  
Count orders in each bucket. 3. Calculate total and average amount. 4.  
Bucket only delivered orders. 5. Explain out-of-range handling.

## 20. $bucketAuto --- Automatically chosen ranges

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

MongoDB chooses boundaries to create roughly even-sized groups. It does  
not guarantee exactly equal counts. The `_id` output contains `min` and  
`max` boundaries.

Use it for exploratory analytics when you do not already know suitable  
ranges.

**Practice** 1. Create three automatic buckets by amount. 2. Return  
count and total amount per bucket. 3. Unwind items and bucket their  
prices. 4. Compare $bucket with $bucketAuto. 5. Explain why buckets  
may not have exactly equal counts.

## 21. $sortByCount --- Count distinct values and sort

```
db.orders.aggregate([
  { $sortByCount: "$status" }
])
```

Equivalent:

```
db.orders.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

After unwinding items, it counts product-entry frequency:

```
db.orders.aggregate([
  { $unwind: "$items" },
  { $sortByCount: "$items.name" },
  { $limit: 5 }
])
```

This counts item entries, not units sold. Use $group and  
`$sum: "$items.quantity"` to calculate units.

**Practice** 1. Count orders by category. 2. Return the top two  
statuses. 3. Count orders by city. 4. Count item entries by product  
name. 5. Rewrite $sortByCount using $group and $sort.

# Part 5 --- Array expressions

## 22. $map --- Transform every array element

$map returns a transformed array without splitting the parent  
document.

```
db.orders.aggregate([
  { $match: { orderId: "ORD1001" } },
  {
    $project: {
      _id: 0,
      orderId: 1,
      items: {
        $map: {
          input: "$items",
          as: "item",
          in: {
            name: "$$item.name",
            price: "$$item.price",
            quantity: "$$item.quantity",
            lineTotal: {
              $multiply: ["$$item.price", "$$item.quantity"]
            }
          }
        }
      }
    }
  }
])
```

$items refers to the document field. `$$item` refers to the variable  
declared in `as`. $map returns null for null/missing input; $ifNull  
can substitute `[]`. Non-array, non-null input can still cause an error.

**Practice** 1. Add line total to each item. 2. Calculate a 5%  
demonstration discount. 3. Return only item name and quantity. 4. Use  
$ifNull for missing arrays. 5. Compare $map with $unwind.

## 23. $filter --- Keep matching array elements

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      expensiveItems: {
        $filter: {
          input: "$items",
          as: "item",
          cond: { $gt: ["$$item.price", 1000] }
        }
      }
    }
  }
])
```

$filter returns an array of elements satisfying `cond`. It does not  
create separate pipeline documents. Optional `limit` can cap matching  
elements, but it does not sort them. Null/missing input returns null;  
non-array, non-null input causes an error.

Combine $filter with $map to select items first and reshape them  
second.

**Practice** 1. Keep items above 2,000. 2. Keep items with quantity at  
least 2. 3. Filter items in delivered orders. 4. Filter and then map to  
names and prices. 5. Compare $filter with $match.

## 24. $reduce --- Accumulate an array into a result

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      totalItemsValue: {
        $reduce: {
          input: "$items",
          initialValue: 0,
          in: {
            $add: [
              "$$value",
              { $multiply: ["$$this.price", "$$this.quantity"] }
            ]
          }
        }
      }
    }
  }
])
```

- `initialValue`: starting accumulator.
- `$$value`: accumulated result so far.
- `$$this`: current array element.

For an empty array, $reduce returns `initialValue`. For null or  
missing input, it returns null; use `$ifNull: ["$items", []]` if  
empty-array behavior is desired.

Count entries:

```
{
  $reduce: {
    input: "$items",
    initialValue: 0,
    in: { $add: ["$$value", 1] }
  }
}
```

Sum quantities:

```
{
  $reduce: {
    input: "$items",
    initialValue: 0,
    in: { $add: ["$$value", "$$this.quantity"] }
  }
}
```

**Remember:** $map transforms each element; $filter selects  
elements; $reduce combines elements into one accumulated result.  
$reduce works within one document, while $group aggregates across  
pipeline documents.

**Practice** 1. Calculate each order's item value. 2. Sum item  
quantities. 3. Count item entries. 4. Sum values only for items above  
2,000 using $cond. 5. Explain `initialValue`, `$$value`, and `$$this`.

## 25. Combined array-analysis pipeline

```
db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: 1,
      numberOfItems: { $size: { $ifNull: ["$items", []] } },
      totalQuantity: {
        $reduce: {
          input: { $ifNull: ["$items", []] },
          initialValue: 0,
          in: { $add: ["$$value", "$$this.quantity"] }
        }
      },
      totalItemsValue: {
        $reduce: {
          input: { $ifNull: ["$items", []] },
          initialValue: 0,
          in: {
            $add: [
              "$$value",
              { $multiply: ["$$this.price", "$$this.quantity"] }
            ]
          }
        }
      },
      expensiveItems: {
        $map: {
          input: {
            $filter: {
              input: { $ifNull: ["$items", []] },
              as: "item",
              cond: { $gt: ["$$item.price", 2000] }
            }
          },
          as: "item",
          in: {
            name: "$$item.name",
            price: "$$item.price",
            quantity: "$$item.quantity",
            lineTotal: { $multiply: ["$$item.price", "$$item.quantity"] }
          }
        }
      }
    }
  },
  { $sort: { totalItemsValue: -1, orderId: 1 } },
  { $limit: 5 }
])
```

$size counts array entries. This pipeline calculates each order's item  
value; that value may differ from a stored `amount` if the latter  
includes shipping, discounts, or other charges.

# Part 6 --- Mongoose and Express integration

## 26. Mongoose `.aggregate()`

In `mongosh`:

```
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $group: { _id: "$status", totalOrders: { $sum: 1 } } }
])
```

In Mongoose:

```
const result = await Order.aggregate([
  { $match: { status: "delivered" } },
  { $group: { _id: "$status", totalOrders: { $sum: 1 } } }
]);
```

Mongoose aggregation results are plain JavaScript objects, not hydrated  
Mongoose documents. Mongoose does not automatically cast pipeline values  
as it does for ordinary query filters. Use correct BSON types.

## 27. Example Order model

This is an illustrative schema; adapt it to your actual project rather  
than creating duplicate models.

```
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    required: true
  },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  city: { type: String, required: true },
  items: [{ name: String, price: Number, quantity: Number }],
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
```

## 28. Analytics controller with $facet

```
import { Order } from "../models/order.model.js";

export const getOrderAnalytics = async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $facet: {
          summary: [
            {
              $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalRevenue: { $sum: "$amount" },
                averageOrderAmount: { $avg: "$amount" }
              }
            },
            {
              $project: {
                _id: 0,
                totalOrders: 1,
                totalRevenue: 1,
                averageOrderAmount: 1
              }
            }
          ],
          statusDistribution: [{ $sortByCount: "$status" }],
          topOrders: [
            { $sort: { amount: -1, _id: 1 } },
            { $limit: 5 },
            {
              $project: {
                _id: 0,
                orderId: 1,
                amount: 1,
                status: 1,
                city: 1
              }
            }
          ]
        }
      }
    ]);

    const analytics = result[0];

    res.status(200).json({
      success: true,
      data: {
        summary: analytics.summary[0] ?? {
          totalOrders: 0,
          totalRevenue: 0,
          averageOrderAmount: null
        },
        statusDistribution: analytics.statusDistribution,
        topOrders: analytics.topOrders
      }
    });
  } catch (error) {
    next(error);
  }
};
```

$facet produces a single result document with arrays for each branch.  
The summary branch can be empty, so the controller supplies a fallback.

## 29. Route setup

```
import { Router } from "express";
import { getOrderAnalytics } from "../controllers/orderAnalytics.controller.js";

const router = Router();
router.get("/analytics", getOrderAnalytics);
export default router;
```

Register in the app:

```
import express from "express";
import orderRouter from "./routes/order.routes.js";

const app = express();
app.use(express.json());
app.use("/api/orders", orderRouter);

export default app;
```

Assuming the server and MongoDB connection are configured, test:

`GET http://localhost:3000/api/orders/analytics`

## 30. Filtering and pagination safely

Example request:

`GET /api/orders/analytics?status=delivered&minAmount=1000&page=2&limit=5`

Validate query parameters and build the $match object from allowed  
fields; do not accept arbitrary client-supplied pipeline stages.

```
const allowedStatuses = ["pending", "shipped", "delivered", "cancelled"];

const { status } = req.query;
const page = Number(req.query.page ?? 1);
const limit = Number(req.query.limit ?? 5);
const minAmount =
  req.query.minAmount === undefined ? undefined : Number(req.query.minAmount);

if (
  !Number.isInteger(page) || page < 1 ||
  !Number.isInteger(limit) || limit < 1 || limit > 100
) {
  return res.status(400).json({ success: false, message: "Invalid pagination" });
}

if (status !== undefined && !allowedStatuses.includes(status)) {
  return res.status(400).json({ success: false, message: "Invalid status" });
}

if (
  minAmount !== undefined &&
  (!Number.isFinite(minAmount) || minAmount < 0)
) {
  return res.status(400).json({ success: false, message: "Invalid minAmount" });
}

const match = {};
if (status !== undefined) match.status = status;
if (minAmount !== undefined) match.amount = { $gte: minAmount };

const skip = (page - 1) * limit;
```

Use this match object at the beginning of the pipeline, then use  
$facet to separate the paginated data branch from the  
all-matching-documents metadata branch:

```
[
  { $match: match },
  {
    $facet: {
      data: [
        { $sort: { orderDate: -1, _id: 1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: { _id: 0, orderId: 1, status: 1, amount: 1, orderDate: 1 } }
      ],
      metadata: [
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$amount" },
            averageOrderAmount: { $avg: "$amount" }
          }
        },
        { $project: { _id: 0, totalOrders: 1, totalRevenue: 1, averageOrderAmount: 1 } }
      ]
    }
  }
]
```

Pagination belongs only in the `data` branch. If $limit is placed  
before $facet, the metadata branch would also see only the limited  
documents.

For page 2 with limit 5: `skip = (2 - 1) * 5 = 5`.

## 31. ObjectId casting

If the schema stores a reference as an ObjectId, a hexadecimal string  
will not match it automatically inside an aggregation pipeline.

```
import mongoose from "mongoose";

const customerId = req.params.customerId;

if (!mongoose.isObjectIdOrHexString(customerId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid customer ID"
  });
}

const customerObjectId = new mongoose.Types.ObjectId(customerId);

const result = await Order.aggregate([
  { $match: { customer: customerObjectId } }
]);
```

Use the real field name from your schema. If the ID is stored as a  
number, use a number instead of an ObjectId.

## 32. Production performance checklist

- Put selective $match stages early when practical.
- Index fields used frequently for filtering and sorting.
- Avoid carrying unnecessary fields through complex pipelines.
- Be careful with large $facet results and memory limits.
- Large $skip values can be expensive; consider cursor-based  
    pagination at scale.
- Use `explain()` to inspect execution plans against realistic data.
- Validate query parameters and construct pipelines from trusted,  
    controlled fields.
- Ensure values have the correct BSON types, especially ObjectIds and  
    dates.
- Do not assume that an index helps every pipeline; measure the actual  
    query plan.

Example index:

```
db.orders.createIndex({ status: 1 })
```

An index can improve some status-filtering queries, but it also consumes  
storage and adds write overhead.

# Final revision sheet

Requirement Common approach

---

Filter documents $match  
Select/rename/compute output fields $project  
Group and calculate metrics $group  
Count documents per group `$sum: 1` inside $group  
Sort results $sort  
Return top N $sort then $limit  
Offset pagination $sort → $skip → $limit  
Expand array elements $unwind  
Join collections $lookup  
Add computed fields $addFields / $set  
Count all documents reaching a stage $count  
Remove output fields $unset  
Replace document root $replaceRoot / $replaceWith  
Random sample $sample  
If/else expression $cond  
Compare fields/computed values in match $expr  
Multiple dashboard branches $facet  
Fixed numeric ranges $bucket  
Automatic ranges $bucketAuto  
Group and sort by frequency $sortByCount  
Transform array elements $map  
Select array elements $filter  
Accumulate array values $reduce

## Suggested study order

1. Practise $match, $project, $group, $sort, and $limit until  
    comfortable.
2. Combine $skip, $unwind, $lookup, and $addFields.
3. Learn conditional and reshaping stages.
4. Build dashboard pipelines using $facet and bucketing stages.
5. Practise $map, $filter, and $reduce on nested arrays.
6. Move to Mongoose and Express controllers.
7. Add validation, pagination, indexes, and error handling.

**Core principle:** Learn each stage individually, inspect the output,  
then combine stages. The goal is to understand how the shape and number  
of documents change at every step.