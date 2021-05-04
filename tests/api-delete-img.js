const test = require('ava');
const agent = require('supertest');
const createApp = require('../app');
const { getImagesForTestingDelete } = require('./helpers/getimages')
let photo = null;
const invalidFile = {fileName: 'invalid', url: ''}
const testDate = '11.11.2020'
test.before('Get images from DB for testing Delete api', async t => {
    photo = await getImagesForTestingDelete(testDate)
});

const app = agent(createApp());

test('Delete image', async t => {
    const res = await app.delete('/api/photos').send({dateStr: testDate, photo});

    t.is(res.status, 200)

})

test('Delete image with invalid fields', async t => {
    const res = await app.delete('/api/photos').send({NodateStr: testDate, photo});
    t.is(res.status, 400)
})
test('Delete image with Invalid Date', async t => {
    const res = await app.delete('/api/photos').send({dateStr: '01.10.1999', photo});
    t.is(res.status, 400)
})
test('Delete image with Invalid fileName', async t => {
    const res = await app.delete('/api/photos').send({dateStr: testDate, photo: invalidFile});
    t.is(res.status, 400)
})
