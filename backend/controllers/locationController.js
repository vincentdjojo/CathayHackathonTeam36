// Controller where we define further functionality when a Route is reached..
// express-async-handler library simplifies this process by providing a wrapper function that automatically catches errors and forwards them to the Express error handling middleware
const asyncHandler = require('express-async-handler') // Import the Async Handler provided by Express

// Import our Models.. All the Mongoose functionality are imported below
const Locations = require('../models/locationModel');

// @desc Get All Locations 
// @route GET /api/locations/all
// @access Private
const getAllLocs = asyncHandler(async (req, res) => {

    try{
        // Retrieve all Locations
        const locations = await Locations.find({}); // Empty filter to get all documents
        res.status(200).json(locations);
    }
    catch(error){
        res.status(500).json({message:'Error creating new site!'})
    }
});

// Export our Controllers..
module.exports = {
    getAllLocs
}