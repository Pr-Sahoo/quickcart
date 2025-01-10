const connectToMongo = require("./db");
const express = require('express');
var cors = require("cors");
// require("dotenv").config();
const path = require("path");

connectToMongo();
const app = express()
const port = 5000
// const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/orders", require("./routes/order"));
app.get('/test', (req, res) => {
  res.send({ message: 'Test route is working!' });
});

// serve the static files from react app in production
// if(process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "build")));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})