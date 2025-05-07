const express = require('express');
const cors = require('cors');  // Import cors
const db = require('./database/db');
const functionRouter = require('./routers/functionRouter');
const { getFunction_Procedure_FromDatabase } = require('./controllers/functionController');

const app = express();
const port = 3000;

app.use(cors());
app.use('/', functionRouter);

// Khởi tạo danh sách function và procedure
getFunction_Procedure_FromDatabase();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
