import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import passport  from 'passport';
import cors  from 'cors';
import session  from 'express-session';
import https from 'https';
import UserApp from './src/containers/user/UserApp';
import CheckoutApp from './src/containers/checkout/CheckoutApp';
import App from './src/containers/App';
import {Provider} from "react-redux";
import store from "./src/store"; 
import { StaticRouter } from "react-router";
import { appendUniversalPortals } from "react-portal-universal/lib/server";
import FacebookStrategy from 'passport-facebook';
import compression from 'compression';
import methodOverride from 'method-override';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy,
db = require(path.resolve(__dirname+'/private/app/db/config/config.js')),
app = express(),
User = db.user,
secretKey='943rjkhsOA)JAQ@#';

var fbOpts={
  clientID: '1000175700179103',
  clientSecret: 'a9a5309580a601253cd18a4d23bfdf26',
  callbackURL: "https://localhost:48452/auth/facebook/callback",
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'emails','first_name', 'last_name']
};
var googleOpts={
    clientID:"309759265514-0eq8pofu7m5066l0bhbctsf1fc5j0t6q.apps.googleusercontent.com",
    clientSecret:"-K862ptYDMCBVqjY9lW7n406",
    callbackURL: "/auth/google/callback",
    passReqToCallback : true
};
var googleCallback=function(request, accessToken, refreshToken, profile, done) {
  console.log('profile GoogleStrategy');
  var email=profile.email;
  console.log(profile);
  if(email!==''||email!==undefined){
    var dateTime = new Date();
    User.findOne({ where: {email} }).then(user => {
      if(user){
        User.update({
          last_login: dateTime,
          provider:'google'
        }, 
        { where: {email:email}}).then(userUpdated => {		
          // Send created customer to client
          console.log('userUpdated');
          console.log(userUpdated);
        }); 
      }
      else{
        User.create({  
          username: profile.displayName,
          firstname:profile.name.givenName,
          lastname:profile.name.familyName,
          provider:'google',
          id_user:profile.id,
          email:email,
          created_at:dateTime,
          updated_at:dateTime
        }).then(userCreated => {		
          console.log('userCreated');  
          console.log(userCreated);
        }); 
      }
    });
  }
  done(null, profile);
};
var fbCallback=function(accessToken, refreshToken, profile, done) {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile',profile);
  var email=profile.emails[0].value;
  console.log('profile.emails[0].value '+email);
  if(email!==''||email!==undefined){
    var dateTime = new Date();
    User.findOne({ where: {email} }).then(user => {
      if(user){
        User.update({
          provider:'facebook',
          last_login: dateTime
        }, 
        { where: {email:email}}).then(userUpdated => {		
          // Send created customer to client
          console.log('userUpdated');
          console.log(userUpdated);
        }); 
      }
      else{
        User.create({  
          username: profile._json.name,
          firstname:profile._json.firstname,
          lastname:profile._json.last_name,
          provider:'facebook',
          id_user:profile.id,
          email:email,
          created_at:dateTime,
          updated_at:dateTime
        }).then(userCreated => {		
          console.log('userCreated');  
          console.log(userCreated);
        }); 
      }
    })
  } 
  done(null, profile);
};
var models = require(path.resolve(__dirname+"/private/app/db/config/config.js"));
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
      return next();
  }
  else{
      res.redirect('/');
  }
}
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// For Passport
app.use(session({
  secret: secretKey,
  resave: true,
  saveUninitialized: true,
  maxAge: Date.now() + (30 * 86400 * 1000)
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy(fbOpts,fbCallback)); 
passport.use(new GoogleStrategy(googleOpts,googleCallback));
app.get('/auth/google/callback',
  passport.authenticate('google', { 
    scope:[ 'profile','https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'],
    successRedirect: '/user',
    failureRedirect: '/'
  }
));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect: '/user',
    failureRedirect: '/',scope: ["email"] }
));
app.use(compression());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  res.send('An error occurs: '+err);
});
app.set('view engine', '.html');
app.get(['/','/desserts','/drinks','/main-courses','/appetizers'],function (req, res) {
    var context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <Provider store={store}>
            <App /> 
          </Provider>
        </StaticRouter>
    );
    const indexFile = path.resolve(__dirname+'/build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
        var tempData=data;
        tempData.replace('<article id="menu-container"></article> ', `<article id="menu-container">${app}</article>`)
        const markup   = appendUniversalPortals(tempData);
        return res.send(markup);
    });
});
app.get(['/user/profile','/user','/user/history',
'/user/history/invoice/:order_code','/user/history/invoice/'],isLoggedIn, function (req, res) {
  var context = {};
  const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <UserApp /> 
        </Provider>
      </StaticRouter>
  );
  const indexFile = path.resolve(__dirname+'/build/user.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
      var tempData=data;
      tempData.replace('<section id="user"></section> ', `<section id="user">${app}</section>`)
      const markup   = appendUniversalPortals(tempData);
      return res.send(markup);
  });
});
app.get(['/checkout','/checkout/payment','/payment-successfully'],isLoggedIn, function (req, res) {
  var context = {};
  const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <CheckoutApp /> 
        </Provider>
      </StaticRouter>
  );
  const indexFile = path.resolve(__dirname+'/build/checkout.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }
      var tempData=data;
      tempData.replace('<section id="checkout"></section> ', `<section id="checkout">${app}</section>`)
      tempData.replace('<script type="text/javascript" src="app.js"></script>','')
      tempData.replace('<script type="text/javascript" src="user.js"></script>','')
      const markup   = appendUniversalPortals(tempData);
      return res.send(markup);
  });
});
app.get('/api/validate/authentication',function(req,res){
  if (req.isAuthenticated()){
    res.json({isAuthenticated:true});
  }
  else{
    res.json({isAuthenticated:false});
  }
});
app.get(['/main.css','/css/main.css'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/public/css/main.css'))
})
app.get(['/css/main.css.map','/main.css.map'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/public/css/main.css.map'))
})
app.get(['/app.js','/user/profile/app.js','/user/history/app.js','/user/app.js'],function(req,res){
    res.sendFile(path.resolve(__dirname+'/build/app.js'))
})
app.get(['/user.js','/user/profile/user.js','/user/history/user.js','/user/user.js'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/build/user.js'))
})
app.get(['/checkout.js','/user/profile/checkout.js','/checkout/payment/checkout.js',
'/checkout/checkout.js','/payment-successfully/checkout.js',
'/user/history/checkout.js','/user/checkout.js'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/build/checkout.js'))
})
app.use(['/fonts/','/user/profile/fonts/'],express.static(path.resolve(__dirname+'/public/fonts/')));
app.use(['/img/','/user/profile/img/'],express.static(path.resolve(__dirname+'/public/images/')));
app.use(['/images/','/user/profile/images/'],express.static(path.resolve(__dirname+'/public/images/')));
app.use(['/','/user/profile/'],express.static(path.resolve(__dirname+'/build/')));
app.use(['/js/','/user/profile/js/','/user/js/','/user/history/js/'],express.static(path.resolve(__dirname+'/public/js/')));

const httpsOptions = {
  key: fs.readFileSync('/Users/leo/Documents/chinuch-restaurant/private/security/server.key'),
  cert: fs.readFileSync('/Users/leo/Documents/chinuch-restaurant/private/security/server.crt')
}
require(path.resolve(__dirname+'/private/app/route/public.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/private.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/dish.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/user.route.js'))(app,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/drink.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/ingredient.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/invoice.route.js'))(app,path,isLoggedIn);
//load passport strategies
require(path.resolve(__dirname+'/private/app/db/config/passport/passport.js'))(passport, models.user);
require(path.resolve(__dirname+'/private/app/route/auth.route.js'))(app,passport,path,User,jwt); 

app.get('/logout',function(req,res){
  req.session.destroy();
  req.logout();
  res.redirect('/');
})
//Sync Database
models.sequelize.sync().then(function() {
  console.log('https://localhost:48452 works')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});
https.createServer(httpsOptions,app, (req, res) => {
  res.set({
    'Access-Control-Allow-Credentials': true,
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Content-Type-Options':'nosniff',
    'Vary':'Origin, Accept-Encoding',
    'Pragma':'no-cache',
    'Expires':-1
  })
  res.writeHead(200); 
  console.log('https://localhost:48452 !');
}).listen(48452);
