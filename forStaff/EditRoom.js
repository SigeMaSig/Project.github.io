const BASE_URL = ' https://31a8-171-7-22-114.ngrok-free.app ';
const buildSelect = document.querySelector('select[name="building"]');
const statusSelect = document.querySelector('select[name="status"]');
const selectedRoom = document.querySelector('input[name ="room_number"]').value;

window.onload = async () => {
const Edit = async () => {
    try {
        const response = await axios.put(`${BASE_URL}/editroom`, editRooms);
        console.log(response.data);
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล:", error);
    }
}
}

let submit = async () =>{
    let a = document.querySelector('input[name="room_number"]').value;
    const response = await axios.get(`${BASE_URL}/hotel?building=${buildSelect.value}`);
    const editRooms = response.data;
    
    const roomType = document.querySelector('input[name="room_type"]');
    const price = document.querySelector('input[name="price"]');
    const status_room = document.querySelector('input[name="status"]');
    const description = document.querySelector('input[name="description"]');
    const roomDetails = document.querySelector('input[name="room_details"]');
     
    const selectedRoomData = editRooms.find(room => room.room_number.toString() === a);
    if(!selectedRoomData){
        document.getElementById('test').innerText = 'กรอกเลขห้องไม่ถูกต้อง'
    }
    if (selectedRoomData) {
        roomType.value = selectedRoomData.room_type;
        price.value = selectedRoomData.price;
        status_room.value = selectedRoomData.status;
        description.value = selectedRoomData.description
        roomDetails.value = selectedRoomData.room_details;
    }
}


