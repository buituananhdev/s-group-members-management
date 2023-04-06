const express = require('express');
const app = express();


// Require user route
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dùng userRoute cho tất cả các route bắt đầu bằng '/users'
app.use('/users', userRoutes);
// ... Other routes

app.listen(3000, () => console.log('Server started on port 3000'));