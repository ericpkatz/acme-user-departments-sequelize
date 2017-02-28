const expect = require('chai').expect;
const db = require('../db');

describe('models', ()=> {
  beforeEach((done)=> {
    db.seed()
      .then( ()=> done())
      .catch( err => done(err));
  });

  it('there are two users', (done)=> {
     db.models.User.findAll()
      .then( users => {
        expect(users.length).to.equal(2);
        done();
      })
      .catch((err)=> done(err));
  });

  it('there are two departments', (done)=> {
     db.models.Department.findAll()
      .then( departments => {
        expect(departments.length).to.equal(2);
        done();
      })
      .catch((err)=> done(err));
  });

  describe('user instance methods', ()=> {
    let prof, departments;
    beforeEach( ()=> {
      var findProf = db.models.User.findOne({ where: { name: 'prof'}, include: [ db.models.UserDepartment]});
      var findDepartments = db.models.Department.findAll();
      return Promise.all([ findProf, findDepartments  ])
        .then( result => {
          let [ _prof, _departments ] = result;
          prof = _prof;
          departments = _departments;
        });
    });

    it('prof exists', ()=> {
      expect(prof.name).to.equal('prof');
    });

    it('he has departments', ()=> {
      expect(prof.hasNoDepartments()).to.be.false;
    });

    it('he does not have all of them', ()=> {
      expect(prof.hasAllDepartments(departments)).to.be.false;
    });

  });
});
