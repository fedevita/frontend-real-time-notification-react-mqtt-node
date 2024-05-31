// publishService.js
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Pubblica un messaggio ogni minuto
  setInterval(() => {
    const message = `Message at ${new Date().toLocaleTimeString()}`;
    client.publish('test', message);
    console.log(`Published: ${message}`);
  }, 10000); // 60000 ms = 1 minuto
});
