const db = require('./db');

const User = db.define('user', {
  name: db.Sequelize.STRING
}, {
  instanceMethods: {
    hasDepartment: function(department){
      if(!this.user_departments)
        throw('user_departments not populated');
      return this.getUserDepartment(department) !== null;
    },
    getUserDepartment: function(department){
      if(!this.user_departments)
        throw('user_departments not populated');
      const userDepartments = this.user_departments.filter(userDepartment=> userDepartment.departmentId === department.id);
      return userDepartments.length ? userDepartments[0] : null;
    }
  }
});

module.exports = User;

