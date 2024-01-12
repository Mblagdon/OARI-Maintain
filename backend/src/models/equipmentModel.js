const db = require('../database');

const EquipmentModel = {
    // Create a new equipment description
    createEquipment: (data, callback) => {
        const query = "INSERT INTO equipment_descriptions (equipment_name, description, category, location, basic_specifications, storage_dimensions) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(query, [data.equipment_name, data.description, data.category, data.location, data.basic_specifications, data.storage_dimensions], (err, results) => {
            callback(err, results);
        });
    },
    // Get all equipment descriptions
    getAllEquipment: (callback) => {
        db.query('SELECT * FROM equipment_descriptions', (err, results) => {
            callback(err, results);
        });
    },

    // Get a single equipment description by ID
    getEquipmentById: (id, callback) => {
        db.query('SELECT * FROM equipment_descriptions WHERE id = ?', [id], (err, results) => {
            callback(err, results);
        });
    },

    // Update an equipment description
    updateEquipment: (id, data, callback) => {
        const query = "UPDATE equipment_descriptions SET equipment_name = ?, description = ?, category = ?, location = ?, basic_specifications = ?, storage_dimensions = ? WHERE id = ?";
        db.query(query, [data.equipment_name, data.description, data.category, data.location, data.basic_specifications, data.storage_dimensions, id], (err, results) => {
            callback(err, results);
        });
    },

    // Delete an equipment description
    deleteEquipment: (id, callback) => {
        db.query('DELETE FROM equipment_descriptions WHERE id = ?', [id], (err, results) => {
            callback(err, results);
        });
    },
    // Add additional CRUD operations as needed
};

module.exports = EquipmentModel;


