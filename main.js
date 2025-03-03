const BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5432" 
    : "https://my-express-bxgan0xvn-chachapon-keecharoens-projects.vercel.app";
const buildSelect = document.querySelector('select[name="building"]');
const statusSelect = document.querySelector('select[name="status"]');

window.onload = async () => {
    try {
        const selects = [buildSelect, statusSelect];

        // เมื่อมีการเลือกใน select
        selects.forEach(select => {
            select.addEventListener('change', async () => {
                try {
                    await loadData(); 
                } catch (error) {
                    console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
                } 
            });
        });

        // เรียกโหลดข้อมูลครั้งแรกเมื่อหน้าถูกโหลด
        await loadData();
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
    }
}

const loadData = async () => {
    try {
        const userDOM = document.getElementById('test');
        const building = buildSelect.value;
        const status = statusSelect.value;

        const response = await axios.get(`${BASE_URL}/hotel?building=${building}`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2ZnlldmF3anFtY25oZXNoamN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NjcxODIsImV4cCI6MjA1NjU0MzE4Mn0.dYK4XkwRxHzzSfpZtozQjhb7OqNs3jxl82ff8gCR3Tc`
            }
        });
        

        if (!response.data || response.data.length === 0) {
            userDOM.innerHTML = "<p>ไม่มีข้อมูลห้องพัก</p>";
            return;
        }

        let board = '';
        response.data.forEach((room) => {
            if (status === 'All' || room.status === status) {
                board += `
                <div class="${room.status === 'Available' ? 'Available' : 'Occupied'}">
                    <p>ห้องที่: ${room.room_number}</p>
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
