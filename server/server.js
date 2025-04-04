const express = require('express');
const cors = require('cors');
const app = express();
const readData = require('./read');  
const updateData = require('./update')
const port = 3000;
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

app.put('/edit',async(req,res)=>{
  try{
    const building = req.body.building;
    console.log(building)
    const room = req.body.room_number;
    const updateRoom = req.body;
    const results = await conn.query(`UPDATE ${building} SET ? WHERE id = ?` , [updateRoom,room])

    res.json({
      message : 'update ok',
      data : results[0]
    })
   }catch (error){
    console.log(error.message)
    res.status(500).json({
      message : 'Someing wrong'
    })
    }
})

app.listen(port,() => {
  console.log(`Server running at ${port}`);
});

