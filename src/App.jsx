import { useState, useEffect } from "react";
import { routeIqData } from "./routeIqData";
import "./App.css";


const trucks = [
  {
    id: 142,
    driver: "M. Davis",
    route: "R-104",
    progress: "7/12",
    nextStop: "Acme Foods",
    eta: "10:42 AM",
    status: "On Time",
    plannedArrival: "10:38 AM",
    distanceToStop: 27,
  },
  {
    id: 87,
    driver: "J. Carter",
    route: "R-221",
    progress: "4/9",
    nextStop: "Titan Supply",
    eta: "10:51 AM",
    status: "+18 min",
     plannedArrival: "10:38 AM",
    distanceToStop: 27,
  },
  {
    id: 203,
    driver: "A. Lopez",
    route: "R-118",
    progress: "6/11",
    nextStop: "Metro Steel",
    eta: "11:04 AM",
    status: "Idle 17m",
    location: "I-70 · Salina, KS",
    idleMinutes: 17,
    plannedArrival: "10:52 AM",
    milesToStop: 43,
    completedStops: 6,
    totalStops: 11,
    delayMinutes: 12, //If idle > 15 minutes and delay > 10 minutes, show alert
    distanceToStop: 43,
  },
  {
    id: 165,
    driver: "R. Patel",
    route: "R-305",
    progress: "8/10",
    nextStop: "FreshMart",
    eta: "2:12 PM",
    status: "On Time",
     plannedArrival: "10:38 AM",
    distanceToStop: 27,
  },
];

function App() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [telemetryData, setTelemetryData] = useState(routeIqData);
  useEffect(() => {
  const interval = setInterval(() => {
    setTelemetryData((currentData) =>
      currentData.map((vehicle) => ({
        ...vehicle,
        speed:
  vehicle.id == 203
    ? 0
    : Math.max(0, vehicle.speed + Math.floor(Math.random() * 7) - 3),
      }))
    );
  }, 5000);

  return () => clearInterval(interval);
}, []);

  // Match FleetWorks trucks with RouteIQ telemetry using the truck ID
  const fleetData = trucks.map((truck) => {
  const telemetry = telemetryData.find(
    (vehicle) => vehicle.id === truck.id
  );

  return {
    ...truck,
    ...telemetry,
  };
});
  const liveSelectedTruck = selectedTruck
  ? fleetData.find((truck) => truck.id === selectedTruck.id)
  : null;
  return (
    
    <div className="dashboard">
      <header className="header">
        <div>
          <h1>FleetView</h1>
          <p>Real-Time Fleet Intelligence</p>
        </div>

        <div className="live-status">
          <span className="live-dot"></span>
          Live
        </div>
      </header>

      <main>
        <section className="stats">
          <div className="stat-card">
            <p>Active Trucks</p>
            <h2>180</h2>
            <span>of 250 target</span>
          </div>

          <div className="stat-card">
            <p>Dispatchers</p>
            <h2>7</h2>
            <span>~20 lookups/day each</span>
          </div>

          <div className="stat-card alert">
            <p>Delayed Trucks</p>
            <h2>12</h2>
            <span>2 more than yesterday</span>
          </div>

          <div className="stat-card warning">
            <p>Idle Alerts</p>
            <h2>4</h2>
            <span>Idle &gt; 15 minutes</span>
          </div>
        </section>
        <section className="truck-section">
  <div className="section-header">
    <div>
      <h2>Active Trucks</h2>
      <p>Live route and delivery status</p>
    </div>

    <span>{trucks.length} shown</span>
  </div>

  <table className="truck-table">
    <thead>
      <tr>
        <th>Truck</th>
        <th>Driver</th>
        <th>Route</th>
        <th>Progress</th>
        <th>Next Stop</th>
        <th>ETA</th>
        <th>Status</th>
      </tr>
    </thead>



    <tbody>
      {fleetData.map((FleetData) => (
        <tr
  key={FleetData.id}
  onClick={() => setSelectedTruck(FleetData)}
className={`${selectedTruck?.id === FleetData.id ? "selected-row" : ""} ${
  FleetData.idleMinutes > 15 ? "warning-row" : ""
}`}> 
          <td>#{FleetData.id}</td>
          <td>{FleetData.driver}</td>
          <td>{FleetData.route}</td>
          <td>{FleetData.progress}</td>
          <td>{FleetData.nextStop}</td>
          <td>{FleetData.eta}</td>
          <td>
  <span
    className={`status-badge ${
      FleetData.status === "On Time"
        ? "status-good"
        : FleetData.status.includes("Idle")
        ? "status-warning"
        : "status-danger"
    }`}
  >
    {FleetData.status}
  </span>
</td>
        </tr>
      ))}
    </tbody>
  </table>
  {selectedTruck &&
  selectedTruck.idleMinutes > 15 &&
  selectedTruck.delayMinutes > 10 &&
  selectedTruck.distanceToStop > 20 && (
  <div className="risk-alert">
    <span className="warning-icon">⚠</span> Delivery Risk — extended idle time is impacting ETA
  </div>
)}
{liveSelectedTruck && (
  <div className="truck-details">
    <div>
      <span>Selected Truck</span>
      <h2>Truck #{liveSelectedTruck.id}</h2>
    </div>

    <div>
      <span>Driver</span>
      <strong>{selectedTruck.driver}</strong>
    </div>

    <div>
      <span>Route</span>
      <strong>{selectedTruck.route}</strong>
    </div>

    <div>
      <span>Progress</span>
      <strong>{selectedTruck.progress}</strong>
    </div>

    <div>
      <span>Next Stop</span>
      <strong>{selectedTruck.nextStop}</strong>
    </div>

    <div>
      <span>ETA</span>
      <strong>{selectedTruck.eta}</strong>
    </div>

    <div>
      <span>Status</span>
      <strong>{selectedTruck.status}</strong>
    </div>

    {selectedTruck.location && (
      <>
        <div>
          <span>Current Location</span>
          <strong>{selectedTruck.location || "Location unavailable"}</strong>
        </div>

        <div>
          <span>Idle Time</span>
          <strong>{liveSelectedTruck.idleMinutes} min</strong>
        </div>

        <div>
          <span>Speed</span>
          <strong>{liveSelectedTruck.speed} mph</strong>
        </div>

        <div>
          <span>Planned Arrival</span>
          <strong>{liveSelectedTruck.plannedArrival}</strong>
        </div>

        <div>
          <span>Distance to Stop</span>
          <strong>{liveSelectedTruck.distanceToStop} miles</strong>
        </div>
      </>
    )}
    {selectedTruck.totalStops && (
  <div className="route-progress">
    <span>Route Progress</span>

    <div className="progress-track">
      <div
        className="progress-fill"
        style={{
          width: `${(selectedTruck.completedStops / selectedTruck.totalStops) * 100}%`,
        }}
      ></div>
    </div>

    <strong>
      {selectedTruck.completedStops} of {selectedTruck.totalStops} stops completed
    </strong>
  </div>
)}
  </div>
)}
    </section>
    </main>
  </div>
  );
}

  

export default App;