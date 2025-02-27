const BASE_URL = 'http://localhost:8000';
const buildSelect = document.querySelector('select[name="building"]');
window.onload = async () => {
    try {
        await loadData();
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
    }
}

buildSelect.addEventListener('change', async () => {
    try {
        await loadData(); 
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
    }
});

const loadData = async () => {
    try {
        const userDOM = document.getElementById('test');
        const building = buildSelect.value;
        console.log(building)        
        const response = await axios.get(`${BASE_URL}/hotel?building=${building}`);
        if (!response.data || response.data.length === 0) {
            userDOM.innerHTML = "<p>ไม่มีข้อมูลห้องพัก</p>";
            return;
        }

        let board = '';
        response.data.forEach((room) => {
            board += `
            <div class="room-card">
                <p>ห้องที่: ${room.room_number}</p>
                <p>ประเภท: ${room.room_type}</p>
                <p>ราคา: ${room.price} บาท</p>
                <p>สถานะ: ${room.status}</p>
                <p>ชั้นที่: ${room.description}</p>
                <p>รายละเอียด: ${room.room_details}</p>
            </div>`;
        });

        userDOM.className = 'flex-container';
        userDOM.innerHTML = board;
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        document.getElementById('test').innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
}
