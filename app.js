const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000; 
/* 
Project running locally:
        The application will run locally on the port set in your .env file, if not set than will run on port 5000.
Also,
Project running on Hositing Services/Platforms(Production):
        When hosting your application on another service (like Heroku, Nodejitsu, and AWS), your host may independently configure the 
        process.env.PORT variable for you; after all, your script runs in their environment (thats why we have written process.env.PORT 
        in 1st or left operand). But if they have not set it than your application will run on port 5000.
*/

const cors = require('cors');

const landlordRoutes = require('./routes/landlordRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

const mongoose = require('mongoose');

const dbURI = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@nodetuts.2iktm.mongodb.net/${ process.env.DB_NAME }?retryWrites=true&w=majority`;

mongoose.connect(dbURI)
    .then(() => {
        app.listen(PORT);
    })
    .catch(err => console.log(err));

app.use(cors()); // Enable ALL CORS Requests

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api/landlords', landlordRoutes);

app.use('/api/tenants', tenantRoutes);