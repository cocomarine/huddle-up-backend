const { expect } = require('chai');
const request = require('supertest');
const { User, Event } = require('../src/models');
const app = require('../src/app');

describe('/users', () => {
  before(async () => User.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /users', () => {

      let testUser;
      let testEvent;
  
      beforeEach(async () => {
        await User.destroy({ where: {} });
        await Event.destroy({ where: {} });

        testUser = {
          first_name: 'John',
          last_name: 'Doe',
          email: 'test@email.com',
          password: 'Password123',
        };

        testEvent = await Event.create({
          title: 'Test Event',
          description: 'Any suggestions are welcome!',
          votes_per_person: '2',
          voting_finished: 'false',
        }); 
      });
  
      it('creates a new user in the database', async () => {
        const res = await request(app)
          .post('/users')
          .send(testUser);

          const newUserRecord = await User.findByPk(res.body.id, { raw: true });

          expect(res.status).to.equal(201);
          expect(res.body.first_name).to.equal('John');
          expect(res.body.last_name).to.equal('Doe');
          expect(res.body.email).to.equal('test@email.com');
          expect(res.body.password).to.equal(undefined);

          expect(newUserRecord.first_name).to.equal('John');
          expect(newUserRecord.last_name).to.equal('Doe');
          expect(newUserRecord.email).to.equal('test@email.com');
          expect(newUserRecord.password).to.equal('Password123');
      });

      it('returns error when first name is not provided', async () => {
        testUser.first_name = null;
        const res = await request(app)
          .post('/users')
          .send(testUser);

        console.log(res.body.err)
        expect(res.status).to.equal(400);
        // expect(res.body.error).to.equal(xxxx);
      })
    });
  });

  describe('with records in the database', () => {

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