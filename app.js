const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
// the application will run locally on port 5000 but will use the environment variable on the Heroku servers.

const landlordRoutes = require('./routes/landlordRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://mtalha:test1234@nodetuts.2iktm.mongodb.net/tenant-app?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => {
        app.listen(PORT);
    })
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));

app.use('/api/landlords', landlordRoutes);

app.use("/api/tenants", tenantRoutes);