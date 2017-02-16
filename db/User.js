const db = require('./db');

const User = db.define('user', {
  name: db.Sequelize.STRING
}, {
  instanceMethods: {
    hasAllDepartments: function(departments){
      if(!this.user_departments)
        throw('user_departments not populated');
      return departments.length === this.user_departments.length;
    },
    hasNoDepartments: function(){
      if(!this.user_departments)
        throw('user_departments not populated');
      return this.user_departments.length === 0;

    },
    hasDepartment: function(department){
      if(!this.user_departments)
        throw('user_departments not populated');
      return this.getUserDepartment(department) !== null;
    },
    getUserDepartment: function(department){
      if(!this.user_departments)
        throw('user_departments not populated');
      const userDepartments = this.user_departments.filter(userDepartment=> userDepartment.departmentId === department.id);
      return userDepartments.length ? userDepartments[0].id : null;
    }
  }
});

module.exports = User;

