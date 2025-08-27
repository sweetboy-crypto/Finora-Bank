const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const cors = require('cors');

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

const PORT = process.env.PORT || 3001;

// A simple test route to make sure everything is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Welcome to the Finora API!' });
});

// Mount routers
const auth = require('./routes/auth');
const accounts = require('./routes/accounts');

app.use('/api/auth', auth);
app.use('/api/accounts', accounts);

const transactions = require('./routes/transactions');
app.use('/api/transactions', transactions);

const portfolio = require('./routes/portfolio');
app.use('/api/portfolio', portfolio);

const assets = require('./routes/assets');
app.use('/api/assets', assets);

const holdings = require('./routes/holdings');
app.use('/api/holdings', holdings);

const admin = require('./routes/admin');
app.use('/api/admin', admin);

const cards = require('./routes/cards');
app.use('/api/cards', cards);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
