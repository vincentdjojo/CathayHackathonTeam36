// For connecting real time to our MQTT Live Tracking Server..

const mqtt = require('mqtt');
const mqttLive = mqtt.connect('tcp://54.235.51.246:1883');

mqttLive.on('connect', () => {
    console.log('test mqtt');
    mqttLive.subscribe('location/1', (err) => {
        if (err) {
            console.error('Failed to subscribe:', err);
        } else {
            console.log('Successfully subscribed to MQTT Server..');
        }
    });
});

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

module.exports = mqttLive;
