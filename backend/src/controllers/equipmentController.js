const EquipmentModel = require('../models/equipmentModel');

const EquipmentController = {
    createEquipment: (req, res) => {
        EquipmentModel.createEquipment(req.body, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error creating new equipment description', error: err });
            } else {
                res.status(201).json({ message: 'New equipment description created', data: results });
            }
        });
    },

    getAllEquipment: (req, res) => {
        EquipmentModel.getAllEquipment((err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching equipment descriptions', error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getEquipmentById: (req, res) => {
        EquipmentModel.getEquipmentById(req.params.id, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching equipment description', error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateEquipment: (req, res) => {
        EquipmentModel.updateEquipment(req.params.id, req.body, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error updating equipment description', error: err });
            } else {
                res.status(200).json({ message: 'Equipment description updated', data: results });
            }
        });
    },

    deleteEquipment: (req, res) => {
        EquipmentModel.deleteEquipment(req.params.id, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error deleting equipment description', error: err });
            } else {
                res.status(200).json({ message: 'Equipment description deleted', data: results });
            }
        });
    },
    // Additional methods as needed...
};

module.exports = EquipmentController;