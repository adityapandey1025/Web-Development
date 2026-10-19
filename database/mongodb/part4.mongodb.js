use("aggregationDemo")



// db.orders.aggregate([
//     {
//         $facet: {
//           statusSummary : [
//             {
//                 $match: {
//                   status : "delivered"
//                 }
//             }
//           ],

//           topOrders : [
//             {
//                 $sort : {
//                     amount : -1
//                 },
            
//             },
//             {
//                 $limit: 5
//             }
//           ]
//         }
//     }
// ])






// db.orders.aggregate([
//     {
//         $bucket: {
//           groupBy: "$amount",
//           boundaries: [ 0,1000,2000,4000,10000 ],
//           default: "Others",
//           output: {
//             totalCount : {$sum : 1},
//             totalAmount : {$sum : "$amount"}

//           }
//         }
//     }
// ])




// db.orders.aggregate([
//     {
//         $group: {
//           _id: "$status",
//           countOrder : {$sum : 1}
//         }
//     },
//     {
//         $sort :{
//             countOrder : -1
//         }
//     }
// ])


db.orders.aggregate([
    {
        $sortByCount: "$status"
    }
])