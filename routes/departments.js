const app = require('express').Router();
const models = require('../db').models;
const Department = models.Department;
const UserDepartment = models.UserDepartment;

app.post('/', (req, res, next)=> {
  Department.create({ name: req.body.name })
    .then( ()=> res.redirect('/'))
    .catch(next);
});

app.delete('/:id', (req, res, next)=> {
  UserDepartment.destroy({ where: { departmentId: req.params.id}})
    .then( ()=> Department.destroy({ where: { id: req.params.id }}))
    .then( ()=> res.redirect('/'))
    .catch(next);
});

module.exports = app;
