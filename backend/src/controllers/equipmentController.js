/**
 * EquipmentController.js
 *
 * This controller handles all the business logic for equipment operations.
 * It interacts with the EquipmentModel to carry out CRUD operations and communicates
 * with the client by sending HTTP responses. Each method corresponds to a specific
 * route's logic.
 */

import EquipmentModel from '../models/equipmentModel.js';

const EquipmentController = {
    // Equipment Description
    // Create a new equipment description
    createEquipment: async (req, res) => {
        try {
            const results = await EquipmentModel.createEquipment(req.body);
            res.status(201).json({ message: 'New equipment description created', data: results });
        } catch (err) {
            res.status(500).json({ message: 'Error creating new equipment description', error: err });
        }
    },

    // Get all equipment descriptions
    getAllEquipment: async (req, res) => {
        try {
            const results = await EquipmentModel.getAllEquipment();
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching equipment descriptions', error: err });
        }
    },


    // Get a single equipment description by ID
    getEquipmentById: async (req, res) => {
        try {
            const results = await EquipmentModel.getEquipmentById(req.params.id);
            if (results.length === 0) {
                res.status(404).json({ message: 'Equipment description not found' });
            } else {
                res.status(200).json(results[0]);
            }
        } catch (err) {
            res.status(500).json({ message: 'Error fetching equipment description', error: err });
        }
    },

    // Update an equipment description
    updateEquipment: async (req, res) => {
        try {
            const equipmentId = req.params.id;
            const equipmentData = req.body;

            const results = await EquipmentModel.updateEquipment(equipmentId, equipmentData);

            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Equipment description not found' });
            } else {
                res.status(200).json({ message: 'Equipment description updated successfully', data: results });
            }
        } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ message: 'Error updating equipment description', error: error.message });
        }
    },

    // Delete an equipment description
    deleteEquipment: async (req, res) => {
        try {
            const results = await EquipmentModel.deleteEquipment(req.params.id);
            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Equipment description not found' });
            } else {
                res.status(200).json({ message: 'Equipment description deleted', data: results });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error deleting equipment description', error: err });
        }
    },

    // Maintenance Schedule
    // Create maintenance schedule
    createMaintenance: async (req, res) => {
        try {
            const results = await EquipmentModel.createMaintenance(req.body);
            res.status(201).json({ message: 'Maintenance record created successfully', data: results });
        } catch (err) {
            res.status(500).json({ message: 'Error creating maintenance record', error: err });
        }
    },

    // Get maintenance schedule
    getAllMaintenance: async (req, res) => {
        try {
            const results = await EquipmentModel.getAllMaintenance();
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching maintenance records', error: err });
        }
    },

    // Get single maintenance schedule by id
    getMaintenanceById: async (req, res) => {
        try {
            const results = await EquipmentModel.getMaintenanceById(req.params.id);
            if (results.length === 0) {
                res.status(404).json({ message: 'Maintenance record not found' });
            } else {
                res.status(200).json(results[0]);
            }
        } catch (err) {
            res.status(500).json({ message: 'Error fetching maintenance record', error: err });
        }
    },

    // Update the maintenance schedule
    updateMaintenance: async (req, res) => {
        try {
            const results = await EquipmentModel.updateMaintenance(req.params.id, req.body);
            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Maintenance record not found' });
            } else {
                res.status(200).json({ message: 'Maintenance record updated successfully', data: results });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error updating maintenance record', error: err });
        }
    },

    // Delete maintenance schedule
    deleteMaintenance: async (req, res) => {
        try {
            const results = await EquipmentModel.deleteMaintenance(req.params.id);
            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Maintenance record not found' });
            } else {
                res.status(200).json({ message: 'Maintenance record deleted successfully' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error deleting maintenance record', error: err });
        }
    },



    // Checkin/Checkout
    // Checkout a piece of equipment
    checkoutEquipment: async (req, res) => {
        const { equipment_id, checkout_date } = req.body;

        try {
            const result = await EquipmentModel.checkoutEquipment(equipment_id, checkout_date);
            res.status(201).json({ message: 'Equipment checked out successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error checking out equipment', error: error.message });
        }
    },
    // Checkin a piece of equipment
    checkinEquipment: async (req, res) => {
        const { equipment_id, checkin_date, comments, usage_duration, weather, location } = req.body;

        try {
            const result = await EquipmentModel.checkinEquipment(
                equipment_id,
                checkin_date,
                comments,
                usage_duration,
                weather,
                location
            );
            res.status(200).json({ message: 'Equipment checked in successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error checking in equipment', error: error.message });
        }
    },
    // View all checked out equipment
    getCurrentlyCheckedOutEquipment: async (req, res) => {
        try {
            const checkedOutEquipment = await EquipmentModel.getCurrentlyCheckedOutEquipment();
            res.status(200).json(checkedOutEquipment);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching checked out equipment', error: error.message });
        }
    },

    // Get historical checked out equipment
    getCheckedOutHistory: async (req, res) => {
        try {
            const history = await EquipmentModel.getCheckedOutHistory();
            res.status(200).json(history);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching checked out history', error: error.message });
        }
    },
};

// Export the controller methods
export default EquipmentController;