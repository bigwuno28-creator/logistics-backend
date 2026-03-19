const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const shipmentRoutes = require('./routes/shipmentRoutes');
const adminRoutes = require("./routes/adminRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/shipments', shipmentRoutes);
app.use("/api/admin", adminRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get('/', (req,res)=>{
  res.send("Logistics Backend Running");
});

app.listen(PORT, ()=>{
  console.log(`Backend server running on http://localhost:${PORT}`);
});