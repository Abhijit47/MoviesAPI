// Require third party packages
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Require local module
const app = require('./app');

// Configuration file
dotenv.config({ path: './config.env' });

// Connection String
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD) || "Connect your DB String";

// Connect to DB
mongoose.connect(DB)
  .then(() => console.log("Connection Successful ✔"))
  .catch(() => console.log("Something wrong in connection ❌"));

// Define a port
const port = process.env.PORT;

// Server::
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

