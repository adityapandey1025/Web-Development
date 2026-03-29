// ================= CALLBACK VERSION (HELL) =================
console.log("Hello")
function getUserCB(id, cb) {
  setTimeout(() => {
      cb({ id, name: "Aditya" });
      console.log("getUserCB")}, 5000);
  
}

function getOrdersCB(userId, cb) {
  setTimeout(() => {
      cb([{ id: 101, item: "Laptop" }]);
      console.log("getOrdersCB")}, 2000);
}

function getPaymentStatusCB(orderId, cb) {
  setTimeout(() =>{
      
  cb("PAID");
  console.log("getPaymentStatusCB")},
  1000);
}

getUserCB(1, function (user) {
  getOrdersCB(user.id, function (orders) {
    getPaymentStatusCB(orders[0].id, function (status) {
      console.log("Callback Hell → Payment:", status);
    });
  });
});
console.log("World")
