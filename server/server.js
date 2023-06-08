const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const worksheetRouter = require("./route/worksheetRoute");
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/api", worksheetRouter);
mongoose
  .connect(
    "mongodb+srv://azhaan:azhaan123@cluster0.tt9fmfb.mongodb.net/elibrary",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
