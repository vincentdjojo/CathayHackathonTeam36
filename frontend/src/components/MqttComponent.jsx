import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NetworkList from './NetworkList';

const MQTTComponent = () => {
  const [wifiDevices, setWifiDevices] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Connect to your server

    socket.on('mqttData', (data) => {
      console.log('Received data:', data);
      setWifiDevices([...data]); // Update state with received data
    });

    return () => socket.disconnect();
  }, []);

  // Calculate the height of the bar based on signal quality
  const calculateBarHeight = (quality) => {
    const maxQuality = 100;
    const minHeight = 20; 
    const maxHeight = 300;
    return Math.max((quality / maxQuality) * maxHeight, minHeight);
  };

  return (
    <div className="dashboard">
        <h2 className="header">Network Devices near you</h2>
        <div className="bar-chart">
            {wifiDevices.map((device, index) => {
            const barHeight = calculateBarHeight(device.quality);
            return (
                <div key={index} className="bar-container" title={`BSSID: ${device.bssid} Quality: ${device.quality}`}>
                <div className="bar" style={{ height: `${barHeight}px` }}>
                    <span className="ssid-label">{device.ssid || 'Unknown'}</span>
                    <span className="signal-strength">{device.quality}</span>
                </div>
                </div>
            );
            })} 
        </div>
        <NetworkList wifiDevices={wifiDevices} />
    </div>
  );
};

export default MQTTComponent;
