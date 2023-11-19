const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mqtt = require('mqtt');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const { spawn } = require('child_process'); //For running Python Scripts locally..

// MQTT Live Tracking Server
const mqttLive = mqtt.connect('tcp://54.235.51.246:1883');

mqttLive.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttLive.subscribe('location/1', (err) => {
        if (err) {
            console.error('Failed to subscribe:', err);
        } else {
            console.log('Successfully subscribed to MQTT topic');
        }
    });
});

// Testing on our Backend..
mqttLive.on('message', (topic, message) => {
    try {
        // Parse the message as JSON
        const parsedMessage = JSON.parse(message.toString());
        console.log('Parsed message:', parsedMessage);
        
        // Emit this parsed message to your frontend
        // This part depends on how you set up real-time communication with your frontend
        // Example: if using WebSockets, you would emit this message to the connected clients
    } catch (error) {
        console.error('Error parsing MQTT message as JSON:', error);
    }
});

// Database connection
const { connectDB } = require('./config/db');
connectDB();

// Middleware and routes
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Express App Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

// WebSocket Server Setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected via WebSocket');

    mqttLive.on('message', (topic, message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            socket.emit('mqttData', parsedMessage);
        } catch (error) {
            console.error('Error parsing MQTT message:', error);
        }
    });
});

// Static Frontend for Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('Environment is not in production'));
}

// API Routes
app.use('/api/locations', require('./routes/locRoutes'));

app.get('/get-image', (req, res) => {
    
    // Construct the path to the Python script
    const scriptPath = path.join(__dirname, './pythonScripts/main.py');
    console.log(scriptPath);
    const pythonProcess = spawn('python', [scriptPath]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.send('Python script executed');
    });
});

// Error Handling Middleware
app.use(errorHandler);
app.use(notFound);

// Start the Server
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`.green);
});
