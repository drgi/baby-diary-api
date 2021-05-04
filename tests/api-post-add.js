const test = require('ava');
const agent = require('supertest');
const createApp = require('../app');
const { clearTestRecordFromDb } = require('./helpers/cleardb')

const app = agent(createApp())

test.before('clean DB', async t => {
    console.log('Before test')
    await clearTestRecordFromDb()
    await clearTestRecordFromDb('20.01.2021')
})

test('Post day record with valid data and date only once', async t => {
    const data = {
        dateStr: '22.01.2021',
        data: {height: 63, weight: 3.56}
    }
    const res = await app.post('/api/addday').send(data)
    t.is(res.status, 200)

    const secondRes = await app.post('/api/addday').send(data)
    t.is(secondRes.status, 400)
    t.truthy(typeof secondRes.body.error === 'string')
    t.is(secondRes.body.error, 'Запись с такой датой уже есть')
    
})

test('Post day record with valid data and invalid date format', async t => {
    const data = {
        dateStr: '22.01.202', // INVALID
        data: {height: 63, weight: 3.56}
    }
    const res = await app.post('/api/addday').send(data)
    t.is(res.status, 400)
    t.truthy(typeof res.body.error === 'string')
    t.is(res.body.error, 'Не верный формат строки с датой')
})

test('Post day record with no data', async t => {
    const data = {
        dateStr: '22.01.2021', 
        NOdata: {height: 63, weight: 3.56} // INVALID
    }
    const res = await app.post('/api/addday').send(data)
    t.is(res.status, 400)
    t.truthy(typeof res.body.error === 'string')
    t.is(res.body.error, 'Нет полей Date или Data')
})

test('Post day record with data invalid data format(height)', async t => {
    const data = {
        dateStr: '20.01.2021', 
        data: {height: 'ivalid', weight: 3.56} // INVALID
    }
    const res = await app.post('/api/addday').send(data)
    t.is(res.status, 400)
    t.truthy(typeof res.body.error === 'string')
    t.is(res.body.error, 'Не верно указан рост, рост должен быть целым числом в сантиметрах')
})

test('Post day record with data invalid data format(weight)', async t => {
    const data = {
        dateStr: '10.01.2021', 
        data: {height: 65, weight: 'invalid'} // INVALID
    }
    const res = await app.post('/api/addday').send(data)
    t.is(res.status, 400)
    t.truthy(typeof res.body.error === 'string')
    t.is(res.body.error, 'Не верно указан вес, вес должен быть целым числом в килограммах. Например 3.650')

})
test('Post day record with invalid data ', async t => {
    const data = {
        dateStr: '10.01.2021', 
        data: {} // INVALID
    }
    const res = await app.post('/api/addday').send(data)
    t.is(res.status, 400)
    t.truthy(typeof res.body.error === 'string')
    t.is(res.body.error, 'Нет поля с ростом')

})