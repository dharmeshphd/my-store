const express = require('express');

const databaseConnection = require('./src/config/database.connection');

const app = express();
app.use(express.json({extended: false}));

// Connect Database
databaseConnection();

// // Handel routing
app.use('/api', require('./src/routes/api/auth')); // Auth API Routes
app.use('/api', require('./src/routes/api/product')); // Product API Routes
app.use('/api', require('./src/routes/api/user')); // Product API Routes


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>`Server is running at port ${PORT}`) // npm run server