const res = require('express/lib/response');
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

// Document Middleware with post middleware function
landlordSchema.post('save', function(error,doc,next){
    if(error.name === 'MongoServerError' && error.code === 11000){
        // MongoServerError with code 11000 will trigger after you try save a duplicate so thats why this is a post middleware.
        
        next(new Error('There was a duplicate CNIC error.')); // This error will be thrown in the 'catch' block.
        // Middleware execution normally stops the first time a piece of middleware calls next() with an error.
    } else{
        // Call the next function in the post-save chain
        next();
    }
});

module.exports = mongoose.model('Landlord', landlordSchema);