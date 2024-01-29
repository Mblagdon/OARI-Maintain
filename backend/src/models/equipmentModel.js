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
    /// Create a new equipment description
    createEquipment: (data) => {
        return new Promise((resolve, reject) => {
            // Start a transaction
            db.beginTransaction(err => {
                if (err) {
                    reject(err);
                    return;
                }

                const query = `INSERT INTO equipment_descriptions (
                type, equipment_name, description, category, location,
                basic_specifications, storage_dimensions,
                min_temp, max_temp, max_wind_resistance, min_lighting,
                date_bought, renewal_date, price
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                db.query(query, [
                    data.type,
                    data.equipment_name, data.description, data.category,
                    data.location, data.basic_specifications, data.storage_dimensions,
                    data.min_temp, data.max_temp, data.max_wind_resistance, data.min_lighting,
                    data.date_bought, data.renewal_date, data.price
                ], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            reject(err);
                        });
                    }

                    const equipmentId = results.insertId;

                    // If the type is not software, commit the transaction
                    if (data.type !== 'software') {
                        return db.commit(err => {
                            if (err) {
                                return db.rollback(() => {
                                    reject(err);
                                });
                            }
                            resolve({ equipmentId: equipmentId });
                        });
                    }

                    // If type is software, calculate the maintenance frequency
                    const daysDifferenceQuery = `SELECT DATEDIFF(?, ?) AS difference`;

                    db.query(daysDifferenceQuery, [data.renewal_date, data.date_bought], (err, frequencyResults) => {
                        if (err) {
                            return db.rollback(() => {
                                reject(err);
                            });
                        }

                        const daysDifference = frequencyResults[0].difference;
                        const maintenanceFrequency = `${daysDifference} days`;

                        // Insert into equipment_management table
                        const maintenanceQuery = `
                            INSERT INTO equipment_management (
                                equipment_id, type, status, last_maintenance_date,
                                next_maintenance_date, maintenance_frequency,
                                maintenance_to_be_performed
                            ) VALUES (?, ?, ?, ?, ?, ?, ?)
                        `;

                        db.query(maintenanceQuery, [
                            equipmentId, data.type, 'pending', data.date_bought,
                            data.renewal_date, maintenanceFrequency, 'Update Subscription'
                        ], (err, maintenanceResults) => {
                            if (err) {
                                return db.rollback(() => {
                                    reject(err);
                                });
                            }

                            // If all goes well, commit the transaction
                            db.commit(err => {
                                if (err) {
                                    return db.rollback(() => {
                                        reject(err);
                                    });
                                }
                                resolve({
                                    equipmentId: equipmentId,
                                    maintenanceId: maintenanceResults.insertId
                                });
                            });
                        });
                    });
                });
            });
        });
    },


    // Get all equipment descriptions
    getAllEquipment: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM equipment_descriptions
                       ORDER BY CASE type
                         WHEN 'drone' THEN 1
                         WHEN 'equipment' THEN 2
                         WHEN 'software' THEN 3
                         END`;

            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    // Get a single equipment description by ID
    getEquipmentById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM equipment_descriptions WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    // Update an equipment description
    updateEquipment: (id, data) => {
        return new Promise((resolve, reject) => {
            // Preprocess data for non-software types
            if (data.type !== 'software') {
                data.date_bought = data.date_bought ? data.date_bought : null;
                data.renewal_date = data.renewal_date ? data.renewal_date : null;
                data.price = data.price ? data.price : null;
            }

            const query = `UPDATE equipment_descriptions SET 
            type = ?, equipment_name = ?, description = ?, category = ?, 
            location = ?, basic_specifications = ?, storage_dimensions = ?, 
            min_temp = ?, max_temp = ?, max_wind_resistance = ?, 
            min_lighting = ?, date_bought = ?, renewal_date = ?, price = ?
            WHERE id = ?`;

            db.query(query, [
                data.type,
                data.equipment_name,
                data.description,
                data.category,
                data.location,
                data.basic_specifications,
                data.storage_dimensions,
                data.min_temp,
                data.max_temp,
                data.max_wind_resistance,
                data.min_lighting,
                data.date_bought,
                data.renewal_date,
                data.price,
                id
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Delete an equipment description
    deleteEquipment: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM equipment_descriptions WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Maintenance schedule
    // Create maintenance schedule
    createMaintenance: (maintenanceData) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO equipment_management (
                    type,
                    equipment_id,
                    status,
                    last_maintenance_date,
                    next_maintenance_date,
                    maintenance_frequency,
                    maintenance_to_be_performed
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            db.query(
                query,
                [
                    maintenanceData.type,
                    maintenanceData.equipment_id,
                    maintenanceData.status,
                    maintenanceData.last_maintenance_date,
                    maintenanceData.next_maintenance_date,
                    maintenanceData.maintenance_frequency,
                    maintenanceData.maintenance_to_be_performed
                ],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    // Get maintenance schedule
    getAllMaintenance: () => {
        return new Promise((resolve, reject) => {
            const query = `
        SELECT em.*, eq.equipment_name
        FROM equipment_management em
        JOIN equipment_descriptions eq ON em.equipment_id = eq.id`;

            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Get single maintenance schedule
    getMaintenanceById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM equipment_management WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Update maintenance schedule
    updateMaintenance: (id, maintenanceData) => {
        return new Promise((resolve, reject) => {
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
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    // Delete maintenance schedule
    deleteMaintenance: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM equipment_management WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Checkin/Checkout
    // Check out equipment
    checkoutEquipment: (equipmentId, checkoutDate) => {
        return new Promise((resolve, reject) => {
            // First check if the equipment is already checked out
            const checkQuery = `SELECT * FROM equipment_checkout WHERE equipment_id = ? AND checkin_date IS NULL`;
            db.query(checkQuery, [equipmentId], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length > 0) {
                    // If results are returned, the equipment is already checked out
                    reject(new Error('Equipment is already checked out'));
                } else {
                    // Equipment is not checked out, proceed with checkout
                    const query = `INSERT INTO equipment_checkout (equipment_id, checkout_date) VALUES (?, ?)`;
                    db.query(query, [equipmentId, checkoutDate], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    },

    // Can be altered to grab historic weather from when equipment was used when plan is upgraded
    // Check in equipment
    checkinEquipment: (equipmentId, checkinDate, comments, usageDuration, weatherData, location) => {
        return new Promise((resolve, reject) => {
            const query = `
            UPDATE equipment_checkout 
            SET 
                checkin_date = ?, 
                comments = ?, 
                usage_duration = ?, 
                weather_data = ?, 
                location = ?
            WHERE 
                equipment_id = ? AND 
                checkin_date IS NULL
        `;
            db.query(query, [
                checkinDate,
                comments,
                usageDuration,
                JSON.stringify(weatherData), // Serialize the weather data to a JSON string
                location,
                equipmentId
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },


    // Get the checked out equipment
    getCurrentlyCheckedOutEquipment: () => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT ec.*, ed.equipment_name 
            FROM equipment_checkout AS ec
            JOIN equipment_descriptions AS ed ON ec.equipment_id = ed.id
            WHERE ec.checkin_date IS NULL
        `;
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Get the historical checked out equipment
    getCheckedOutHistory: () => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
                ec.*, 
                ed.equipment_name,
                ec.checkout_date, 
                ec.checkin_date, 
                ec.usage_duration, 
                ec.location, 
                ec.comments, 
                ec.weather_data
            FROM equipment_checkout AS ec
            JOIN equipment_descriptions AS ed ON ec.equipment_id = ed.id
            WHERE ec.checkin_date IS NOT NULL
            ORDER BY ec.checkin_date DESC
        `;
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const history = results.map(record => ({
                        ...record,
                        weather_data: JSON.parse(record.weather_data) // Assuming weather_data is stored as a JSON string
                    }));
                    resolve(history);
                }
            });
        });
    },
};

module.exports = EquipmentModel;


