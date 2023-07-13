const express = require('express');
const app = express();
const PORT = process.env.PORT || 6000;

const paymentRoutes = require('./routes/payment-routes');
const radiusRoutes = require('./routes/radius-pppoe');

app.use(express.json());

app.use('/payments', paymentRoutes);

app.use('/radius', radiusRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});