var App = App || {};
App.neon_palette = [ "#FF0000", "#44FF00", "#F8740A", "#0070FF", "#D044FF", "#EE1A78", "#8150D0", "#0BD878" ];

// use REAL endpoint when it's ready ready
//$.getJSON(App.endpoints.staging_champions, function(resp) {
$.getJSON("data/staging_champions.json", function(resp) {

  App.data = App.data || {};
  App.data.champions = resp;

  // figure out the scale of things
  var influence_min = 100, influence_max = 0,
      followers_min = 100, followers_max = 0,
      messages_min = 100, messages_max = 0;

  resp.results.forEach(function(d, i) {
    current_influence = Math.round(parseFloat(d.influence) * 100) / 100;
    current_followers = parseInt(d["# of followers"]);
    current_messages = parseInt(d["# of public msg"]);
    influence_min = influence_min < current_influence ? influence_min : current_influence;
    influence_max = influence_max > current_influence ? influence_max : current_influence;
    followers_min = followers_min < current_followers ? followers_min : current_followers;
    followers_max = followers_max > current_followers ? followers_max : current_followers;
    messages_min = messages_min < current_messages ? messages_min : current_messages;
    messages_max = messages_max > current_messages ? messages_max : current_messages;
  });

  var linearScale = function(r, imin, imax, omin, omax){
    var scaled = omin + (r-imin) / (imax-imin) * (omax - omin);
    return scaled;
  }

  // Drawing something
  var layer = project.activeLayer,
      group = new Group();

  resp.results.slice(0, 10).forEach(function(d, i) {
    var circle = new Path.Circle(new Point(100, 50 + i*65), 
      linearScale(parseInt(d["# of followers"]), followers_min, followers_max, 5, 25)
    );
    circle.style = {
      fillColor: App.neon_palette[i % App.neon_palette.length]
    };
    circle.opacity = 0.8;
    circle.influence = Math.round(parseFloat(d.influence) * 100) / 100;
    circle.bound = linearScale(circle.influence, influence_min, influence_max, 100, view.size.width - 400);
    group.addChild(circle);

    var text = new PointText(new Point(5, 25 + i*65));
    text.paragraphStyle.justification = 'left';
    text.characterStyle.fontSize = 20;
    text.fillColor = App.neon_palette[i % App.neon_palette.length];
    text.content = d.full_name;

    var label = new PointText(new Point(400, 25 + i*65));
    label.paragraphStyle.justification = 'left';
    label.characterStyle.fontSize = 16;
    label.fillColor = '#555';
    label.content = "influence - " + Math.round(parseFloat(d.influence) * 100) / 100 + " | " + 
      "followerss - " + d["# of followers"] + " | " + 
      "messages - " + d["# of public msg"];
  });

  App.circlesGroup = group;

});

function onResize(event) {
  //path.position = view.center;
}

function onFrame(event) {
  App.circlesGroup.children.forEach(function(d, i) {
    var destination = new Point(d.bound, d.position.y);

    var vector = destination - d.position;
    d.position += vector / 30;
  });
}
