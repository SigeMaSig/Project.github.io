const express = require('express');
const cors = require('cors');
const app = express();
const readData = require('./read');  
const port = 5432;

app.use(cors());

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

app.get('/edit',async(req,res)=>{
  try {
    const rooms = req.query.rooms;
    if(!rooms){
      return res.status(400).send({error:'ไม่มีห้อง'})
    }
    const data = await roomData(rooms)
    res.send(data)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
});
