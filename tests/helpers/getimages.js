const Diary = require('../../model/Diaryday');

async function getImagesForTestingDelete(dateStr) {
    const day = await Diary.findOne({dateStr});
    return day.photos[0]
}
module.exports = { getImagesForTestingDelete }