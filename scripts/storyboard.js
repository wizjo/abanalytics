$.getJSON(App.endpoints.current, function(resp) {
  //console.log(resp);
  App.data = App.data || {};
  App.data.champions = resp;

  var circle = new Path.Circle(new Point(80, 50), 35);
  circle.fillColor = 'red';

  var circle2 = new Path.Circle(new Point(120, 50), 35);
  circle2.style = {
      fillColor: 'blue',
      strokeColor: 'green',
      strokeWidth: 10
  };

  // Make circle2 50% transparent:
  circle2.opacity = 0.5;
  // Create a centered text item at the center of the view:
  var text = new PointText(view.center);
  text.paragraphStyle.justification = 'center';
  text.characterStyle.fontSize = 20;
  text.fillColor = 'white';

  function onResize(event) {
    // Whenever the window is resized, recenter the path:
    path.position = view.center;
  }
});
