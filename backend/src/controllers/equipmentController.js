/**
 * EquipmentController.js
 *
 * This controller handles all the business logic for equipment operations.
 * It interacts with the EquipmentModel to carry out CRUD operations and communicates
 * with the client by sending HTTP responses. Each method corresponds to a specific
 * route's logic.
 */

const EquipmentModel = require('../models/equipmentModel');

const EquipmentController = {
    // Equipment Description
    // Create a new equipment description
    createEquipment: (req, res) => {
        const data = req.body;
        EquipmentModel.createEquipment(data, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating new equipment description', error: err });
            }
            res.status(201).json({ message: 'New equipment description created', data: results });
        });
    },

    // Get all equipment descriptions
    getAllEquipment: (req, res) => {
        EquipmentModel.getAllEquipment((err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching equipment descriptions', error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    // Get a single equipment description by ID
    getEquipmentById: (req, res) => {
        EquipmentModel.getEquipmentById(req.params.id, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching equipment description', error: err });
            } else {
                // Check if any equipment was actually found
                if (results.length === 0) {
                    res.status(404).json({ message: 'Equipment description not found' });
                } else {
                    res.status(200).json(results[0]);
                }
            }
        });
    },

    // Update an equipment description
    updateEquipment: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        EquipmentModel.updateEquipment(id, data, (err, results) => {
            if (err) {

                return res.status(500).json({ message: 'Error updating equipment description', error: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Equipment description not found' });
            }
            res.status(200).json({ message: 'Equipment description updated successfully', data: results });
        });
    },

    // Delete an equipment description
    deleteEquipment: (req, res) => {
        EquipmentModel.deleteEquipment(req.params.id, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error deleting equipment description', error: err });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Equipment description not found' });
            } else {
                res.status(200).json({ message: 'Equipment description deleted', data: results });
            }
        });
    },

    // Maintenance Schedule
    // Create maintenance schedule
    createMaintenance: (req, res) => {
        EquipmentModel.createMaintenance(req.body, (err, results) => {
            if (err)
            {
                res.status(500).json({ message: 'Error creating maintenance record', error: err });
            } else {
                res.status(201).json({ message: 'Maintenance record created successfully', data: results });
            }
        });
    },

    // Get maintenance schedule
    getAllMaintenance: (req, res) => {
        EquipmentModel.getAllMaintenance((err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching maintenance records', error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    // Get single maintenance schedule by id
    getMaintenanceById: (req, res) => {
        const { id } = req.params;
        EquipmentModel.getMaintenanceById(id, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching maintenance record', error: err });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'Maintenance record not found' });
            } else {
                res.status(200).json(results[0]);
            }
        });
    },

    // Update the maintenance schedule
    updateMaintenance: (req, res) => {
        const { id } = req.params;
        EquipmentModel.updateMaintenance(id, req.body, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error updating maintenance record', error: err });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Maintenance record not found' });
            } else {
                res.status(200).json({ message: 'Maintenance record updated successfully', data: results });
            }
        });
    },

    // Delete maintenance schedule
    deleteMaintenance: (req, res) => {
        const { id } = req.params;
        EquipmentModel.deleteMaintenance(id, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error deleting maintenance record', error: err });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Maintenance record not found' });
            } else {
                res.status(200).json({ message: 'Maintenance record deleted successfully' });
            }
        });
    },



    // Checkin/Checkout

    checkoutEquipment: async (req, res) => {
        const { equipment_id, checkout_date } = req.body;

        try {
            // Here you would call a method to create a checkout record in the database
            await EquipmentModel.checkoutEquipment(equipment_id, checkout_date);

            // If successful, send a response back to the client
            res.status(201).json({ message: 'Equipment checked out successfully' });
        } catch (error) {
            // If there's an error, respond with an error message
            res.status(500).json({ message: 'Error checking out equipment', error: error.message });
        }
    },

    checkinEquipment: async (req, res) => {
        const { equipment_id, checkin_date, comments, usage_duration, weather_data } = req.body;

        try {
            // Here you would call a method to create a check-in record in the database
            await EquipmentModel.checkinEquipment(equipment_id, checkin_date, comments, usage_duration, weather_data);

            // If successful, send a response back to the client
            res.status(200).json({ message: 'Equipment checked in successfully' });
        } catch (error) {
            // If there's an error, respond with an error message
            res.status(500).json({ message: 'Error checking in equipment', error: error.message });
        }
    },

    getCurrentlyCheckedOutEquipment: async (req, res) => {
        try {
            // Fetch equipment that has a checkout_date but no checkin_date
            const checkedOutEquipment = await EquipmentModel.getCurrentlyCheckedOutEquipment();

            // Respond with the currently checked out equipment
            res.status(200).json(checkedOutEquipment);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching checked out equipment', error: error.message });
        }
    },
};


module.exports = EquipmentController;