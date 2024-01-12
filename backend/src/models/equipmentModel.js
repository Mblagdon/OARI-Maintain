const db = require('../../config/database');

const EquipmentModel = {
    getAllEquipment: (callback) => {
        db.query('SELECT * FROM equipment', (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },
    // Add more methods as needed
};

module.exports = EquipmentModel;
