const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
    cnic: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    properties: [ // array of objects
        {
            property_id: {
                type: String,
                required: true
            },
            locality: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            rent: {
                type: String,
                required: true
            },
            rooms: {
                type: Number,
                require: true
            }
        }
    ]
});

module.exports = mongoose.model('Landlord', landlordSchema);