
const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const fs = require('fs');
const passport = require('passport');

const privateKey = fs.readFileSync(`${__dirname}/../certs/private.key`);
const publicKey = fs.readFileSync(`${__dirname}/../certs/public.pub`);

// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: privateKey,
}, (jwt_payload, done) => {
  const {
    sub
  } = jwt_payload;
  // db call with user id,
  if (sub === '123') {
    done(null, {
      id: '123',
      email: 'andrea.beggiato@h-is.com',
      password: 'password',
    }); // obj from database
  }
  else {
    done(null, false);
  }
}));