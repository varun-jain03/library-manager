const express = require('express');
require('dotenv').config();
const { connectDB } = require('./config/db.js');
const { authRoutes } = require('./routes/auth.routes.js');
const bookRoutes = require('./routes/book.routes.js');
const { myBookRoutes } = require('./routes/myBook.routes.js');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

// Connect to database once at startup
connectDB();

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/mybooks', myBookRoutes);

app.get('/', (req, res) => {
  res.send('Server running successfully ✅');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
