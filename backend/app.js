const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');

// configure env variables
dotenv.config();

// initilize express app
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// connect to DB
connectDB();

app.get('/', (req, res) => {
  return res.json({
    message: `Welcome To SmartLearn's API`,
  });
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
