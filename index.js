const express = require('express');
const app = express();


// Require user route
const userRoutes = require('./routes/user');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Dùng userRoute cho tất cả các route bắt đầu bằng '/users'
app.use('/users', userRoutes);
// ... Other routes

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(3000, () => console.log('Server started on port 3000'));