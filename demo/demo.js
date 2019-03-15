(function() {

  var AMOUNT_OF_SHAPES = 50;
  var SHAPE_TYPES = ['square', 'triangle', 'circle'];

  // init demo shapes
  var el;
  Array.from({length: AMOUNT_OF_SHAPES}).forEach(function(el) {
    el = document.createElement('div');
    el.classList.add('shape');
    el.classList.add(SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]);
    var buffer = 40;
    el.style.top =  (buffer + Math.random() * (window.innerHeight - buffer * 2)) + 'px';
    el.style.left = (buffer + Math.random() * (window.innerWidth - buffer * 2)) + 'px';
    document.body.appendChild(el);
  });

  // init webdingies
  new WebDingies({
    el: '.shape', //selector || default: [data-wd-speed]
    // .2-.5 vs. .2,.5 vs. .2
    speed:  [.2, .5], // px specified as an array or num to be inserted in wildcard * slots
    overrideSpeed: false, //override the hardcoded attribute of speed and reassign
    overrideAngle: false, //override the hardcoded attribute of angle and reassign
    angle: [0, 360], // angle offset from mouse, array or num to be inserted in wildcard * slots
  });
  
})();
