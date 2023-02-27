const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../src/models');
const app = require('../src/app');

describe('/users', () => {
  before(async () => User.sequelize.sync());

  describe('with no user records in the database', () => {
    describe('POST /users', () => {

      let testUser;
  
      beforeEach(async () => {
        await User.destroy({ where: {} });
  
        testUser = {
          first_name: 'John',
          last_name: 'Doe',
          email: 'test@email.com',
          password: 'Password123',
        };
        // testUser = await User.create({
        //   first_name: 'John',
        //   last_name: 'Doe',
        //   email: 'test@email.com',
        //   password: 'Password123',
        // }); 
      });
  
      xit('creates a new user in the database', async () => {
        const res = await request(app)
          .post('/users')
          .send(testUser);

          expect(res.status).to.equal(201);
      });
    });
  });

  describe('with user records in the database', () => {

    let testUsers;

    beforeEach(async () => {
      await User.destroy({ where: {} });

      testUsers = await Promise.all([
        User.create({
          first_name: 'John',
          last_name: 'Doe',
          email: 'test@email.com',
          password: 'Password123',
        }),
        User.create({
          first_name: 'Mia',
          last_name: 'Doe',
          email: 'mia@email.com',
          password: 'PASSWORD123',
        }),
      ]);
    });

    describe('GET /users', () => {
      it('gets all users records', async () => {
        const res = await request(app)
          .get('/users');

        expect(res.status).to.equal(200);
      });
    });
  });
});