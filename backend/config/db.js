// This file, db.js will establish how we connect our MongoDB Database to the application.
// We will be using Mongoose to connect to the Database..

const mongoose = require('mongoose') // Initialize Mongoose to connect to MongoDB.

// connectDB function initialized so that we can connect to our MongoDB Database.
// This function will be Asynchronous since we will be sending & receiving data over the network.
// Mongoose Methods all return a Promise and are Asynchronous..
const connectDB = async () => {
    // try & catch error handling used to gracefully catch errors when we take specific actions. Since we are specifically connecting to MongoDB, try & catch seems optimal.
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI) // connect to our MongoDB DB
        console.log(`MongoDB Successfully Connected: ${conn.connection.host}`.cyan) // print out the host from the established mongoose connection..
    }
    catch (error){
        console.log(error) // Output the error..
        process.exit(1) // terminates all execution if error is encountered..
    }
}

// Export our custom connectDB function
module.exports = {
    connectDB
}