const test = require('ava');
const agent = require('supertest');
const createApp = require('../app');
const { clearTestRecordFromDb } = require('./helpers/cleardb')
const { addTestDataRange, deleteTestRange } = require('./helpers/addTestRange')

const app = agent(createApp())
const testRange = ['01.01.2021','02.01.2021','03.01.2021','04.01.2021','05.01.2021','06.01.2021','07.01.2021','08.01.2021','09.01.2021',]
test.before('add Range DB', async t => {
    console.log('Before test')
    await deleteTestRange(testRange)
    await deleteTestRange(testRange)
    await deleteTestRange(testRange)
    await addTestDataRange(testRange)
    //await clearTestRecordFromDb('20.01.2021')
})
test.after('clean DB', async t => {
    console.log('After test')
    await deleteTestRange(testRange)
})
test('Get data by date range', async t => {
    const data = {
        start: '01.01.2021',
        end: '09.02.2021'
    }
    const res = await app.get(`/api/dayrange?start=${data.start}&end=${data.end}`)
    t.is(res.status, 200)
    t.truthy(Array.isArray(res.body))     
})