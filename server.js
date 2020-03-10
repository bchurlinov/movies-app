const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const fileUpload= require("express-fileupload");

// Init Express
const app = express();

// Set Cors
app.use(cors());
app.use(fileUpload());

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Init Single Route
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/post", require("./routes/postRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/movie", require("./routes/movieRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));