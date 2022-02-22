const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let user = {
 name:'',
 lastname: ''
};
let response = {
 error: false,
 code: 200,
 message: ''
};
app.get('/', function(req, res) {
 response = {
  error: true,
  code: 200,
  message: 'home'
 };
 res.send(response);
});
app.get('/user', function (req, res) {
 response = {
  error: false,
  code: 200,
  message: ''
 };
 if(user.name === '' || user.lastname === '') {
  response = {
   error: true,
   code: 501,
   message: 'The user has not been created'
  };
 } else {
  response = {
   error: false,
   code: 200,
   message: 'user response',
   response: user
  };
 }
 res.send(response);
});
app.post('/user', function (req, res) {
 if(!req.body.name || !req.body.lastname) {
  response = {
   error: true,
   code: 502,
   message: 'The field name and surname are required'
  };
 } else {
  if(user.name !== '' || user.lastname !== '') {
   response = {
    error: true,
    code: 503,
    message: 'The user was already created previously'
   };
  } else {
   user = {
    name: req.body.name,
    lastname: req.body.lastname
   };
   response = {
    error: false,
    code: 200,
    message: 'user created',
    response: user
   };
  }
 }
 
 res.send(response);
});
app.put('/user', function (req, res) {
 if(!req.body.name || !req.body.lastname) {
  response = {
   error: true,
   code: 502,
   message: 'The field name and surname are required'
  };
 } else {
  if(user.name === '' || user.lastname === '') {
   response = {
    error: true,
    code: 501,
    message: 'Error bad user data'
   };
  } else {
   user = {
    name: req.body.name,
    lastname: req.body.lastname
   };
   response = {
    error: false,
    code: 200,
    message: 'user updated',
    response: user
   };
  }
 }
 
 res.send(response);
});

app.delete('/user', function (req, res) {
 if(user.name === '' || user.lastname === '') {
  response = {
   error: true,
   code: 501,
   message: 'The user has not been created'
  };
 } else {
  response = {
   error: false,
   code: 200,
   message: 'user deleteD'
  };
  user = { 
   name: '', 
   lastname: '' 
  };
 }
 res.send(response);
});

app.use(function(req, res, next) {
 response = {
  error: true, 
  code: 404, 
  message: 'URL not found'
 };
 res.status(404).send(response);
});

app.listen(3000, () => {
 console.log("server listening on localhost port 3000");
});