const WebSocket = require('ws');
const mqtt = require('mqtt');

const wss = new WebSocket.Server({ port: 8080 });
const mqttClient = mqtt.connect('mqtt://localhost');

// Sottoscrizione al topic al momento della connessione al broker MQTT
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('test', (err) => {
    if (err) {
      console.error('Subscription error:', err);
    } else {
      console.log('Subscribed to topic: test');
    }
  });
});

// Gestione dei messaggi ricevuti dal broker MQTT
mqttClient.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);

  // Invia il messaggio a tutti i client WebSocket connessi
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
