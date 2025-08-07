import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  CircleMarker,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Stats from "../../components/Stats";
import DataView from "../../components/DataView";
import CardIspu from "../../components/CardIspu";
import airIndex from "../../hooks/airIndex.json";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState(null);

  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getColorByValue = (value) => {
    switch (true) {
      case value <= 50:
        return "#16a34a"; // bg-green-600
      case value <= 100:
        return "#facc15"; // bg-yellow-400
      case value <= 150:
        return "#f97316"; // bg-orange-500
      case value <= 200:
        return "#dc2626"; // bg-red-600
      case value <= 300:
        return "#9333ea"; // bg-purple-600
      default:
        return "#881337"; // bg-rose-900
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      <div className="absolute top-3 left-20 z-[1000]">
        <CardIspu />
      </div>

      <MapContainer
        center={[-6.2, 106.8]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="Default Map">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {selectedView === "Udara" &&
          airIndex.map((region) =>
            region.districts.map((district) => (
              <CircleMarker
                key={district.name}
                center={[district.lat, district.lng]}
                radius={20}
                pathOptions={{
                  color: "white",
                  weight: 1,
                  fillColor: getColorByValue(district.aqi_us),
                  // fillOpacity: 0.8,
                  fillOpacity: blink ? 0.8 : 0.3,
                }}
              >
                <Popup>
                  <strong>{district.name}</strong>
                  <br />
                  AQI: {district.aqi_us} ({district.category})<br />
                  PM2.5: {district.pm2_5} μg/m³
                  <br />
                  PM10: {district.pm10} μg/m³
                  <br />
                  CO: {district.co} ppm
                  <br />
                  NO₂: {district.no2} ppb
                  <br />
                  O₃: {district.o3} ppb
                </Popup>
              </CircleMarker>
            ))
          )}
      </MapContainer>

      <div className="absolute bottom-5 right-12 z-[1000] flex gap-4 items-end">
        <div>
          <Stats />
        </div>
        <div>
          <DataView
            selected={selectedView}
            onSelect={(label) => setSelectedView(label)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
