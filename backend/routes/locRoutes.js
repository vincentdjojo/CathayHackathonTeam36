// This will be used to establish the routes for our User Model within our application.

const express = require('express') // Initialize Express..
const router = express.Router() // Initialize our Router to define routes..

const {getAllLocs} = require('../controllers/locationController') // Import our Controller Functions..

// Routes are established below.. The type of Request (GET, POST, PUT, DELETE) are established here.

router.get('/', getAllLocs) // Route for User Registration..

module.exports = router // Used for Exporting the Router Module..