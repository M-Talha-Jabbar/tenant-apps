const express = require('express');
const router = express.Router();

const landlordController = require('../controllers/landlordController');

router.post('/create', landlordController.landlord_create);
router.post('/login', landlordController.landlord_login);
router.get('/landlords', landlordController.landlord_list);
router.get('/landlord/:CNIC', landlordController.landlord_details);
router.post('/landlord-property/:CNIC', landlordController.landlord_property_create);
router.delete('/landlord-property/:CNIC/:propertyId', landlordController.landlord_property_delete);

module.exports = router;