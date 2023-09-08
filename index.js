const express = require('express');
const app = express();
const cors = require('cors');
// Require user route
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const pollRoutes = require('./routes/polls');
const authorizationRoutes = require('./routes/authorization')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/polls', pollRoutes);
app.use('/authorization', authorizationRoutes)
// ... Other routes


app.listen(8001, () => console.log('Server started on port 8001'));