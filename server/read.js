// readData.js
const supabase = require('./conn'); 

const readData = async (building) => {
  let build_rooms = '';
  if (building === 'building1') {
    build_rooms = 'building1_rooms';  
  } else {
    build_rooms = 'building1_rooms';  
  }

  
let { data: data, error } = await supabase
.from(build_rooms)
.select('*')

         

  if (error) {
    throw new Error(error.message);  
  }

  return data;  
};

module.exports = readData;
