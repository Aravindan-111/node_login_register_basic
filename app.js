const express = require("express");
const mongodb = require("./shared/mongo");
const app = express();
const userRoute = require("./routes/userRoute");

(async () => {
  try {
    await mongodb.connect();
    app.use(express.json());
    app.use("/users", userRoute);
    app.listen(5000, () => {
      console.log("Port is running at 5000");
    });
  } catch (err) {
    console.log(err);
  }
})();
