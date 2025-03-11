const BASE_URL = 'https://6448-171-7-22-114.ngrok-free.app';
const buildSelect = document.querySelector('select[name="building"]');
const statusSelect = document.querySelector('select[name="status"]');
const selectedRoom = document.querySelector('input[name ="room_number"]').value;

window.onload = async () => {
submit();
}

let submit = async () =>{
    let a = document.querySelector('input[name="room_number"]').value;
    let building = buildSelect.value
    const response = await axios.get(`${BASE_URL}/hotel`, {
        params: { building },
        headers: {
            "ngrok-skip-browser-warning": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
    const editRooms = response.data;
    
    const roomType = document.querySelector('input[name="room_type"]');
    const price = document.querySelector('input[name="price"]');
    const status_room = document.querySelector('input[name="status"]');
    const description = document.querySelector('input[name="description"]');
    const roomDetails = document.querySelector('input[name="room_details"]');
     
    const selectedRoomData = editRooms.find(room => room.room_number.toString() === a);
    
    addEventListener('click', submit = () => {
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
    })  
}


