const EquipmentModel = require('../models/equipmentModel');

const EquipmentController = {
    // Create a new equipment description
    createEquipment: (req, res) => {
        EquipmentModel.createEquipment(req.body, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error creating new equipment description', error: err });
            } else {
                res.status(201).json({ message: 'New equipment description created', data: results });
            }
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
        EquipmentModel.updateEquipment(req.params.id, req.body, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error updating equipment description', error: err });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Equipment description not found' });
            } else {
                res.status(200).json({ message: 'Equipment description updated successfully', id: req.params.id });
            }
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
};

module.exports = EquipmentController;