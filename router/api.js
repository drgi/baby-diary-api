const express = require('express');
const router = express.Router();
const {postDay, getDataByDateRange, attachPhotos, convertStringToDate, getDay, updateData, deletePhoto} = require('../controllers/note')
const { parseError } = require('../controllers/errors');
const upload = require('../controllers/filehandler')


// 1 Post OneDay
router.post('/addday', async (req, res) => {
    //console.log(req.body)
    const { dateStr, data} = req.body
    if (!dateStr || !data) {
        return res.status(400).json({error: 'Нет полей Date или Data'})
    }
    try {
        const day = await postDay(dateStr, data)
        return res.status(200).json(day)
    } catch (error) {
       // console.log('Error:', parseError(error))
        // console.log('Error function:', parseError(error))
        // console.log('Error:', error.message.match(/[а-я0-9\s\,\.]+$/gi))
        // const errorStr = error.message.match(/[а-я0-9\s\.]+$/gi)?.join('').trim()
        return res.status(400).json({error: parseError(error) || error.message})
    }
    
    // {dateStr, payload}
    // 1 Проверить поля
    // 2 Валидировать dateStr и преоброзовать в дату
    // 3 В контроллер валидировать и сохранить в базу
    // 4 Обрабочик ошибок блок cath
    

   
})
// 2 Edit Day
router.put('/addday', async (req, res) => {
    const { dateStr, data} = req.body
    if (!dateStr || !data) {
        return res.status(400).json({error: 'Нет полей Date или Data'})
    }
    try {
        const day = await updateData(dateStr, data)
        if (day) { return res.status(200).json(day)}
        else {throw new Error('Запись в базе не найдена')}
    } catch (err) {
        console.log('Get error:', err.message)
        return res.status(400).json({error: parseError(err) || error.message})        
    }
    res.status(200).send('Hello')
    // 1 Get day
    // 2 Save()
})
// 3 Get Data by Date range
router.get('/dayrange', async (req, res) => {
    const { start, end } = req.query
    if (!start || !end) {
        return res.status(400).json({error: 'Не верные параметрыи или переменные в запросе'})
    }
   // console.log('Start', start, 'End', end)
    try {
        const range = await getDataByDateRange(start, end)
        return res.status(200).json(range)
    } catch (err) {
       // console.log('Error', err.message)
        return res.status(400).json({error: parseError(err) || error.message})
    }
})
// 4 upload photos
router.post('/photos', upload.array('photos', 10), async (req, res) => {
    console.log('Files: ', req.files);
    console.log('Body: ', req.body);
    const files = req.files
    const { dateStr } = req.body
    if (!dateStr) { return res.status(400).json({error: 'Нет поля с датой'})}
    if (files.length === 0) { return res.status(400).json({error: 'Нет файлов для загрузки'})}
    try {
        await convertStringToDate(dateStr) // Validate date format
        let day = await getDay(dateStr)
        if (!day) { throw new Error('Сначала создайте/сохраните запись с данными') }
        await attachPhotos(day, files);
        console.log('Day with Photos:', day)
        return res.status(200).json(day)
    } catch (err) {
        console.log('Error: ', err.message);
        return res.status(400).json({error: parseError(err) || error.message})
    }
    // 1 Сохранить файлыб получить массив с путями и именами файлов
    // 2 При успехе изменить запись в базе   
})
router.delete('/photos', async (req, res) => {
    const { dateStr, photo } = req.body;
    console.log('Delete Photo:', req.body)
    if (!dateStr || !photo) { return res.status(400).json({error: 'Не верные поля в запросе'})}
    try {
        const day = await deletePhoto(dateStr, photo)
        return res.status(200).json(day)
    } catch (err) {
        console.log('Delete error: ', err.message)
        return res.status(400).json({error: parseError(err) || error.message})
    }
})

module.exports = router