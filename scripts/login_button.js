var App = App || {};

App.endpoints = App.endpoints || {
// This week's aniversary
  anniversary: "http://stageanalytics.int.yammer.com/queries/33/query_executions/638.json?refresh=true",

// All Yammer staging's active users joined thread
  joined: "http://stageanalytics.int.yammer.com/queries/33/executions/1640.json",

// Network champions on MSFT
  msft_champions: "http://analytics.int.yammer.com/queries/535/executions/56834.json",

// Network champions on yammer staging
  staging_champions: "http://stageanalytics.int.yammer.com/queries/53/executions/1646.json",

// Thread stats
  thread: function(thread_id) {
    return("https://www.staging.yammer.com/api/v1/threads/" + thread_id + ".json");
// web_url: https://www.staging.yammer.com/yammer-inc.com#/Threads/show?threadId=[:thread_id]
  },

// User profile
  user: function(user_id) {
    return("https://www.staging.yammer.com/api/v1/users/" + user_id + ".json");
  },

// Current user
  current_user: "https://www.staging.yammer.com/api/v1/users/current.json"
};

yam.config({ appId: "TvYDhcTzTPco3DYkDFtDVw" });

yam.connect.loginButton('#yammer-login', function (resp) {
  if(resp.authResponse) {
    // fix for Chrome, when initial authentication failed
    if(resp.user === undefined) {
      console.log("Authentication failed!")
      window.location.href = "/";
    } else{
      // Authentication passed. Update template and fire events.
      App.user = { full_name: resp.user.full_name,
        user_id: resp.user.url.match(/\d+$/)[0],
        web_url: resp.user.web_url
      };

      $("#yammer-login").html("");

      var source = $("#greeting").html();
      var template = Handlebars.compile(source);
      var result = template(App.user);
      $("#top-info").html(result);

      $('#paper-storyboard').append('\
        <script type="text/javascript text/paperscript" src="scripts/storyboard.js" canvas="storyboard"></script>\
        <canvas id="storyboard" resize></canvas>');
    }
  }
});
