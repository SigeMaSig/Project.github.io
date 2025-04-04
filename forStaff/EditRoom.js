const BASE_URL = 'https://2f44-171-6-28-236.ngrok-free.app'; //http://localhost:3000 //ngrok http http://localhost:8080

window.onload = async () => {

}
const validate = (userData) => {
    let errors = [];
    if (!userData.room_number) errors.push('กรุณาระบุเลขห้อง');
    if (!userData.room_type) errors.push('กรุณาระบุประเภทห้อง');
    if (!userData.price) errors.push('กรุณาระบุราคา');
    if (!userData.status) errors.push('กรุณาระบุสถานะ');
    if (!userData.description) errors.push('กรุณาระบุชั้นที่');
    if (!userData.room_details) errors.push('กรุณาระบุรายละเอียด');
    return errors;
};

// ค้นหาห้อง
const search = async () => {
    let search_numRoom = document.querySelector('input[name="room_number"]').value;
    let building = document.querySelector('select[name="building"]').value;

    try {
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
        const selectedRoomData = editRooms.find(room => room.room_number.toString() === search_numRoom);

        if (!selectedRoomData) {
            document.getElementById('test').innerText = 'ไม่พบห้องที่ค้นหา';
            return;
        }

        // นำค่าที่ค้นพบมาแสดงในฟอร์ม
        document.querySelector('input[name="room_type"]').value = selectedRoomData.room_type || "";
        document.querySelector('input[name="price"]').value = selectedRoomData.price || "";
        document.querySelector('input[name="status"]').value = selectedRoomData.status || "";
        document.querySelector('input[name="description"]').value = selectedRoomData.description || "";
        document.querySelector('input[name="room_details"]').value = selectedRoomData.room_details || "";

    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการค้นหา:", error);
    }
};

// เคลียร์ค่าฟอร์มหลังจากบันทึก
const clearForm = () => {
    document.querySelector('input[name="room_number"]').value = "";
    document.querySelector('input[name="room_type"]').value = "";
    document.querySelector('input[name="price"]').value = "";
    document.querySelector('input[name="status"]').value = "";
    document.querySelector('input[name="description"]').value = "";
    document.querySelector('input[name="room_details"]').value = "";
};

// บันทึกข้อมูล
const submit = async () => {
    let buildingDom = document.querySelector('select[name="building"]').value;
    let room_number = document.querySelector('input[name="room_number"]').value;
    let room_type = document.querySelector('input[name="room_type"]').value;
    let price = document.querySelector('input[name="price"]').value;
    let status = document.querySelector('input[name="status"]').value;
    let description = document.querySelector('input[name="description"]').value;
    let room_details = document.querySelector('input[name="room_details"]').value;

    try {
        let userData = {
            building: buildingDom,
            room_number: room_number,
            room_type: room_type,
            price: price,
            status: status,
            description: description,
            room_details: room_details
        };

        console.log('submit', userData);

        const errors = validate(userData);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // ส่งข้อมูลไปยังเซิร์ฟเวอร์
        // await axios.put(`${BASE_URL}/hotel`, userData, {
        //     headers: {
        //         "ngrok-skip-browser-warning": "true",
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        //         "Access-Control-Allow-Headers": "Content-Type"
        //     }
        // });

        // alert('บันทึกเรียบร้อย');

        // เคลียร์ค่าฟอร์มหลังจากบันทึกสำเร็จ
        clearForm();

    } catch (error) {
        console.log('Error Message:', error.message);
    }

};