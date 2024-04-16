// --------------------------------------------------------------------------------------------------

// const obj = {
//     "user": {
//         "userId": 5,
//         "username": "Ilvian Dimco",
//         "email": "d.ilvian1993@gmail.com"
//     }
// }
// console.log(obj.user)
// const { userId, username, email } = obj.user

// console.log({ userId, username, email })

// --------------------------------------------------------------------------------------------------

// const x = Math.floor(Math.random() * 1000000)
// console.log(x)

// --------------------------------------------------------------------------------------------------

function getOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = { id: 1, item: "Pizza" };
        // Simulate success
        resolve(order);
        // Simulate failure
        // reject("Sorry, kitchen is closed");
      }, 2000);
    });
  }
  
  getOrder()
    .then((order) => {
      console.log("Order 1 received:", order);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  
  // Using Async/Await
  async function getOrderAsync() {
    try {
      const order = await getOrder();
      console.log("Order 2 received :", order);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  getOrderAsync();
    