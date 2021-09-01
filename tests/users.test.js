const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

jest.setTimeout(30000)
it('Test Get User 1 endpoint', async (done) => {
    const response = await request.get('/api/users/1');
    res = response.body.data;
    expect(response.status).toBe(200);
    expect(res.user_id).toBe(1);
    expect(res.email).toEqual('admin@smartbooking.no');
    done();
});

