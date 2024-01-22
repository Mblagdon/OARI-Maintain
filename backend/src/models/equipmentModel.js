/**
 * EquipmentModel.js
 *
 * This model represents the structure and methods used to interact with the database
 * regarding equipment data. It provides a set of functions to perform CRUD operations
 * on the 'equipment_descriptions' and 'equipment_management' tables. It uses the mysql2
 * library to execute SQL queries.
 */

const db = require('../database');

const EquipmentModel = {
    // Equipment Description
    // Create a new equipment description
    createEquipment: (data, callback) => {
        const query = `INSERT INTO equipment_descriptions (
            equipment_name, description, category, location,
            basic_specifications, storage_dimensions,
            min_temp, max_temp, max_wind_resistance, min_lighting
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [
            data.equipment_name, data.description, data.category,
            data.location, data.basic_specifications, data.storage_dimensions,
            data.min_temp, data.max_temp, data.max_wind_resistance, data.min_lighting
        ], (err, results) => {
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
        const query = `UPDATE equipment_descriptions SET 
        equipment_name = ?, description = ?, category = ?, 
        location = ?, basic_specifications = ?, storage_dimensions = ?, 
        min_temp = ?, max_temp = ?, max_wind_resistance = ?, 
        min_lighting = ? WHERE id = ?`;

        db.query(query, [
            data.equipment_name, data.description, data.category,
            data.location, data.basic_specifications, data.storage_dimensions,
            data.min_temp, data.max_temp, data.max_wind_resistance,
            data.min_lighting, id], (err, results) => {
            callback(err, results);
        });
    },

    // Delete an equipment description
    deleteEquipment: (id, callback) => {
        db.query('DELETE FROM equipment_descriptions WHERE id = ?', [id], (err, results) => {
            callback(err, results);
        });
    },

    // Maintenance schedule
    // Create maintenance schedule
    createMaintenance: (maintenanceData, callback) => {
        const query = `
        INSERT INTO equipment_management (
            equipment_id, 
            status, 
            last_maintenance_date, 
            next_maintenance_date, 
            maintenance_frequency,
            maintenance_to_be_performed
        ) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(
            query,
            [
                maintenanceData.equipment_id,
                maintenanceData.status,
                maintenanceData.last_maintenance_date,
                maintenanceData.next_maintenance_date,
                maintenanceData.maintenance_frequency,
                maintenanceData.maintenance_to_be_performed
            ],
            callback
        );
    },

    // Get maintenance schedule
    getAllMaintenance: (callback) => {
        const query = `
        SELECT em.*, eq.equipment_name
        FROM equipment_management em
        JOIN equipment_descriptions eq ON em.equipment_id = eq.id
    `;
        db.query(query, (err, results) => {
            callback(err, results);
        });
    },

    // Get single maintenance schedule
    getMaintenanceById: (id, callback) => {
        const query = 'SELECT * FROM equipment_management WHERE id = ?';
        db.query(query, [id], (err, results) => {
            callback(err, results);
        });
    },

    // Update maintenance schedule
    updateMaintenance: (id, maintenanceData, callback) => {
        const query = `
        UPDATE equipment_management 
        SET 
            status = ?, 
            last_maintenance_date = ?, 
            next_maintenance_date = ?, 
            maintenance_frequency = ?,
            maintenance_to_be_performed = ? 
        WHERE id = ?`;
        db.query(
            query,
            [
                maintenanceData.status,
                maintenanceData.last_maintenance_date,
                maintenanceData.next_maintenance_date,
                maintenanceData.maintenance_frequency,
                maintenanceData.maintenance_to_be_performed,
                id
            ],
            callback
        );
    },

    // Delete maintenance schedule
    deleteMaintenance: (id, callback) => {
        const query = 'DELETE FROM equipment_management WHERE id = ?';
        db.query(query, [id], (err, results) => {
            callback(err, results);
        });
    },

};

module.exports = EquipmentModel;


