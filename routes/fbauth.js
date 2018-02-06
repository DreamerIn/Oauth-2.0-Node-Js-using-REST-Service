'use strict';

const request = require('request');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const oauth2Module = require('simple-oauth2');
const fbkeys = require('../config/fbkeys');
const tokenConfig = {};
var bValue = false;

const oauth2Facebook  = oauth2Module.create({
  client: {
    id: fbkeys.facebook.clientID,
    secret: fbkeys.facebook.clientSecret,
  },
  auth: {
    tokenHost: fbkeys.facebookauth.tokenHost,
    tokenPath: fbkeys.facebookauth.tokenPath,
    authorizePath: fbkeys.facebookauth.authorizePath,
  },
});

// Authorization uri definition for google sign in
const authorizationUriFbook = oauth2Facebook.authorizationCode.authorizeURL({
  redirect_uri: fbkeys.facebookauthUri.redirect_uri,
  scope: fbkeys.facebookauthUri.scope,
  state: fbkeys.facebookauthUri.state,
});

// Initial page redirecting to google
router.get('/facebooklogin', (req, res) => {
  res.redirect(authorizationUriFbook);
});

//callback recived from the facebook
router.get('/facebook/callback', (req, res) => {
  const code = req.query.code; //autherization code recieved
  const tokenConfig  = {//token configue to get the access token
    content_type: 'application/x-www-form-urlencoded',
    code,
    client_id: fbkeys.facebook.id,
    client_secret: fbkeys.facebook.secret,
    redirect_uri: fbkeys.facebook.redirect_uri,
  };

//to get the access token from the google
  oauth2Facebook.authorizationCode.getToken(tokenConfig, (error, result) => {
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
       res.write("<html><h1>Facebook Access Token Response</h1><br><br><br><br><p>access_token: " + result.access_token + "</p><br><br><p>expires_in: " + result.expires_in +"</p><br><br><p>token_type: " + result.token_type +"</p>");
       res.write("<br><br><p>refresh_token: " + result.refresh_token + "</p><br><br>");
       return;
    });
});

module.exports = router;
