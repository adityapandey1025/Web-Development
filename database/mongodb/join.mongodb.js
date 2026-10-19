use("aggregationDemo")


// db.customers.aggregate([])


// Example 1: Attach customer details to orders

// db.orders.aggregate([
//     {
//         $lookup: {
//           from: "customers",
//           localField: "customerId",
//           foreignField: "customerId",
//           as: "customerDetails"
//         }
//     },
//     {
//         $unwind : "$customerDetails"
//     },
//     {
//         $project: {
//           _id : 0,
//           orderId :1,
//           category : 1,
//           customerName : 1,
//           customerEmail : "$customerDetails.email"
//         }
//     }
// ])


db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customerDetails"
    }
  },
])


// db.orders.aggregate([
//     {
//         $lookup : {
//             from : "customers",
//             localField : "customerId",
//             foreignField : "customerId",
//             as : "customerDetails"
//         }
//     },
//     {
//         $unwind : "$customerDetails"
//     },
//     {
//         $match: {
//           city : "Delhi"
//         }
//     },
//     {
//         $project: {
//           _id : 0,
//           status : 1,
//           category : 1,
//           orderCity : "$city",
//           customerCity : "$customerDetails.city",
//           Email : "$customerDetails.email"
//         }
//     }
// ])



// db.orders.aggregate([
//     {
//         $addFields: {
//           totalWithTax : {
//             $add : ["$amount",
//                 {$multiply : ["$amount",0.1]}
//             ]
//           }
//         }
//     },
//     {
//     $project: {
//       _id: 0,
//       orderId: 1,
//       amount: 1,
//       tax: 1,
//       totalWithTax: 1
//     }
// }
// ])


// db.orders.aggregate([
//   { $count: "orderCount" }
// ])


// db.orders.aggregate([
//     {
//         $match: {
//           status : "delivered"
//         }
//     },
//     {
//         $count: 'DeliveredOrderCount'
//     }
// ])




// db.orders.aggregate([
//     {
//         $lookup: {
//           from: "customers",
//           localField: "customerId",
//           foreignField: "customerId",
//           as: "customerDetails"
//         }
//     },
//     {
//         $unwind : "$customerDetails"
//     },
//     {
//         $replaceRoot: {
//           newRoot: "$customerDetails"
//         }
//     }
// ])





// db.orders.aggregate([
//     {
//         $unwind : "$items"
//     },
//   {
//     $project: {
//       _id: 0,
//       orderNo: 1,
//       amount: 1,
//       orderPriority :{
//         $cond : {
//             if : {$gte : ["$amount",5000]},
//             then : "High Priority",
//             else : "Low Priority"

//         }
//       },
//       itemDetails :{
//         itenName : "$items.name",
//         itemPrice : "$items.price"
//       },
//       Qunatity : "$items.quantity"
//     }
//   }
// ])
