const NetworkList = ({ wifiDevices }) => {
    return (
      <div className="network-list">
        <h3>Available Networks</h3>
        <ul>
          {wifiDevices.map((device, index) => (
            <li key={index}>{device.ssid || 'Unknown'}</li>
          ))}
        </ul>
      </div>
    );
};
  
export default NetworkList