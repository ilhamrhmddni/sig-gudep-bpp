// src/services/EventGudepService.js

// URL dasar API
const API_URL = "https://sig-gudep-bpp-server.vercel.app/"; // Ganti dengan URL API Anda

// Fungsi untuk mengambil data event_gudep
export const fetchEventGudeps = async () => {
  try {
    const response = await fetch(`${API_URL}eventgudep`);

    if (!response.ok) {
      throw new Error("Failed to fetch Event Gudep data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Event Gudep:", error);
    throw error;
  }
};

// Fungsi untuk mengambil data event_gudep berdasarkan ID
export const fetchEventGudepById = async (eventgudep_id) => {
  try {
    const response = await fetch(`${API_URL}eventgudep/${eventgudep_id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch Event Gudep data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Event Gudep by ID:", error);
    throw error;
  }
};

// Fungsi untuk menambah data event_gudep
export const createEventGudep = async (data) => {
  try {
    const response = await fetch(`${API_URL}eventgudep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create Event Gudep");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating Event Gudep:", error);
    throw error;
  }
};

// Fungsi untuk mengedit data event_gudep
export const editEventGudep = async (eventgudep_id, item) => {
  try {
    const response = await fetch(`${API_URL}eventgudep/${eventgudep_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to edit Event Gudep");
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error("Error editing Event Gudep:", error);
    throw error;
  }
};
