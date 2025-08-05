import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { useEffect } from "react";

const heatPoints = [
  [-6.2, 106.8, 0.5],
  [-6.21, 106.81, 0.6],
  [-6.22, 106.82, 0.4],
  [-6.23, 106.83, 0.8],
];

function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}

const Dashboard = () => {
  return (
    <>
      <MapContainer
        center={[-6.2, 106.8]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="Default Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <HeatLayer points={heatPoints} />
      </MapContainer>
    </>
  );
};

export default Dashboard;
