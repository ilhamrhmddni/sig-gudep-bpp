// src/services/LaporanService.js

// URL dasar API
const API_URL = "https://sig-gudep-bpp-server.vercel.app/"; // Ganti dengan URL API Anda

// Fungsi untuk mengambil data laporan
export const fetchLaporan = async () => {
  try {
    const response = await fetch(`${API_URL}laporan`);

    if (!response.ok) {
      throw new Error("Failed to fetch Laporan data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Laporan:", error);
    throw error;
  }
};

// Fungsi untuk mengambil data laporan berdasarkan ID
export const fetchLaporanById = async (id) => {
  try {
    const response = await fetch(`${API_URL}laporan/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch Laporan data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Laporan by ID:", error);
    throw error;
  }
};

// Fungsi untuk membuat data laporan
export const createLaporan = async (data) => {
  try {
    const response = await fetch(`${API_URL}laporan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create Laporan");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating Laporan:", error);
    throw error;
  }
};

// Fungsi untuk mengedit data laporan
export const editLaporan = async (id, item) => {
  try {
    const response = await fetch(`${API_URL}laporan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to edit Laporan");
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error("Error editing Laporan:", error);
    throw error;
  }
};

// Fungsi untuk menghapus data laporan
export const deleteLaporan = async (id) => {
  try {
    const response = await fetch(`${API_URL}laporan/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete Laporan");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting Laporan:", error);
    throw error;
  }
};
