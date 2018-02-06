module.exports = {
  facebook: {
  clientID: '',
  clientSecret: ''
},

facebookauth: {
  tokenHost : 'https://graph.facebook.com'  ,
  tokenPath: '/v2.12/oauth/access_token',
  authorizeHost:'https://www.facebook.com',
  authorizePath: '/v2.12/dialog//oauth/authorize'
},

facebookauthUri : {
  redirect_uri: 'http://localhost:3001/fbauth/facebook/callback',
  scope: 'https://graph.facebook.com/me',
  state: '3(#0/!~'
}
};
