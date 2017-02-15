const express = require('express');
const swig = require('swig');
swig.setDefaults({ cache: false });

const app = express();

app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded({ extended: false }));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

const db = require('./db'); 
const models = db.models;

const User = models.User; 

const Department = models.Department;

const UserDepartment = models.UserDepartment; 


app.get('/', (req, res, next)=> {
  const getStyle = (user, departments) => {
    if(user.user_departments.length == 0) return 'background-color: #ccc';
    if(user.user_departments.length === departments.length ) return 'background-color: #ffcc00';
  }
  Promise.all([ User.findAll({ order: 'name', include: [ UserDepartment ]}), Department.findAll()])
    .then( result => res.render('index', { users: result[0], departments: result[1], getStyle }))
    .catch(next);
});

app.post('/departments', (req, res, next)=> {
  Department.create({ name: req.body.name })
    .then( ()=> res.redirect('/'))
    .catch(next);
});

app.delete('/departments/:id', (req, res, next)=> {
  UserDepartment.destroy({ where: { departmentId: req.params.id}})
    .then( ()=> Department.destroy({ where: { id: req.params.id }}))
    .then( ()=> res.redirect('/'))
    .catch(next);
});

app.post('/users', (req, res, next)=> {
  User.create({ name: req.body.name })
    .then( ()=> res.redirect('/'))
    .catch(next);
});

app.delete('/users/:id', (req, res, next)=> {
  UserDepartment.destroy({ where: { userId: req.params.id}})
    .then( ()=> User.destroy({ where: { id: req.params.id }}))
    .then( ()=> res.redirect('/'))
    .catch(next);
});

app.delete('/users/:userId/user_departments/:id', (req, res, next)=> {
  UserDepartment.destroy({ where: { id: req.params.id } })
    .then(()=> res.redirect('/'))
    .catch(next);
});

app.post('/users/:userId/user_departments', (req, res, next)=> {
  UserDepartment.create({ userId: req.params.userId, departmentId: req.body.departmentId })
    .then(()=> res.redirect('/'))
    .catch(next);
});

db.seed()
  .then(()=> console.log('synched'))
  .catch( e => console.log(e));
