const express = require('express');
const router = express.Router();
const EquipmentModel = require('../models/equipmentModel');

router.get('/equipment', (req, res) => {
    EquipmentModel.getAllEquipment((err, results) => {
        if(err) {
            res.status(500).json({ message: 'Error fetching equipment' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Export the router
module.exports = router;
