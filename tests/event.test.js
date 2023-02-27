const { expect } = require('chai');
const request = require('supertest');
const { Event, User } = require('../src/models');
const app = require('../src/app');

describe('/events', () => {
  before(async () => Event.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /events', () => {

      let testEvent;
      let testUser;
  
      beforeEach(async () => {
        await Event.destroy({ where: {} });
        await User.destroy({ where: {} });

        testEvent = {
          title: 'Test Event',
          description: 'Any suggestions are welcome!',
          votes_per_person: '2',
          voting_finished: 'false',
        };

        testUser = await User.create({
          first_name: 'John',
          last_name: 'Doe',
          email: 'test@email.com',
          password: 'Password123',
        }); 
      });
  
      it('creates a new event in the database', async () => {
        const res = await request(app)
          .post('/events')
          .send(testEvent);

          expect(res.status).to.equal(201);
      });
    });
  });

  // describe('with records in the database', () => {

  //   let testUsers;

  //   beforeEach(async () => {
  //     await User.destroy({ where: {} });

  //     testUsers = await Promise.all([
  //       User.create({
  //         first_name: 'John',
  //         last_name: 'Doe',
  //         email: 'test@email.com',
  //         password: 'Password123',
  //       }),
  //       User.create({
  //         first_name: 'Mia',
  //         last_name: 'Doe',
  //         email: 'mia@email.com',
  //         password: 'PASSWORD123',
  //       }),
  //     ]);
  //   });

  //   describe('GET /users', () => {
  //     it('gets all users records', async () => {
  //       const res = await request(app)
  //         .get('/users');

  //       expect(res.status).to.equal(200);
  //     });
  //   });
  // });
});