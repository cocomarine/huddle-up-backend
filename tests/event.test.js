const { expect } = require('chai');
const request = require('supertest');
const { Event, User } = require('../src/models');
const app = require('../src/app');

describe('/events', () => {
  before(async () => Event.sequelize.sync());

  let testUser;

  beforeEach(async () => {
    await Event.destroy({ where: {} });
    await User.destroy({ where: {} });

    testUser = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@email.com',
      password: 'password123',
    })
  });

  describe('with no records in the database', () => {
    describe('POST /events', () => {
      it('creates a new event in the database', async () => {
        const res = await request(app)
          .post('/events')
          .send({
            title: 'Test Event',
            date: '2023-05-01',
            description: 'test description',
            participants: 'user1, user2, user3',
            total_votes: 2,
            category: 'test category',
            AdminId: 1,
          });

          const newEventRecord = await Event.findByPk(res.body.id, {
            raw: true,
          });

          console.log(res.body)
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal('Test Event');
          expect(res.body.date).to.equal('2023-05-01');
          expect(res.body.description).to.equal('test description');
          expect(res.body.participants).to.equal('user1, user2, user3');
          expect(res.body.total_votes).to.equal(2);
          expect(res.body.category).to.equal('test category');
          expect(res.body.AdminId).to.equal(1);

          expect(newEventRecord.title).to.equal('Test Event');
          expect(newEventRecord.date).to.equal('2023-05-01');
          expect(newEventRecord.description).to.equal('test description');
          expect(newEventRecord.participants).to.equal('user1, user2, user3');
          expect(newEventRecord.total_votes).to.equal(2);
          expect(newEventRecord.category).to.equal('test category');
          expect(newEventRecord.AdminId).to.equal(1);
      });

      it('throws an error when no data provided', async () => {
        const res = await request(app)
          .post('/events')
          .send({
            title: '',
            date: '',
            description: '',
            participants: '',
            total_votes: null,
            category: '',
            AdminId: null,
          });

          const newEventRecord = await Event.findByPk(res.body.id, {
            raw: true,
          });

          expect(res.status).to.equal(400);
          expect(newEventRecord).to.equal(null);
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
          date: '2023-05-01',
          description: 'test description1',
          participants: 'user1, user2, user3',
          total_votes: 0,
          category: 'test category1',
          AdminId: 1,
        }),
        Event.create({
          title: 'Test Event2',
          date: '2023-05-10',
          description: 'test description2',
          participants: 'user1, user3, user4',
          total_votes: 1,
          category: 'test category2',
          AdminId: 2,
        }),
        Event.create({
          title: 'Test Event3',
          date: '2023-05-20',
          description: 'test description3',
          participants: 'user2, user3, user4',
          total_votes: 2,
          category: 'test category3',
          AdminId: 3,
        }),
      ]);
    })

    describe('GET /events', () => {
      it('gets all events records', async () => {
        const res = await request(app)
          .get('/events');

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((testEvent) => {
          const expected = testEvents.find((a) => a.id === testEvent.id);
  
          expect(testEvent.title).to.equal(expected.title);
          expect(testEvent.date).to.equal(expected.date);
          expect(testEvent.description).to.equal(expected.description);
          expect(testEvent.participants).to.equal(expected.participants);
          expect(testEvent.total_votes).to.equal(expected.total_votes);
          expect(testEvent.category).to.equal(expected.category);
          expect(testEvent.AdminId).to.equal(expected.AdminId);
      });
    });

    describe('GET /events/:id', () => {
      it('gets event record by id', async () => {
        const event = testEvents[0];
        const res = await request(app)
          .get(`/events/${event.id}`);

        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(event.title);
        expect(res.body.date).to.equal(event.date);
        expect(res.body.description).to.equal(event.description);
        expect(res.body.participants).to.equal(event.participants);
        expect(res.body.total_votes).to.equal(event.total_votes);
        expect(res.body.category).to.equal(event.category);
        expect(res.body.AdminId).to.equal(event.AdminId);
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

    describe('DELETE /events/:id', () => {
      it('deletes event record by id', async () => {
        const event = testEvents[0];
        const res = await request(app)
          .delete(`/events/${event.id}`);

        const deletedEvent = await Event.findByPk(event.id, { raw: true });

        expect(res.status).to.equal(204);
        expect(deletedEvent).to.equal(null);
      });

      it('returns a 404 if the event does not exist', async () => {
        const res = await request(app)
          .delete('/events/123456');

        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('event does not exist');
      });
    });
  });
  });
});