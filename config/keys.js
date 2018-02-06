module.exports = {
  google: {
    clientID: '',
    clientSecret: '',
  },
  googleauth :{
    tokenHost : 'https://accounts.google.com',
    tokenPath: '/o/oauth2/token',
    authorizePath: '/o/oauth2/auth'
  },

  googleauthUri : {
    redirect_uri: 'http://localhost:3001/auth/callback',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    state: '3(#0/!~'
  }
};
