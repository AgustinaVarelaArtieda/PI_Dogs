/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};
const dog2={
  name: 'Labrador',
  image: 'labrador.jpg',
  life_span: '12-15 years',
  weight_min: 15,
  weight_max: 55,
  height_min: 35,
  height_max: 80,
}

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog2)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs?name=...', () => {
    it('should get 200', () =>
      agent.get('/dogs?name=Labrador').expect(200)
    );
    it('should throw an error if no dogs are found', async () => {
      await agent.get('/dogs?name=Dereck').expect(400);
    })
  });
  describe('GET /dogs/:id', () => {
    it('should get 200 from API', () =>
      agent.get('/dogs/1').expect(200)
    );
    it('should throw an error if no dogs are found', async () => {
      await agent.get('/dogs/9991').expect(400);
    });
  })
  describe('POST /dogs', ()=>{
    it('should get 200', ()=>{
      agent.post('/dogs').send(dog2).expect(200)
    })
    it('should get 400', ()=>{
      agent.post('/dogs').send(dog).expect(400)
    })
  })
});
