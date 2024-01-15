const express = require('express');
const router = express.Router();
const EquipmentController = require('../controllers/equipmentController');

// Create new equipment description
router.post('/equipment', EquipmentController.createEquipment);

// Get all equipment descriptions
router.get('/equipment', EquipmentController.getAllEquipment);

// Get a single equipment description by ID
router.get('/equipment/:id', EquipmentController.getEquipmentById);

// Update an equipment description
router.put('/equipment/:id', EquipmentController.updateEquipment);

// Delete an equipment description
router.delete('/equipment/:id', EquipmentController.deleteEquipment);

// Export the router
module.exports = router;
