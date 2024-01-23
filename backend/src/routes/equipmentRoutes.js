/**
 * EquipmentRoutes.js
 *
 * This file defines the routes for equipment operations. It imports the EquipmentController
 * and assigns controller methods to specific HTTP request routes. This is where URL paths
 * are mapped to the controller logic, organizing how the server responds to clients'
 * requests for equipment data management.
 */

const express = require('express');
const router = express.Router();
const EquipmentController = require('../controllers/equipmentController');

// Routes for equipment
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

// Routes for maintenance
// Create a new maintenance record
router.post('/maintenance', EquipmentController.createMaintenance);

// Get all maintenance records
router.get('/maintenance', EquipmentController.getAllMaintenance);

// Route to get a single maintenance record by ID
router.get('/maintenance/:id', EquipmentController.getMaintenanceById);

// Update maintenance record
router.put('/maintenance/:id', EquipmentController.updateMaintenance);

// Deleting maintenance record
router.delete('/maintenance/:id', EquipmentController.deleteMaintenance);


// Routes for checkin/checkout
// Checkout equipment
router.post('/checkout', EquipmentController.checkoutEquipment);

// Check-in equipment
router.post('/checkin', EquipmentController.checkinEquipment);

// Get currently checked-out equipment
router.get('/checkedout-equipment', EquipmentController.getCurrentlyCheckedOutEquipment);


// Export the router
module.exports = router;
