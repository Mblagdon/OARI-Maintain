const express = require('express');
const router = express.Router();
const EquipmentController = require('../controllers/equipmentController');

router.post('/equipment', EquipmentController.createEquipment);
router.get('/equipment', EquipmentController.getAllEquipment);
router.get('/equipment/:id', EquipmentController.getEquipmentById);
router.put('/equipment/:id', EquipmentController.updateEquipment);
router.delete('/equipment/:id', EquipmentController.deleteEquipment);


// Export the router
module.exports = router;
