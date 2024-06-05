// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/tasks', taskRoutes);
app.use('/auth', userRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});
