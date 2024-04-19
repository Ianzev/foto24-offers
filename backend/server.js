const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/productsRoutes");
const offersRouter = require("./routes/offersRoutes");
const usersRouter = require("./routes/usersRoutes");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productsRouter);
app.use("/offers", offersRouter);
app.use("/users", usersRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
