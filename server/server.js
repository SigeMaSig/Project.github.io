// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // ใช้ cors เพื่อให้สามารถดึงข้อมูลจากหน้าเว็บได้
const app = express();
const port = 5000;

app.use(cors());  // เปิดใช้งาน CORS สำหรับการเชื่อมต่อจากหน้าเว็บ

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb+srv://sigema:root@grandhotel.gjoja.mongodb.net/granhotel?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

// สร้าง Schema และ Model สำหรับห้อง
const roomSchema = new mongoose.Schema({
  room_number: Number,
  room_type: String,
  price: Number,
  status: String,
  description: String,
  room_details: String,
  building: String,
});

const Room = mongoose.model('Room', roomSchema);

// API สำหรับดึงข้อมูลห้องตามตึก
app.get('/hotel', async (req, res) => {
  const { building } = req.query;
  try {
    const rooms = await Room.find({ building: building });
    res.json(rooms);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
