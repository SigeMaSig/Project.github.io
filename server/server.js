// server.js
const express = require('express');
const app = express();
const cors = require('cors')
const port = 8000;
const readData = require('./read');
app.use(cors())

app.get('/hotel', async (req, res) => { 
  try {
    const building = req.query.building; 
    if (!building) {
      return res.status(400).send({ error: 'กรุณาระบุตึก' });
    }
    const data = await readData(building); 
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Run server at port ${port}`);
});