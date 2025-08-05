import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Stats from "../../components/Stats";

const Dashboard = () => {
  return (
    <>
      <MapContainer
        center={[-6.2, 106.8]}
        zoom={11}
        style={{ height: "100vh", width: "100%" }}
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
      </MapContainer>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1000]">
        <Stats />
      </div>
    </>
  );
};

export default Dashboard;
