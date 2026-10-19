use("aggregationDemo")

db.orders.aggregate([])


// db.orders.aggregate([
//     {
//         $match : {
//             category:"Fashion"
//         }
//     },
//     {
//         $project: {
//           _id:0,
//           customerId:1,
//           customerName :1,
//           status : 1,
//           city : 1,
//         }
//     }
// ])


// db.orders.aggregate([
//     {
//         $match : {
//             category:"Fashion"
//         }
//     },
//     {
//         $sort :{
//             customerName : -1
//         }
//     },
//     {
//         $limit : 3
//     },
//     {
//         $project: {
//           _id:0,
//           customerId:1,
//           customerName :1,
//           status : 1,
//           city : 1,
//           amount:1
//         }
//     }
// ])




// db.orders.aggregate([
//     {
//         $match : {
//             // $or : [
//             //     {
//             //         status : "delivered"
//             //     },
//             //     {
//             //         status : "shipped"
//             //     }
//             // ],

//             status : {$in : ["delivered","shipped"]},

//             amount : {
//                 $gte : 1500
//             }
//         }
//     },
//     {
//         $project: {
//           _id:0,
//           customerName :1,
//           status : 1,
//           amount : 1,
//         }
//     }
// ])


// db.orders.aggregate([
//     {
//         $match : {
//             amount : {$gte : 2000}
//         }
//     },{
//         $sort : {
//             amount : -1
//         }
//     },{
//         $project: {
//           _id : 0,
//           orderNo :1,
//           customerName : 1,
//           amount : 1
//         }
//     },
//     {
//         $limit: 5
//     }
// ])



// db.orders.aggregate([
//     {
//         $match : {
//             status : {$in : ["cancelled","pending"]},
//             amount : {$gte : 700}
//         }
//     },
//     {
//         $project: {
//           _id : 0,
//           orderNo :1,
//           customerName : 1,
//           status :1,
//           amount : 1
//         }
//     },
// ])


// db.orders.aggregate([
//     {
//         $project: {
//           _id : 0,
//           OrderId : "$orderNo",
//           orderStatus : "$status",
//           CityName : "$city",
//           MarkedPrice : "$amount",
//           OfferPrice : {$multiply : ["$amount",0.87]},
//         }
//     }
// ])




// db.orders.aggregate([
//     {
//         $addFields: {
//           MarkedPrice: "$amount",
//           OfferPrice : {$multiply : ["$amount",0.90]}
//         }
//     },
//     {
//         $project : {
//             _id : 0,
//             OrderId : "$orderNo",
//             cityName : "$city",
//             customerName : 1,
//             MarkedPrice : 1,
//             OfferPrice :1,
//             totalDiscount : {$subtract : ["$MarkedPrice","$OfferPrice"]}
//         }
//     }
// ])



// db.orders.aggregate([
//     {
//         $project: {
//           _id : 1,
//           orderNo : 1,
//           customerDetails : {
//             FullName : "$customerName",
//             ItemPurchased : "$items",
//             District : "$city"
//           },
//           amount : 1

//         }
//     }
// ])


