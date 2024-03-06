/**
 * EquipmentController.js
 *
 * This controller handles all the business logic for equipment operations.
 * It interacts with the EquipmentModel to carry out CRUD (Create, Read, Update, Delete) operations and communicates
 * with the client by sending HTTP responses. Each method corresponds to a specific
 * route's logic.
 */

import EquipmentModel from '../models/equipmentModel.js';

const EquipmentController = {
    // Equipment Description

    // Create a new equipment description
    // Accepts equipment data from request body, creates a new equipment entry using EquipmentModel,
    // and sends a response with the created equipment data or an error message.
    createEquipment: async (req, res) => {
        try {
            const results = await EquipmentModel.createEquipment(req.body);
            res.status(201).json({ message: 'New equipment description created', data: results });
        } catch (err) {
            res.status(500).json({ message: 'Error creating new equipment description', error: err });
        }
    },

    // Get all equipment descriptions
    // Fetches all equipment descriptions from the database using EquipmentModel
    // and returns them in the response, or an error message if an issue occurs.
    getAllEquipment: async (req, res) => {
        try {
            const results = await EquipmentModel.getAllEquipment();
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching equipment descriptions', error: err });
        }
    },


    // Get a single equipment description by ID
    // Retrieves a specific equipment description based on the provided ID in the request parameters,
    // returning either the found equipment or an error message.
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
    // Updates a specific equipment description identified by the ID in the request parameters
    // with the new data provided in the request body, and responds with the updated information or an error message.
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
    // Deletes a specific equipment description based on the provided ID in the request parameters
    // and sends a confirmation response or an error message if the equipment is not found or an issue occurs.
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
    // Accepts maintenance data from the request body and creates a new maintenance record in the database,
    // returning the created record or an error message.
    createMaintenance: async (req, res) => {
        try {
            const results = await EquipmentModel.createMaintenance(req.body);
            res.status(201).json({ message: 'Maintenance record created successfully', data: results });
        } catch (err) {
            res.status(500).json({ message: 'Error creating maintenance record', error: err });
        }
    },

    // Get maintenance schedule
    // Retrieves all maintenance records from the database and returns them, or an error message if an issue occurs.
    getAllMaintenance: async (req, res) => {
        try {
            const results = await EquipmentModel.getAllMaintenance();
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching maintenance records', error: err });
        }
    },

    // Get single maintenance schedule by id
    // Fetches a specific maintenance record by ID provided in the request parameters,
    // returning the record or an error message.
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
    // Updates a specific maintenance record with the new data provided in the request body,
    // based on the record ID in the request parameters, and responds with the updated information or an error message.
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
    // Deletes a specific maintenance record based on the ID provided in the request parameters,
    // returning a confirmation response or an error message.
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
    // Processes a checkout request for a piece of equipment, saving the checkout details to the database and
    // returning a success message or an error message.
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
    // Processes a checkin request for a piece of equipment, recording the checkin details in the database and
    // returning a success message or an error message.
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
    // Retrieves and returns a list of all currently checked out equipment, or an error message if unable to fetch the data.
    getCurrentlyCheckedOutEquipment: async (req, res) => {
        try {
            const checkedOutEquipment = await EquipmentModel.getCurrentlyCheckedOutEquipment();
            res.status(200).json(checkedOutEquipment);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching checked out equipment', error: error.message });
        }
    },

    // Get historical checked out equipment
    // Retrieves and returns the historical data of checked out equipment, or an error message if unable to fetch the data.
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