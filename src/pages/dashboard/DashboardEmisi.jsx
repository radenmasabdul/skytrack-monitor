import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { DataViewPolution } from "../../components/DataView";
import Stats from "../../components/Stats";
import factoryIndex from "../../hooks/factoryIndex.json";
import schoolIndex from "../../hooks/schoolIndex.json";
import restaurantIndex from "../../hooks/restaurantIndex.json";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const DashboardEmisi = () => {
  const [selectedView, setSelectedView] = useState("Pabrik");

  const factoryIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3256/3256216.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const schoolsIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2602/2602414.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const restaurantIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/948/948036.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const allSchools = [
    ...schoolIndex.ranking_emisi_terendah_ke_tertinggi.kategori_sangat_rendah,
    ...schoolIndex.ranking_emisi_terendah_ke_tertinggi.kategori_rendah,
    ...schoolIndex.ranking_emisi_terendah_ke_tertinggi.kategori_sedang,
    ...schoolIndex.ranking_emisi_terendah_ke_tertinggi.kategori_tinggi,
    ...schoolIndex.ranking_emisi_terendah_ke_tertinggi.kategori_sangat_tinggi,
  ];

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
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

        {selectedView === "Pabrik" &&
          factoryIndex.factories.map((factory) => (
            <Marker
              key={factory.id}
              position={[
                factory.location.coordinates.latitude,
                factory.location.coordinates.longitude,
              ]}
              icon={factoryIcon}
            >
              <Popup>
                <strong>{factory.name}</strong>
                <br />
                AQI: {factory.pollution_data.air_quality_index} (
                {factory.pollution_data.pollution_level})
                <br />
                Lokasi: {factory.location.kecamatan},{" "}
                {factory.location.kota_administrasi}
                <br />
                Industri: {factory.industry_type}
              </Popup>
            </Marker>
          ))}

        {selectedView === "Sekolah" &&
          allSchools.map((school) => (
            <Marker
              key={school.peringkat}
              position={[school.koordinat.latitude, school.koordinat.longitude]}
              icon={schoolsIcon}
            >
              <Popup>
                <strong>{school.nama}</strong>
                <br />
                Emisi: {school.estimasi_emisi} ({school.kategori})
                <br />
                Wilayah: {school.wilayah}
                <br />
                Jumlah siswa: {school.jumlah_siswa}
              </Popup>
            </Marker>
          ))}

        {selectedView === "Makanan" &&
          restaurantIndex.restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[
                restaurant.coordinates.latitude,
                restaurant.coordinates.longitude,
              ]}
              icon={restaurantIcon}
            >
              <Popup>
                <strong>{restaurant.name}</strong>
                <br />
                CO2 Emission: {restaurant.emission_data.co2_tons_per_year}{" "}
                ton/tahun
                <br />
                Lokasi: {restaurant.kecamatan}, {restaurant.kota}
                <br />
                Brand: {restaurant.brand}
                <br />
                Jam Operasi: {restaurant.operational_details.operating_hours}
                <br />
                Delivery:{" "}
                {restaurant.operational_details.delivery_services.join(", ")}
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <div className="absolute bottom-5 right-12 z-[1000] flex gap-4 items-end">
        <div>
          <Stats />
        </div>
        <div>
          <DataViewPolution
            selected={selectedView}
            onSelect={(label) => setSelectedView(label)}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardEmisi;
