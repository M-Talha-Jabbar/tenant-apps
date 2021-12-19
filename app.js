const express = require('express');
const app = express();

const landlordRoutes = require('./routes/landlordRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://mtalha:test1234@nodetuts.2iktm.mongodb.net/tenant-app?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));

app.use('/api/landlords', landlordRoutes);

app.use("/api/tenants", tenantRoutes);