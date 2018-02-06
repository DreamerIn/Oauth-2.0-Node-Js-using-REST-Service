'use strict';

const request = require('request');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const oauth2Module = require('simple-oauth2');
const keys = require('../config/keys');
const fbkeys = require('../config/fbkeys');
const tokenConfig = {};
var bValue = false;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//Oauth Google login Credentials
const oauth2Google  = oauth2Module.create({
  client: {
    id: keys.google.clientID,
    secret: keys.google.clientSecret,
  },
  auth: {
    tokenHost: keys.googleauth.tokenHost,
    tokenPath: keys.googleauth.tokenPath,
    authorizePath: keys.googleauth.authorizePath,
  },
});



// Authorization uri definition for google sign in
const authorizationUriGoogle = oauth2Google.authorizationCode.authorizeURL({
  redirect_uri: keys.googleauthUri.redirect_uri,
    scope: keys.googleauthUri.scope,
    state: keys.googleauthUri.state,
    access_type: "offline"
});


// Initial page redirecting to google
router.get('/googlelogin', (req, res) => {
  res.redirect(authorizationUriGoogle);
});


//callback recived from the google
router.get('/callback', (req, res) => {
  const token = '';
  const code = req.query.code; //autherization code recieved
  const tokenConfig  = {//token configue to get the access token
    content_type: 'application/x-www-form-urlencoded',
    code,
    client_id: keys.google.id,
    client_secret: keys.google.secret,
    redirect_uri: keys.googleauthUri.redirect_uri,
  };

//to get the access token from the google
  oauth2Google.authorizationCode.getToken(tokenConfig, (error, result) => {
      if (error) {
        console.error('Access Token Error', error.message);
        return res.json('Authentication failed');
      }
      var accessToken ={
        "access_token": result.access_token,
        "expires_in": result.expires_in,
        "id_token": result.id_token,
        "token_type": result.token_type,
        "refresh_token": result.refresh_token
      }
       res.write("<html><h1>Access Token Response</h1><br><br><br><br><p>access_token: " + result.access_token + "</p><br><br><p>expires_in: " + result.expires_in +"</p><br><br><p>token_type: " + result.token_type +"</p>");
       res.write("<br><br><p>refresh_token: " + result.refresh_token + "</p><br><br>");
       return;
    });
});


module.exports = router;
