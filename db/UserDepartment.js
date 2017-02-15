const db = require('./db');

const UserDepartment = db.define('user_department', {
  primary: db.Sequelize.BOOLEAN
});

module.exports = UserDepartment;
