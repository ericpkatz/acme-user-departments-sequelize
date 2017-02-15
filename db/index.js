const db = require('./db'); 

const User = require('./User'); 

const Department = require('./Department'); 

const UserDepartment = require('./UserDepartment'); 

User.hasMany(UserDepartment);
Department.hasMany(UserDepartment);

UserDepartment.belongsTo(User);
UserDepartment.belongsTo(Department);

const sync = ()=> {
  return db.sync({ force: true });
}

const seed = ()=> {
  let prof;
  let mitch;
  let engineering;
  let hr;
  return sync()
    .then( ()=> User.create({ name: 'prof'}))
    .then( user => prof = user)
    .then( ()=> User.create({ name: 'mitch'}))
    .then( user => mitch = user)
    .then( ()=> Department.create({ name: 'engineering'}))
    .then( department => engineering = department)
    .then( ()=> Department.create({ name: 'hr'}))
    .then( department => hr = department)
    .then( () => UserDepartment.create( { userId: prof.id, departmentId: engineering.id} ))
    .then( () => UserDepartment.create( { userId: mitch.id, departmentId: hr.id} ))
    .then( () => UserDepartment.create( { userId: mitch.id, departmentId: engineering.id} ));
};

module.exports = {
  seed,
  sync,
  models: {
    User,
    Department,
    UserDepartment
  }
};
