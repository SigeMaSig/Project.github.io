const BASE_URL = 'http://localhost:5432';

const buildSelect = document.querySelector('select[name="building"]');
const statusSelect = document.querySelector('select[name="status"]');

window.onload = async () => {
    try {
        const selects = [buildSelect, statusSelect];
        selects.forEach(select => {
            select.addEventListener('change', async () => {
                try {
                    await loadData(); 
                } catch (error) {
                    console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
                } 
            });
        });
        await loadData()
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
    }
}

const loadData = async () => {
    try {
        const userDOM = document.getElementById('test');
        const building = buildSelect.value;
        const status = statusSelect.value;
        const response = await axios.get(`${BASE_URL}/hotel?building=${building}`)

        if (!response.data || response.data.length === 0) {
            userDOM.innerHTML = "<p>ไม่มีข้อมูลห้องพัก</p>";
            return;
        }
        let board = '';
        response.data.forEach((room) => {
            if (status === 'All' || room.status === status) {
                board += `
                <div class="${room.status === 'Available' ? 'Available' : 'Occupied'}">
                    <p>ห้องที่: ${room.room_number ? room.room_number : 'ไม่ระบุ'}</p>
                    <p>ประเภท: ${room.room_type}</p>
                    <p>ราคา: ${room.price} บาท</p>
                    <p>สถานะ: ${room.status === 'Available' ? 'ว่าง' : 'ไม่ว่าง'}</p>
                    <p>ชั้นที่: ${room.description}</p>
                    <p>รายละเอียด: ${room.room_details}</p>
                </div>`;
            }
        });
        userDOM.className = 'flex-container';
        userDOM.innerHTML = board;
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        document.getElementById('test').innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
}