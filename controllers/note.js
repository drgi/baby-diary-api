const Dairy = require('../model/Diaryday');
const { saveFiles, deleteFile } = require('../controllers/filesaver')

function convertStringToDate(dateStr) {
    if (!dateStr) {
        throw new Error('Нет строки с датой')
    }
    if (!/^\d{2}\.\d{2}\.\d{4}$|^\d{1}\.\d{2}\.\d{4}$|^\d{2}\.\d{1}\.\d{4}$|^\d{1}\.\d{1}\.\d{4}$/.test(dateStr)) {
        throw new Error('Не верный формат строки с датой')
    }
    const date = dateStr.split('.').reverse().join('-')
    const d = new Date(date)
    if (d.toString() === 'Invalid Date') {
        throw new Error(`Дата ${dateStr}, в запросе не верна(`)
    }
    return new Date(date) 
}
async function getDay(dateStr) {
    const day = await Dairy.findOne({dateStr})
    return day    
}
async function getDataByDateRange(startDateStr, endDateStr) {
    const startDate = convertStringToDate(startDateStr)
    const endDate = convertStringToDate(endDateStr)
    const dayRange = await Dairy.find({date: {$gte: startDate, $lte: endDate}}).sort({date: 1})
    if (dayRange.length === 0) {
        throw new Error(`Нет данных по датам ${startDateStr}-${endDateStr}`)
    }
    return dayRange
}

async function postDay(dateStr, payload) {
    const date = convertStringToDate(dateStr)
    const newDay = new Dairy({dateStr, dayData: payload, date})
    const day = await getDay(dateStr)
    if (day) {
        throw new Error('Запись с такой датой уже есть')
    }

    await newDay.save()
    return newDay
}

async function attachPhotos(day, filesArr) {
    const pathArr = saveFiles(filesArr, day.dateStr)
    console.log('PathArr', pathArr)
    day.photos = day.photos.concat(pathArr)
    return day.save()
}
async function updateData(dateStr, payload) {
    return await Dairy.findOneAndUpdate({dateStr}, {dayData: payload}, {new: true, runValidators: true})
}
async function deletePhoto(dateStr, photo) {
    convertStringToDate(dateStr);
    const day = await getDay(dateStr);
    if (day) {
        if (deleteFile(photo, day.dateStr)) {
            day.photos = day.photos.filter(p => p.fileName !== photo.fileName)
            await day.save()
            return day
        }
    } else {
        throw new Error('Запись в такой датой не найдена')
    }
}
module.exports = {
    postDay,
    getDataByDateRange,
    attachPhotos,
    getDay,
    convertStringToDate,
    updateData,
    deletePhoto
}