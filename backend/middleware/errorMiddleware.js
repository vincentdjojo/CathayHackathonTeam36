// Middleware or Functions that execute during the Request-Response Cycle (When you make a request)
// This Middleware is specifically for Error Handling.

//Overwrite the default Express Error Handler Functions to our customized functionality..
// These Middleware functions allow us to throw an error from any controller and pass it through our middleware..

// For catching any errors that occur in our routes..
const errorHandler = (err, req, res, next) => {
    
    let statusCode = res.statusCode ? res.statusCode : 500 // Terniary(Conditional) checks if res.statusCode exists, and assigns it. If not assign 500 Error Code to statusCode

    let message = err.message //Assign the Error Message..

     // If Mongoose not found error, set to 404 and change message
     // Occurs when Invalid ID passed to a Mongoose Query..
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found in our MongoDB Cluster..';
    }

    res.status(statusCode) // Pass in our Status Code into the Response Header
    
    // Defines how the JSON response file will be shown in the Response Header
    res.json({
        //Error Message from err 
        message: message,
        // Stack Trace.. Below checks if the current Process Environment is in Production. If so, then indicate Stack trace to be null.
        // If not, then indicate that the Stack Trace will follow express.js stack trace. Stack Trace indicates Line Numbers for errors, etc..
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

// For Catching Routes that do not exist..
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Exports our Middleware for use..
module.exports = {
    errorHandler, notFound
}