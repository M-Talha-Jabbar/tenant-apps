const Landlord = require('../models/landlord');

const { nanoid } = require('nanoid');

const landlord_create = (req, res) => {
    const landlord = new Landlord(req.body);

    landlord
        .save()
        .then(() => res.json({ result: "Landlord created successfully!" }))
        .catch(err => res.status(404).json({ message: err.message }));
};

const landlord_login = (req, res) => {
    Landlord
        .find({ name: req.body.name, password: req.body.password })
        .then(data => res.json(data)) // if no match is found, stil the control will fall in 'then' block with the data equal to [] (empty).
        .catch(err => res.json(err));
};

const landlord_list = (req, res) => {
    Landlord
        .find({})
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

const landlord_details = (req, res) => {
    const cnic = req.params.CNIC; // Accessing Route Parameters

    Landlord
        .find({
            cnic: cnic
        })
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

const landlord_property_create = (req, res) => {
    const cnic = req.params.CNIC;

    req.body.property_id = nanoid();

    Landlord
        .findOneAndUpdate(
        {
            cnic: cnic
        }, 
        {
            $push: { properties: req.body }
        }
        )
        .then(() => res.json({result: "Document updated successfully!"}))
        .catch(err => res.json(err));
};

const landlord_property_delete = (req, res) => {
    const cnic = req.params.CNIC;
    const property_id = req.params.propertyId;

    Landlord
        .findOneAndUpdate(
        {
            cnic: cnic
        }, 
        {
            $pull: { properties: { property_id: property_id } }
        }
        )
        .then(() => res.json({result: "Document deleted successfully!"}))
        .catch(err => res.json(err));
};

module.exports = {
    landlord_create, landlord_login, landlord_list, landlord_details, landlord_property_create, landlord_property_delete
};