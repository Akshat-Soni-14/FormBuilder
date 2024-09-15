const express = require('express');
const formRoutes = require('./routes/formRoutes');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// Connect to DB
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };
connectDB()

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
