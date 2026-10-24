# FleetView

FleetView is a real-time fleet intelligence dashboard built as a Solutions Engineering portfolio project.

## The Business Problem

FleetWorks operates a growing fleet of 180 trucks with 7 dispatchers. Dispatchers frequently need vehicle location, route progress, ETA, and delivery-risk information, but retrieving that information across separate systems can take several minutes per lookup.

With roughly 20 truck lookups per dispatcher per day, that lost time adds up quickly as the fleet grows.

## The Solution

FleetView brings dispatch and telematics data into a single operational view.

The prototype integrates simulated RouteIQ telematics data with DispatchPro-style route and delivery data so dispatchers can quickly see:

- Current vehicle location and speed
- Route and stop progress
- Next scheduled stop
- ETA and planned arrival
- Idle time
- Distance to the next stop
- Delivery-risk alerts

FleetView also simulates live telemetry updates so vehicle information changes without requiring the dispatcher to refresh the dashboard.

## Business Impact

The FleetView workflow reduced the simulated truck-location lookup process from:

**4 minutes 22 seconds → 24 seconds**

The prototype also demonstrates how improved visibility could help dispatchers identify delays earlier and support fleet growth without adding unnecessary operational overhead.

## Technical Approach

FleetView is built with:

- React
- JavaScript
- Vite
- CSS
- Simulated REST API / telematics data

The application separates telemetry data from the dashboard UI and merges RouteIQ vehicle data with dispatch information inside the application.

## Solutions Engineering Focus

This project demonstrates more than frontend development. It was designed around a typical Solutions Engineering workflow:

**Discover the operational problem → map the existing workflow → design an integration → build a proof of concept → demonstrate measurable business value**

## Scenario

FleetWorks, DispatchPro, and RouteIQ are fictional companies/products created for this portfolio project. The operational scenario and integration were designed to demonstrate a realistic fleet-management use case.