import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEventGudep,
  editEventGudep,
  fetchEventGudepById,
} from "../../../services/PrestasiService"; // Adjust the import based on your file structure
import OperatorTemplate from "../../templates/OperatorTemplate";
import { fetchEvents } from "../../../services/EventService";
import AddButton from "../../atoms/AddButton";

const OperatorPrestasiForm = ({ isEdit }) => {
  const [selectedEventId, setSelectedEventId] = useState(""); // State to hold the selected event ID
  const [keterangan, setKeterangan] = useState("");
  const [events, setEvents] = useState([]); // State to hold the list of events
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if editing

  // Fetch data if it's an edit case
  useEffect(() => {
    const fetchData = async () => {
      if (isEdit && id) {
        try {
          const result = await fetchEventGudepById(id); // Fetch the achievement data
          const { data } = result; // Ensure this matches your API response structure
          setSelectedEventId(data.event_id); // Set the event ID for editing
          setKeterangan(data.keterangan);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      // Fetch the list of events
      try {
        const eventsResult = await fetchEvents(); // Fetch the events
        setEvents(eventsResult.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve gudep_id from local storage
    const gudepId = localStorage.getItem("gudep_id"); // Ensure this key exists in local storage

    // Show confirmation popup
    const confirmSubmit = window.confirm(
      isEdit
        ? "Are you sure you want to update this achievement?"
        : "Are you sure you want to save this new achievement?"
    );

    if (confirmSubmit) {
      const newData = {
        keterangan, // Description
        event_id: selectedEventId, // Use the selected event ID directly
        gudep_id: gudepId, // Include Gudep ID from local storage
      };

      console.log("Data to be sent:", newData); // Log the data being sent

      try {
        if (isEdit && id) {
          // Update the achievement data
          await editEventGudep(id, newData);
        } else {
          // Create a new achievement
          await createEventGudep(newData);
        }

        // Redirect after submit
        navigate("/operator/prestasi");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form submission canceled.");
    }
  };

  return (
    <OperatorTemplate>
      <div className="flex flex-auto items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-xl text-left">
          <h1 className="text-2xl font-bold mb-6 mx-96">
            {isEdit ? "Ubah Prestasi" : "Tambah Prestasi"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Nama Event</label>
              <div className="flex items-center">
                <select
                  value={selectedEventId || ""}
                  onChange={(e) => setSelectedEventId(e.target.value)} // Set the selected event ID
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF] mr-2 w-full"
                  required
                >
                  <option value="" disabled>
                    Pilih Kegiatan
                  </option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.nama} {/* Assuming 'nama' is the display name */}
                    </option>
                  ))}
                </select>
                <AddButton route={"/operator/event/add"} />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Keterangan</label>
              <textarea
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9500FF]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#9500FF] text-white py-2 rounded-md hover:bg-[#7a00cc]"
            >
              {isEdit ? "Simpan Perubahan" : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </OperatorTemplate>
  );
};

export default OperatorPrestasiForm;
