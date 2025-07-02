const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(__dirname, `../.env.${env}`);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`✅ Environment loaded: .env.${env}`);
} else {
  console.error(`❌ Environment file .env.${env} not found`);
}
