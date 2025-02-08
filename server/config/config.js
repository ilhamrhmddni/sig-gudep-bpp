require("dotenv").config();

module.exports = {
  databaseUrl: process.env.SUPABASE_API_URL,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false, // Supabase butuh ini
    },
  },
};
