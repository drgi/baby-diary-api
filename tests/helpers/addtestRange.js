const Dairy = require('../../model/Diaryday');

async function addTestDataRange(dateArr) {  
    const dayData = {
        height: '64',
        weight: '3.65'
    }  
    try {
        dateArr = dateArr.map(element => {
            const d = element.split('.').reverse().join('-')
            return {dateStr: element, dayData, date: new Date(d)}            
        });
        const days = await Dairy.insertMany(dateArr)
        
    } catch (error) {
        console.log(error.message)
    }
}
async function deleteTestRange(arr) {
    try {
        await Dairy.deleteMany({dateStr: arr})
    } catch (error) {
        console.log(error.message)
    }
} 

module.exports = { addTestDataRange, deleteTestRange }