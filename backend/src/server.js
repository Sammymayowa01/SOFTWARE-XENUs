const path = require("path");
const dotenv = require("dotenv");

// Load .env from the backend root directory
const envPath = path.resolve(__dirname, "..", ".env");
console.log("Loading .env from:", envPath);
console.log("File exists:", require("fs").existsSync(envPath));

dotenv.config({ path: envPath });

const app = require("./app");
const connectDB = require("./config/db");

// Enhanced Debugging
console.log("--- Software Xenus Backend Boot ---");
console.log("Node Env:", process.env.NODE_ENV || 'development');
console.log("Database URI Loaded:", !!process.env.MONGODB_URI);
console.log("MONGODB_URI value:", process.env.MONGODB_URI ? "Set" : "Not set");
console.log("PORT:", process.env.PORT || '5000');
console.log("Frontend URL Allowed:", process.env.FRONTEND_URL || 'http://localhost:3000');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ API Endpoint: http://localhost:${PORT}/api`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err.message);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error("✗ Startup Error:", error.message);
    process.exit(1);
  }
})();
