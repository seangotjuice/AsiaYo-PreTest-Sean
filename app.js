const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(bodyParser.json());
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
