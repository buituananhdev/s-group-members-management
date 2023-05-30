const express = require('express');
const app = express();
// Require user route
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
// ... Other routes


app.listen(8000, () => console.log('Server started on port 8000'));