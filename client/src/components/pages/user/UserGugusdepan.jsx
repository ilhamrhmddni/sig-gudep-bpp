import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchGeografis } from "../../../services/GeografisService";
import { fetchGugusdepan } from "../../../services/GugusdepanService";
import { fetchKwarran } from "../../../services/KwarranService"; // Import the kwarran service
import UserTemplate from "../../templates/UserTemplate";
import L from "leaflet";

// Import marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for marker icon not displaying
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const UserGugusdepan = () => {
  const [geografisData, setGeografisData] = useState([]);
  const [gugusdepanData, setGugusdepanData] = useState([]);
  const [kwarranData, setKwarranData] = useState([]); // State for kwarran data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGugusdepan, setSelectedGugusdepan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [geoResult, gudepResult, kwarranResult] = await Promise.all([
          fetchGeografis(),
          fetchGugusdepan(),
          fetchKwarran(), // Fetch kwarran data
        ]);
        setGeografisData(geoResult.data || []);
        setGugusdepanData(gudepResult.data || []);
        setKwarranData(kwarranResult.data || []); // Set kwarran data
        console.log(kwarranData);
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const defaultPosition = [-1.2550458, 116.8878243];

  return (
    <UserTemplate>
      <div className="p-4 mx-16 ml-24">
        {loading && <p className="text-center">Loading data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <MapContainer
            center={defaultPosition}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geografisData.map((geo) => {
              const matchedGudep = gugusdepanData.find(
                (gudep) => gudep.id === geo.gudep_id
              );
              const lat = parseFloat(geo.latitude);
              const lng = parseFloat(geo.longitude);

              if (!isNaN(lat) && !isNaN(lng)) {
                return (
                  <Marker
                    key={geo.id}
                    position={[lat, lng]}
                    eventHandlers={{
                      click: () => setSelectedGugusdepan(matchedGudep),
                    }}
                  >
                    <Popup>
                      <div className="bg-white rounded-lg text-gray-800 font-semibold">
                        {matchedGudep
                          ? matchedGudep.no_gudep
                          : "Tidak Diketahui"}
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        )}

        {selectedGugusdepan && (
          <div className="m-2 grid grid-cols-2 gap-4 text-xl my-8">
            {/* Bagian Kiri */}
            <div className="flex flex-col px-4">
              <div className="flex justify-between my-2 gap-16">
                <label className="text-[#9500FF] font-bold">Kwarran:</label>
                <span className="border rounded p-1 w-full text-right">
                  {kwarranData.find(
                    (kwarran) => kwarran.id === selectedGugusdepan.kwarran_id
                  )?.nama || "Tidak tersedia"}
                </span>
              </div>

              <div className="flex justify-between my-2 gap-12">
                <label className="text-[#9500FF] font-bold">Tingkatan:</label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.tingkatan || "Tidak tersedia"}
                </span>
              </div>

              <div className="flex justify-between my-2 gap-23">
                <label className="text-[#9500FF] font-bold">Putra:</label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.jumlah_putra || "Tidak tersedia"}
                </span>
                <label className="text-[#9500FF] font-bold">Putri:</label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.jumlah_putri || "Tidak tersedia"}
                </span>
              </div>

              <div className="flex justify-between my-2 gap-22">
                <label className="text-[#9500FF] font-bold">Email:</label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.email || "Tidak tersedia"}
                </span>
              </div>
            </div>

            {/* Bagian Kanan */}
            <div className="flex flex-col px-4">
              <div className="flex justify-between my-2 gap-12">
                <label
                  className="text-[#9500FF] font-bold"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Tanggal Update:
                </label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.tahun_update
                    ? new Date(
                        selectedGugusdepan.tahun_update
                      ).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "Tidak tersedia"}
                </span>
              </div>

              <div className="flex justify-between my-2 gap-29">
                <label className="text-[#9500FF] font-bold">Mabigus:</label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.mabigus || "Tidak tersedia"}
                </span>
              </div>

              <div className="flex justify-between my-2 gap-29">
                <label className="text-[#9500FF] font-bold">Pembina:</label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.pembina || "Tidak tersedia"}
                </span>
              </div>

              <div className="flex justify-between my-2 gap-33">
                <label className="text-[#9500FF] font-bold">Pelatih:</label>
                <span className="border rounded p-1 w-full text-right">
                  {selectedGugusdepan.pelatih || "Tidak tersedia"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserTemplate>
  );
};

export default UserGugusdepan;
