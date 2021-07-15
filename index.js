const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const app = express();

require('./initializers/passport');

const privateKey = fs.readFileSync(`${__dirname}/certs/private.key`);
const publicKey = fs.readFileSync(`${__dirname}/certs/public.pub`);

app.use(express.json());
app.use(passport.initialize());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'andrea.beggiato@h-is.com' && password === 'password') {
    const token = jwt.sign({
      sub: '1234',
      email: 'andrea.beggiato@h-is.com',
    }, privateKey);
    res.send({
      token
    });
  }
  else {
    res.send(404);
  }
});

app.get('/private', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  console.log(req.isAuthenticated());
  res.send({
    hello: 'world',
  });
})

app.listen(4000, () => console.log('started'));