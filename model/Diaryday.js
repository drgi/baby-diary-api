const mongoose = require('mongoose');

const dataScheme = {
    height: {
        type: String,
        //required: [true, 'Нет поля с ростом'],
        validate: {
            validator: (v) => /^[0-9]+$/.test(v),
            message: 'Не верно указан рост, рост должен быть целым числом в сантиметрах'
        }
    },
    weight: {
        type: String,
        required: [true, 'Нет поля с весом'],
        validate: {
            validator: (v) => /^[0-9]+\.[0-9]+$/.test(v),
            message: 'Не верно указан вес, вес должен быть целым числом в килограммах. Например 3.650'
        }
    },
    events:[Object]
}

const dayScheme = {
    dateStr: {
        type: String,
        required: [true, 'Нет поля строка дата'],
        validate: {
            validator: (v) => /^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9][0-9][0-9]$/.test(v),
            message: 'Не верный формат даты'
        }
    },
    date: {
        type: Date,
        required: [true, 'Нет поля с объектом Дата']
    },
    photos: {
        type: Array
    },
    dayData: dataScheme
}

const DayScheme = new mongoose.Schema(dayScheme)

const Dairy = mongoose.model('Dairy', DayScheme)

module.exports = Dairy