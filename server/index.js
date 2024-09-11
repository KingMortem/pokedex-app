const express = require("express");
const apiRoutes = require('./routes/api'); // Importing API routes
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});