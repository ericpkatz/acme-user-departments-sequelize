const express = require('express');
const swig = require('swig');
const path = require('path');

swig.setDefaults({ cache: false });

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

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
  Promise.all([ User.findAll({ order: 'name', include: [ UserDepartment ]}), Department.findAll()])
    .then( result => res.render('index', { users: result[0], departments: result[1] }))
    .catch(next);
});

app.use('/departments', require('./routes/departments'));

app.use('/users', require('./routes/users'));

db.seed()
  .then(()=> console.log('synched'))
  .catch( e => console.log(e));
