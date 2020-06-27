// Entry point!

// Dependencies
const express = require("express");

// App variables
const app = express();
const PORT = 80;

// Routes
// Serve static pages from public dir
app.use(express.static("public"));

// Server definition
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});