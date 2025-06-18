import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const Dashboard = () => {
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('connect', () => console.log('Socket bağlantısı başarılı!'));
    return () => socket.disconnect();
  }, []);

  return <div>Quiz Dashboard</div>;
};

export default Dashboard;