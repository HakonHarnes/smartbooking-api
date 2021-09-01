const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

jest.setTimeout(30000);
it('Get Room 1 endpoint', async (done) => {
    const response = await request.get('/api/rooms/1');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.room_id).toBe(1);
    expect(res.room_name).toEqual('SB1');
    done();
});

it('Get Room 2 endpoint', async (done) => {
    const response = await request.get('/api/rooms/2');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.room_id).toBe(2);
    expect(res.room_name).toEqual('SB2');
    done();
});

it('Get Avalible Rooms endpoint', async (done) => {
    const response = await request.get(
        '/api/rooms/search?organization_id=1&start=2021-10-06T09:00:00.000Z&end=2021-10-09T15:00:00.000Z'
    );
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.length).toBe(5);
    done();
});

it('Update Rooms endpoint', async (done) => {
    const data = {
        name: 'LB06',
        size: 5,
        is_active: 0,
        organization_id: 1,
        building_id: 1,
    };
    const response = await request.put('/api/rooms/6').send(data);
    expect(response.status).toBe(200);
    done();
});

it('Update Rooms endpoint failing', async (done) => {
    const data = {
        name: 'LB06',
        size: 5,
        is_active: 0,
        organization_id: 1,
        building_id: 1,
    };
    const response = await request.put('/api/rooms/6').send(data);
    expect(response.status).toBe(304);
    done();
});

it('Get updated Room 6', async (done) => {
    const response = await request.get('/api/rooms/6');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.room_id).toBe(6);
    expect(res.room_name).toEqual('LB06');
    expect(res.size).toEqual(5);
    expect(res.organization_id).toEqual(1);
    done();
});