// Simulated response from the RouteIQ telematics API.
// FleetView will consume this data instead of storing vehicle
// telemetry directly inside the dashboard component.

export const routeIqData = [
  {
    id: 142,
    location: "I-40 - Nashville, TN",
    idleMinutes: 0,
    speed: 62,
    plannedArrival: "10:38 AM",
    distanceToStop: 27,
  },
  {
    id: 87,
    location: "I-24 - Clarksville, TN",
    idleMinutes: 3,
    speed: 58,
    plannedArrival: "11:09 AM",
    distanceToStop: 18,
  },
  {
    id: 203,
    location: "I-70 - Salina, KS",
    idleMinutes: 17,
    speed: 0,
    plannedArrival: "11:22 AM",
    distanceToStop: 43,
  },
  {
    id: 165,
    location: "I-65 - Bowling Green, KY",
    idleMinutes: 1,
    speed: 64,
    plannedArrival: "2:08 PM",
    distanceToStop: 31,
  },
];