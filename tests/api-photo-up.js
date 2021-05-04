const test = require('ava');
const agent = require('supertest');
const createApp = require('../app');
const path = require('path');

const app = agent(createApp());

test('Upload valid Photo', async t => {
    const res = await app.post('/api/photos').field('dateStr', '11.11.2020').attach('photos', path.resolve(__dirname, '../tests/testfiles/fortest.jpg'))
    t.is(res.status, 200);
})

test('Upload Photo without Photo)', async t => {
    const res = await app.post('/api/photos').field('dateStr', '11.11.2020')
    t.is(res.status, 400);
})

test('Upload Photo without DateStr)', async t => {
    const res = await app.post('/api/photos').field('dateStr', '').attach('photos', path.resolve(__dirname, '../tests/testfiles/fortest.jpg'))
    t.is(res.status, 400);
})

test('Upload Photo with invalid Date)', async t => {
    const res = await app.post('/api/photos').field('dateStr', 'invalid').attach('photos', path.resolve(__dirname, '../tests/testfiles/fortest.jpg'))
    t.is(res.status, 400);
})