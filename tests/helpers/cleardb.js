const Dairy = require('../../model/Diaryday');

async function clearTestRecordFromDb(dateStr = '22.01.2021') {
    try {
       await Dairy.deleteMany({dateStr})
    } catch (error) {
        console.log(error.message)
    }
} 

module.exports = { clearTestRecordFromDb }