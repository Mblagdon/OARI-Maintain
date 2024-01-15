const express = require('express');
const app = express();
const equipmentRoutes = require('./routes/equipmentRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', equipmentRoutes);

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

