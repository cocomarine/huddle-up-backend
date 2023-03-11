const { expect } = require('chai');
const request = require('supertest');
const { Event } = require('../src/models');
const app = require('../src/app');

describe('/events', () => {
  before(async () => Event.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /events', () => {

      let testEvent;
      // let testUser;
  
      beforeEach(async () => {
        await Event.destroy({ where: {} });
        // await User.destroy({ where: {} });

        testEvent = {
          title: 'Test Event',
          description: 'Any suggestions are welcome!',
          total_votes: 2,
          AdminId: 1,
        };

        // testUser = await User.create({
        //   first_name: 'John',
        //   last_name: 'Doe',
        //   email: 'test@email.com',
        //   password: 'Password123',
        // }); 
      });
  
      it('creates a new event in the database', async () => {
        const res = await request(app)
          .post('/events')
          .send(testEvent);

          const newEventRecord = await Event.findByPk(res.body.id, {
            raw: true,
          });

          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal('Test Event');
          expect(res.body.description).to.equal('Any suggestions are welcome!');
          expect(res.body.total_votes).to.equal(2);
          expect(res.body.AdminId).to.equal(1);

          expect(newEventRecord.title).to.equal('Test Event');
          expect(newEventRecord.description).to.equal('Any suggestions are welcome!');
          expect(newEventRecord.total_votes).to.equal(2);
          expect(newEventRecord.AdminId).to.equal(1);
      });
    });
  });

  describe('with records in the database', () => {

    let testEvents;

    beforeEach(async () => {
      await Event.destroy({ where: {} });

      testEvents = await Promise.all([
        Event.create({
          title: 'Test Event1',
          description: 'Any suggestions are welcome!',
          total_votes: 2,
          AdminId: 1,
        }),
        Event.create({
          title: 'Test Event2',
          description: 'Where shall we meet?',
          total_votes: 1,
          AdminId: 1,
        }),
        Event.create({
          title: 'Test Event3',
          description: "Let's go somewhere!",
          total_votes: 0,
          AdminId: 2,
        }),
      ]);
    });

    describe('GET /events', () => {
      it('gets all events records', async () => {
        const res = await request(app)
          .get('/events');

        expect(res.status).to.equal(200);
      });
    });

    describe('PATCH /events/:id', () => {
      it('updates title by id', async () => {
        const event = testEvents[0];
        const res = await request(app)
          .patch(`/events/${event.id}`)
          .send({ title: 'Test Event1-1'});

        const updatedEventRecord = await Event.findByPk(event.id, { raw: true });

        expect(res.status).to.equal(200);
        expect(updatedEventRecord.title).to.equal('Test Event1-1');
      });

      it('updates total votes by id', async () => {
        const event = testEvents[0];
        const res = await request(app)
          .patch(`/events/${event.id}`)
          .send({ total_votes: 1 });

        const updatedEventRecord = await Event.findByPk(event.id, { raw: true });

        expect(res.status).to.equal(200);
        expect(updatedEventRecord.total_votes).to.equal(1);
      });
    });
  });
});