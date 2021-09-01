const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

jest.setTimeout(30000);

it('Get Reservations 1 endpoint', async (done) => {
    const response = await request.get('/api/reservations/1');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.res_id).toBe(1);
    done();
});

it('Get Reservations by user', async (done) => {
    const response = await request.get('/api/reservations?user_id=2');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.length).toBe(2);
    done();
});

it('Get Reservations by room', async (done) => {
    const response = await request.get('/api/reservations?room_id=2');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.length).toBe(3);
    done();
});

it('Get Reservations by room', async (done) => {
    const response = await request.get(
        '/api/reservations?room_id=2&start=2021-10-05T10:00:00.000Z&end=2021-10-07T14:00:00.000Z'
    );
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.length).toBe(2);
    expect(res[0].res_id).toBe(3);
    expect(res[1].res_id).toBe(4);
    done();
});

it('Bad request reservation due to start/end', async (done) => {
    const data = {
        data: {
            start: '2021-04-13T16:14:00.000Z',
            end: '2021-04-13T18:00:00.000Z',
            room_id: 1,
            user_id: 3,
        },
    };
    const response = await request.post('/api/reservations/').send(data);
    expect(response.status).toBe(400);
    done();
});
