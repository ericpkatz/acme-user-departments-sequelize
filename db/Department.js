const db = require('./db');

const Department = db.define('department', {
  name: db.Sequelize.STRING
});

module.exports = Department;
