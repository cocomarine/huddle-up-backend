const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../src/models');
const app = require('../src/app');

describe('/users', () => {
  before(async () => User.sequelize.sync());

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });
    
  describe('with no records in the database', () => {
    describe('POST /users', () => {
      it('creates a new user in the database', async () => {
        const res = await request(app)
          .post('/users')
          .send({
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@email.com',
            password: 'password123',
          });
        
        const newUserRecord = await User.findByPk(res.body.id, { raw: true });
        
        expect(res.status).to.equal(201);
        expect(res.body.first_name).to.equal('John');
        expect(res.body.last_name).to.equal('Doe');
        expect(res.body.email).to.equal('test@email.com');
        expect(res.body.password).to.equal(undefined);
        
        expect(newUserRecord.first_name).to.equal('John');
        expect(newUserRecord.last_name).to.equal('Doe');
        expect(newUserRecord.email).to.equal('test@email.com');
        expect(newUserRecord.password).to.equal('password123');
      });
      
      it('throws an error when no data are provided', async () => {
        const res = await request(app)
          .post('/users')
          .send({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
          });
        
        const newUserRecord = await User.findByPk(res.body.id, {
          raw: true,
        });

        expect(res.status).to.equal(400);
        expect(newUserRecord).to.equal(null);
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
          password: 'password123',
        }),
        User.create({
          first_name: 'Mia',
          last_name: 'Doe',
          email: 'mia@email.com',
          password: 'PASSWORD123',
        }),
        User.create({
          first_name: 'Toto',
          last_name: 'Ro',
          email: 'toto@email.com',
          password: '123password',
        }),
      ]);
    });
    
    describe('GET /users', () => {
      it('gets all users records', async () => {
        const res = await request(app)
        .get('/users');
        
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((testUser) => {
          const expected = testUsers.find((a) => a.id === testUser.id);
          
          expect(testUser.first_name).to.equal(expected.first_name);
          expect(testUser.last_name).to.equal(expected.last_name);
          expect(testUser.email).to.equal(expected.email);
      });
    });
  });
});
});