const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

jest.setTimeout(30000)

it('Get Buildings for organization 2 endpoint', async (done) => {
    const response = await request.get('/api/buildings/?organization_id=1');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.length).toBe(2)
    done();
});

it('Create Building 3 endpoint', async (done) => {
    const data = {
        buildingName: 'LisjeBygg',
        organization_id: 1
    };
    const response = await request.post('/api/buildings/').send(data);
    res = response.body.data;
    expect(response.status).toBe(200);
    done();
});

it('Get updated Buildings for organization 1', async (done) => {
    const response = await request.get('/api/buildings/?organization_id=1');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.length).toBe(3)
    done();
});

it('Delete Building for organization 2', async (done) => {
    const response = await request.delete('/api/buildings/3');
    res = response.body.data;
    expect(response.status).toBe(200);
    done();
});

it('Get updated Buildings for organization 2', async (done) => {
    const response = await request.get('/api/buildings/?organization_id=1');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.length).toBe(2)
    done();
});