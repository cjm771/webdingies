(function() {
  
  var MODE = 'SVG';
  var SHAPE_TYPES = ['square', 'triangle', 'circle'];
  var COLOR_TYPES = ['red', 'blue', 'green', 'yellow'];
  var AMOUNT_OF_SHAPES = MODE === 'SVG' ? 15 : 10;
  
  // init demo shapes
  var el, elInner, svg;
  var availableSvgs = document.querySelectorAll('.random_svgs > svg');
  Array.from({length: AMOUNT_OF_SHAPES}).forEach(function(el) {
    el = document.createElement('div');
    el.classList.add('shape');
    
    if (MODE === 'SVG') {
      // svg mode
      elInner = document.createElement('div');
      elInner.classList.add('svg_wpr');
      svg = availableSvgs[Math.floor(Math.random() * availableSvgs.length)].cloneNode(true);
      svg.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg) scale(1.5)';
      svg.classList.add(COLOR_TYPES[Math.floor(Math.random() * COLOR_TYPES.length)]);
      elInner.appendChild(svg);
    } else {
      // shape mode
      elInner = document.createElement('div');
      elInner.classList.add(SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]);
    }
    var buffer = 40;
    el.appendChild(elInner);
    el.style.top =  (buffer + Math.random() * (window.innerHeight - buffer * 2)) + 'px';
    el.style.left = (buffer + Math.random() * (window.innerWidth - buffer * 2)) + 'px';
    el.setAttribute('data-wd-angle', '90');
    document.body.appendChild(el);
  });

  // init webdingies
  new WebDingies({
    el: '.shape', //selector || default: [data-wd-speed]
    // .2-0.5 vs. .2,.5 vs. .2
    speed:  '.025, 0.05, .01', // px specified as an array or num to be inserted in wildcard * slots
    angle: '0, 90, 180 -> 360', // angle offset from mouse, array or num to be inserted in wildcard * slots
    overrideSpeed: false, //override the hardcoded attribute of speed and reassign
    overrideAngle: true, //override the hardcoded attribute of angle and reassign
  });
  
})();
