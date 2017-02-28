const expect = require('chai').expect;
const client = require('supertest')(require('../app'));
const db = require('../db');

describe('routes', ()=> {
  beforeEach( ()=> {
    return db.seed();
  });

  describe('GET /', ()=> {
    it('displays both users', ()=> {
      return client.get('/')
        .expect(200)
        .then( result => {
          expect(result.text).contains('prof');
          expect(result.text).contains('mitch');
        });
    });
  });

});
