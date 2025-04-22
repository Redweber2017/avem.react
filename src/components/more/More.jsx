import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './More.css';

const More = () => {
  const { serial } = useParams();
  const [kitData, setKitData] = useState(null);
  const [error, setError] = useState(null);

  const fetchKitData = () => {
    fetch(`https://avemfinalbackend.onrender.com/kits/${serial}`)
      .then((response) => response.json())
      .then((data) => setKitData(data))
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    fetchKitData(); // Initial fetch
    const interval = setInterval(fetchKitData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [serial]);

  if (error) return <div>Error: {error}</div>;
  if (!kitData) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <div className="loading-text">Fetching Data From Server...</div>
      </div>
    );
  }

  return (
    <div className="kit-details">
      <h2>Kit Data for Serial Number: {kitData.serialNumber}</h2>
      <div className="card-list">
        {/* Show latest data first (stack behavior) */}
        {[...kitData.kitData].reverse().map((data, index) => (
          <div key={index} className="data-card">
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Temperature:</strong> {data.temperature}</p>
            <p><strong>Time:</strong> {data.timestamp}</p>
            <p><strong>Gas Leakage Status:</strong> {data.gasLeakageStatus}</p>
            <p><strong>Crash Status:</strong> {data.crashStatus}</p>
            <p>camera : </p>
            <div className="camera-footage">
              {Array.isArray(data.cameraFootage) && data.cameraFootage.length > 0 ? (
                data.cameraFootage.map((footage, i) => (
                  <button
                    key={i}
                    className="play-btn"
                    onClick={() => window.open(footage, '_blank')}
                    disabled={!footage || footage.trim() === ""}
                  >
                    Play
                  </button>
                ))
              ) : (
                <p className="no-footage">No footage available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default More;
