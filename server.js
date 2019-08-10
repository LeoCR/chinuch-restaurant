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
import App from './src/containers/App';
import {Provider} from "react-redux";
import store from "./src/store"; 
import { StaticRouter } from "react-router";


let app= express();
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
      return next();
  }
  else{
      res.redirect('/');
  }
}
var models = require(path.resolve(__dirname+"/private/app/db/config/config.js"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// For Passport
app.use(session({
  secret: 'dshf48438975',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(['/','/desserts','/drinks','/main-courses'], function (req, res) {
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
        return res.send(tempData);
    });
});
app.get('/validate/authentication',function(req,res){
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
app.get('/app.js',function(req,res){
    res.sendFile(path.resolve(__dirname+'/build/app.js'))
})
app.use(['/fonts/','/services/web-development/fonts/'],express.static(path.resolve(__dirname+'/public/fonts/')));
app.use(['/img/','/services/web-development/img/'],express.static(path.resolve(__dirname+'/public/images/')));
app.use(['/images/'],express.static(path.resolve(__dirname+'/public/images/')));
app.use(['/'],express.static(path.resolve(__dirname+'/build')));
app.use(['/js/','/services/'],express.static(path.resolve(__dirname+'/public/js/')));

const httpsOptions = {
  key: fs.readFileSync('/Users/leo/Documents/chinuch-restaurant/private/security/server.key'),
  cert: fs.readFileSync('/Users/leo/Documents/chinuch-restaurant/private/security/server.crt')
}
require(path.resolve(__dirname+'/private/app/route/user.route.js'))(app,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/drink.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/dish.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/public.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/private.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/ingredient.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/auth.route.js'))(app,passport,path);
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
