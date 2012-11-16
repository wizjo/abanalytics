yam.connect.loginButton('#yammer-login', function (resp) {
  if(resp.authResponse) {
    document.getElementById('yammer-login').innerHTML = 'Welcome to Yammer, ' + resp.user.full_name + "!";
  }
});

