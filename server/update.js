// update.js
const supabase = require('./conn'); 

const updateData = async (building, updateRoom) => {
  let build_rooms = '';
  if (building === 'building1') {
    build_rooms = 'building1_rooms';  
  } else {
    build_rooms = 'building2_rooms';  
  }

  
let { data: data, error } = await supabase
.from(build_rooms)
.update(updateRoom)
.select('*')

         

  if (error) {
    throw new Error(error.message);  
  }

  return data;  
};

module.exports = updateData;
