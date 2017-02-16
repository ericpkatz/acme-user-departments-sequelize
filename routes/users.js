const app = require('express').Router();
const models = require('../db').models;
const UserDepartment = models.UserDepartment;
const User = models.User;

app.post('/', (req, res, next)=> {
  User.create({ name: req.body.name })
    .then( ()=> res.redirect('/'))
    .catch(next);
});

app.delete('/:id', (req, res, next)=> {
  UserDepartment.destroy({ where: { userId: req.params.id}})
    .then( ()=> User.destroy({ where: { id: req.params.id }}))
    .then( ()=> res.redirect('/'))
    .catch(next);
});

app.delete('/:userId/user_departments/:id', (req, res, next)=> {
  UserDepartment.destroy({ where: { id: req.params.id } })
    .then(()=> res.redirect('/'))
    .catch(next);
});

app.post('/:userId/user_departments', (req, res, next)=> {
  UserDepartment.create({ userId: req.params.userId, departmentId: req.body.departmentId })
    .then(()=> res.redirect('/'))
    .catch(next);
});

module.exports = app;
