use("aggregationDemo");

// db.orders.aggregate([
//     {
//         $skip: 18
//     }
// ])

// const incrementBy=4;
// const pages =1;

// db.orders.aggregate([
    
//     {
//         $skip: incrementBy * (pages -1)
//     },
//     {
//         $limit: 4
//     },
//     {
//         $project: {
//           _id : 0,
//           orderNo : 1,
//           customerName :1,
//           amount : 1
//         }
//     }
// ])




// db.orders.aggregate([
//     {
//         $unwind: "$items"
//     },
//     {
//         $project: {
//           _id :0,
//           customerName :1,
//           category : 1,
//           amount : 1,
//           itemName : "$items.name",
//           itemPrice : "$items.price"
//         }
//     }
// ])


// db.orders.aggregate([
//     {
//         $unwind : "$items"
//     },
//     {
//         $project: {
//           _id : 0,
//           customerName : 1,
//           itemName : "$items.name",
//           itemQunatity : "$items.quantity",
//           itemAmt : "$items.price",
//           totalAmt : {$multiply : ["$items.quantity","$items.price"]}

//         }
//     }
// ])


// db.orders.aggregate([
//     {
//         $unwind : "$items"
//     },
//     {
//         $group: {
//           _id: "$items.name",
//           soldProdAmt : {$sum : {$multiply : ["$items.price","$items.quantity"]}}
//         }
//     }
// ])


db.orders.aggregate([
    {
        $unwind : "$items"
    },
    {
        $group: {
          _id: "$items.name",
          totalCount : {$sum : 1}
        }
    },
    {
        $sort: {
          totalCount: -1
        }
    }
])