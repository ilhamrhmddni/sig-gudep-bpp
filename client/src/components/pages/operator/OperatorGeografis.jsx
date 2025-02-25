// src/components/OperatorGeografis.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import OperatorTemplate from "../../templates/OperatorTemplate";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchGeografisId,
  editGeografis,
} from "../../../services/GeografisService"; // Update with your service methods
import Swal from "sweetalert2"; // Import SweetAlert

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

const OperatorGeografis = () => {
  const { id } = useParams(); // Get geografis_id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titik_koordinat: "",
    longitude: "",
    latitude: "",
    alamat: "",
  });

  const [position, setPosition] = useState([0, 0]); // Default position for the map
  const gudep_id = localStorage.getItem("gudep_id"); // Get gudep_id from local storage
  const geografis_id = localStorage.getItem("geografis_id"); // Get gudep_id from local storage

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setFormData({
            ...formData,
            latitude,
            longitude,
            titik_koordinat: `${latitude}, ${longitude}`,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData, gudep_id }; // Include gudep_id in the data

    try {
      await editGeografis(geografis_id, updatedData); // Send PUT request to update
      console.log("Geografis updated successfully:", updatedData);

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "Geografis updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/operator/geografis"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating geografis:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the geografis.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setFormData({
          ...formData,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          titik_koordinat: `${e.latlng.lat}, ${e.latlng.lng}`,
        });
      },
    });
    return null;
  };

  useEffect(() => {
    getCurrentLocation(); // Get user's location on component mount

    // Fetch existing geographic data if in edit mode
    const fetchData = async () => {
      try {
        const result = await fetchGeografisId(id); // Fetch data by geografis_id
        const { data } = result; // Ensure data is retrieved correctly
        setFormData({
          titik_koordinat: data.titik_koordinat || "",
          longitude: data.longitude || "",
          latitude: data.latitude || "",
          alamat: data.alamat || "",
        });
        setPosition([data.latitude, data.longitude]); // Set position for the map
      } catch (error) {
        console.error("Error fetching geographic data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <OperatorTemplate>
      <div className="p-4 mx-16 ml-24">
        <h1 className="text-2xl font-bold my-4 ">Data Geografis</h1>
        {/* Leaflet Map */}
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} />
          <MapClickHandler />
        </MapContainer>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Titik Koordinat</label>
            <input
              type="text"
              name="titik_koordinat"
              value={formData.titik_koordinat}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#9500FF] text-white font-bold p-3 my-6 rounded-md hover:bg-[#9500FF] transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </OperatorTemplate>
  );
};

export default OperatorGeografis;
