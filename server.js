import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import App from './src/App';

let app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get(['/','/services/','/services/web-development'], function (req, res) {
    const app = ReactDOMServer.renderToString(<App />);
    const indexFile = path.resolve(__dirname+'/build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
        var tempData=data;
        tempData.replace('<div id="main_content"></div> ', `<div id="main_content">${app}</div>`)
        return res.send(tempData);
      });
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

app.listen(4852, function () {
    console.log('App listening on port 4852 http://localhost:4852 !')
});