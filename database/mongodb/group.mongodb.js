use("aggregationDemo")

// db.orders.aggregate([])


// db.orders.aggregate([
//     {
//         $group: {
//           _id: "$customerId",
//           NoOfOrders : {$sum : 1}
//         }
//     }
// ])


// db.orders.aggregate([
//     {
//         $group: {
//           _id: "$customerId",
//           totalOrder : {$sum : 1},
//           totalSpending : {$sum : "$amount"},
//           Average : {$avg : "$amount"}
//         }
//     },
//     {
//         $sort : {
//             _id :1
//         }
//     }
// ])


// db.orders.aggregate([
//   {
//     $group: {
//       _id: "$customerId",
//       customerName: {$first : "$customerName"},
//       totalSpending: { $sum: "$amount" }
//     }
//   },
//   {
//     $sort: { _id: 1 }
//   }
// ]);


// db.orders.aggregate([
//     {
//         $group: {
//           _id: "$customerId",
//           CustomerName : {$first : "$customerName"},
//           orderArray : {$push : "$orderNo"},
//           Category : {$addToSet : "$category"},
//           totalItems : {$push : "$items"}
//         }
//     }
// ])


// db.orders.aggregate([
//     {
//         $group: {
//           _id: {
//             customerId : "$customerId",
//             status : "$status"
//           },
//           orderCount : {$sum : 1},
//           totalAmt : {$sum : "$amount"}
//         }
//     },
//         {
//             $sort : {
//             "_id.customerId" : 1,
//             "_id.status" : 1

//         }
//     }
    
// ])



