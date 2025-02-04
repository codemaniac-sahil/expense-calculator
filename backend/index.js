const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/connection');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Use auth routes
app.use('/api/auth', authRoutes);

// Use expense routes
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});