// src/services/AuthService.js

export const login = async (email, password) => {
  try {
    const response = await fetch(
      "https://sig-gudep-bpp-server.vercel.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result; // Assuming the result contains { success: true/false, token: 'yourToken', role: 'admin/operator', message: '...' }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Gagal terhubung ke server" };
  }
};

// Tambahkan fungsi logout
export const logout = async () => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari local storage
    const response = await fetch(
      "https://sig-gudep-bpp-server.vercel.app/auth/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Kirim token dalam header
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result; // Mengembalikan hasil dari server
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "Gagal terhubung ke server" };
  }
};
