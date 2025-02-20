const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const applicationRoutes = require("./routes/applicationsRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const searchRoutes = require('./routes/search');
const jobRoutes = require("./routes/jobsRoutes");
require("dotenv").config();
const app = express();
const cors = require('cors');

const upload = multer({ dest: 'uploads/' });

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['POST', 'PUT', 'GET', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


// Middleware
app.use(bodyParser.json());
// app.use(upload.any());

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });


// Routes
app.use("/api/auth", authRoutes);
app.use('/api', searchRoutes);
app.use("/api", userRoutes);
app.use("/api", applicationRoutes);
app.use("/api", categoryRoutes);
app.use("/api", jobRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
