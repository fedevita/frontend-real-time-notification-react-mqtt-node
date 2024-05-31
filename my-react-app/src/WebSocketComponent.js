// src/WebSocketComponent.js
import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Connessione al WebSocket server
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      // Gestione del messaggio ricevuto
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Pulizia all'unmount del componente
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Notifications</h1>
      <p>{message}</p>
    </div>
  );
};

export default WebSocketComponent;
