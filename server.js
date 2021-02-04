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
//import paypal from 'paypal-rest-sdk';
import cookieParser from 'cookie-parser';
import paypal from '@paypal/checkout-server-sdk';
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

/**
* @see https://github.com/paypal/Checkout-NodeJS-SDK
* @see https://developer.paypal.com/docs/api/orders/v2/
* @see https://developer.paypal.com/docs/api/reference/api-requests/#
*/
// Creating an environment
let clientId = "AT20D6Vyit9Nlal8G1lic-3t8cBO51TBfeQC3ZIWUlvbBcW9pealAB9ORvnLGI42eYf4qs03xr5eX9r3";
let clientSecret = "ELFcF3ADCUW6rmdSMC5JNIvUYwn8V9VYPHVqOy58V2ORWrqqbP1CKv2Kw1vX_NE2_br-7GyRHIShpRV5";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);
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
/* paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AT20D6Vyit9Nlal8G1lic-3t8cBO51TBfeQC3ZIWUlvbBcW9pealAB9ORvnLGI42eYf4qs03xr5eX9r3',
  'client_secret': 'ELFcF3ADCUW6rmdSMC5JNIvUYwn8V9VYPHVqOy58V2ORWrqqbP1CKv2Kw1vX_NE2_br-7GyRHIShpRV5'
}); */
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
    successRedirect: '/checkout',
    failureRedirect: '/'
  }
));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect: '/checkout',
    failureRedirect: '/',scope: ["email"] }
));
app.use(compression());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  res.send('An error occurs: '+err);
});
app.set('view engine', '.html');
app.get(['/','/desserts','/drinks','/main-courses','/appetizers','/appetizers/:id',
'/desserts/:id','/drinks/:id','/main-courses/:id'],function (req, res) {
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

app.post('/api/pay-with-paypal',async(req,res)=>{
  // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
  let request = new paypal.orders.OrdersCreateRequest();
  // Construct a request object and set desired parameters
  request.requestBody({
      "intent": "CAPTURE",
      "application_context": {
          "return_url": "https://localhost:48452/paypal/payment/success",
          "cancel_url": "https://localhost:48452/paypal/cancel",
          "brand_name": "React Redux Node-JS Restaurant",
          "locale": "en-US",
          "landing_page": "BILLING",
          "shipping_preference": "NO_SHIPPING",
          "user_action": "PAY_NOW"
      },
      "purchase_units": [
          {
              "reference_id": "ReactReduxRestaurant",
              "description": "Food of Restaurant",
              "custom_id": "Food",
              "soft_descriptor": "FoodOfRestaurant",
              "amount": {
                  "currency_code": "USD",
                  "value": req.body.subtotal,
                  "breakdown": {
                      "item_total": {
                          "currency_code": "USD",
                          "value": req.body.item_total
                      },
                      "shipping": {
                          "currency_code": "USD",
                          "value": "0"
                      },
                      "tax_total": {
                          "currency_code": "USD",
                          "value":req.body.tax_total
                      },
                      "shipping_discount": {
                          "currency_code": "USD",
                          "value": "0"
                      }
                  }
              },
              "items":req.body.items
          }
      ]
  });
  var TempData;
  // Call API with your client and get a response for your call
  try {
    let response = await client.execute(request);
    TempData={
      id:response.result.id,
      data:response.result.links[1]
    }; 
    return res.send(TempData)
  } catch (error) {
    return res.send(error);
  }
});
app.get('/paypal/payment/success',(req,res)=>{
    var payerId=req.query.PayerID,
    paypalToken=req.query.token;
    try { 
        let captureOrder =  async function(orderId) {
            var request = new paypal.orders.OrdersCaptureRequest(orderId);
            request.requestBody({});
            // Call API with your client and get a response for your call
            let response = await client.execute(request).then((res)=>{
              console.log(res); 
              return res;
            })
            .catch((e)=>{
              console.log("An error occurs");
              return e; 
            });
            return response;
        }
        if(req.cookies.paypal_id!==undefined&&payerId!==undefined&&paypalToken!==undefined){
            captureOrder(req.cookies.paypal_id);
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
                const markup   = appendUniversalPortals(tempData);
                return res.send(markup);
            });
        }
        else{
            return res.send('Sorry this page is unavailable')
        } 
    } catch (error) {
      return res.send(error);
    }   
});
app.get('/paypal/cancel',(req,res)=>{
  res.send('Cancelled')
}); 
app.get(['/main.css','/css/main.css'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/public/css/main.css'))
})
app.get(['/css/main.css.map','/main.css.map'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/public/css/main.css.map'))
})

app.use(['/fonts/','/user/profile/fonts/'],express.static(path.resolve(__dirname+'/public/fonts/')));
app.use(['/img/','/user/profile/img/'],express.static(path.resolve(__dirname+'/public/images/')));
app.use(['/images/','/user/profile/images/'],express.static(path.resolve(__dirname+'/public/images/')));
app.use(['/','/user/profile/'],express.static(path.resolve(__dirname+'/build/')));
app.use(['/js/','/user/profile/js/','/user/js/',
'/user/history/js/','/main-courses/js/'],express.static(path.resolve(__dirname+'/public/js/')));

app.get(['/app.js','/user/profile/app.js','/user/history/app.js',
'/user/app.js','/main-courses/js/app.js','/main-courses/app.js'],function(req,res){
    res.sendFile(path.resolve(__dirname+'/build/app.js'))
})
app.get(['/user.js','/user/profile/user.js','/user/history/user.js',
'/user/user.js','/main-courses/js/user.js','/main-courses/user.js'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/build/user.js'))
})
app.get(['/checkout.js','/user/profile/checkout.js','/checkout/payment/checkout.js',
'/checkout/checkout.js','/payment-successfully/checkout.js','/main-courses/checkout.js',
'/user/history/checkout.js','/user/checkout.js','/main-courses/js/checkout.js'],function(req,res){
  res.sendFile(path.resolve(__dirname+'/build/checkout.js'))
})

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname+'/private/security/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname+'/private/security/server.crt'))
}
require(path.resolve(__dirname+'/private/app/route/public.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/private.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/dish.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/user.route.js'))(app,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/drink.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/ingredient.route.js'))(app,path);
require(path.resolve(__dirname+'/private/app/route/invoice.route.js'))(app,path,isLoggedIn);
require(path.resolve(__dirname+'/private/app/route/reservation.route.js'))(app,path);
//load passport strategies
require(path.resolve(__dirname+'/private/app/db/config/passport/passport.js'))(passport, models.user);
require(path.resolve(__dirname+'/private/app/route/auth.route.js'))(app,passport,path); 

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
