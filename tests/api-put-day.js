const test = require('ava');
const agent = require('supertest');
const createApp = require('../app');
const { clearTestRecordFromDb } = require('./helpers/cleardb')

const app = agent(createApp())



test('Put updated day record with valid data', async t => {
    const data = {
        dateStr: '11.11.2020',
        data: {height: 65, weight: 3.56}
    }
    const res = await app.put('/api/addday').send(data)
    t.is(res.status, 200)
})

test('Put updated day record with invalid Date', async t => {
    const data = {
        dateStr: 'invalid',
        data: {height: 65, weight: 3.56}
    }
    const res = await app.put('/api/addday').send(data)
    t.is(res.status, 400)
    console.log('Rsponse after put: ', res.body)
})

test('Put updated day record with no Date', async t => {
    const data = {
        dateStr: '',
        data: {height: 65, weight: 3.56}
    }
    const res = await app.put('/api/addday').send(data)
    t.is(res.status, 400)
    console.log('Rsponse after put: ', res.body)
})

test('Put updated day record with ivalid Data', async t => {
    const data = {
        dateStr: '11.11.2020',
        data: {height: 'invalid', weight: 3.56}
    }
    const res = await app.put('/api/addday').send(data)
    t.is(res.status, 400)
    console.log('Rsponse after put: ', res.body)
})

test('Put updated day record with ivalid field in Data', async t => {
    const data = {
        dateStr: '11.11.2020',
        data: {height: 66, weight: 3.56, invalid: 'invalid'}
    }
    const res = await app.put('/api/addday').send(data)
    t.is(res.status, 200)
    console.log('Rsponse after put: ', res.body)
})