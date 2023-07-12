const express = require('express');
const app = express();
const PORT = process.env.PORT || 6000;

const paymentRoutes = require('./routes/routes');
app.use(express.json());

app.use('/payments', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});