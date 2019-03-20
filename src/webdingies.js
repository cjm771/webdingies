/*!
* webdingiesjs.js v0.500 
* https://github.com/cjm771/webdingies
*
* Copyright 2019, Chris Malcolm
* http://chris-malcolm.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
*
*
*  A library for dom transforms based on  mouse movements
*
*/

'use strict';

var WebDingies = {};

(function(){

  var $els;
  var COMPUTED_SUFFIX = 'comp';
  var SPEED_ATTR = 'data-wd-speed';
  var ANGLE_ATTR = 'data-wd-angle';

  WebDingies = function(opts) {
  
    this.onMouseMove = this.onMouseMove.bind(this);
    this.init(opts);
  
  };
  
  WebDingies.prototype.vecUtils = {
    magnitude: function(vec) {
      var magnitude = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
      return magnitude;
    },
    nearest: function(num, nearest) {
      return Math.ceil(num / nearest) * nearest;
    },
    rotateVec: function(vec, angle) {
      var theta = this.toRad(angle);
      var cs = Math.cos(theta);
      var sn = Math.sin(theta);
  
      var px = vec[0] * cs - vec[1] * sn;
      var py = vec[0] * sn + vec[1] * cs;
      return [px, py]
    },
    toRad: function(deg) {
      return deg/(180/Math.PI)
    },
    toDegrees: function(rad) {
      return rad*(180/Math.PI)
    },
    translateObject: function($el, currVec, speedAtt, angleAtt) {
      // calc transform
      var newAngle = this.vecAngle(currVec) + parseInt($el.getAttribute(angleAtt));
      var newVec = this.rotateVec(currVec, newAngle);
      var speed = $el.getAttribute(speedAtt);
      var transString = 'translate3d(' + Math.round(newVec[0]) * parseFloat(speed) + 'px,' + Math.round(newVec[1]) * parseFloat(speed) + 'px,0px)';
      // apply transformation
      $el.style.webkitTransform = transString;
      $el.style.transform = transString;
    },
    vecAngle: function(b) {
      var a = [0,1];
      return this.toDegrees(Math.atan2(b[1] - a[1],b[0] - a[0]));
    },
    getMousePos: function(e) {
      return [e.clientX, e.clientY];
    },
    normalize: function(vec, amp) {
      var amp = amp || 1;
      var magnitude = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
      var newVec =  [vec[0]/magnitude, vec[1]/magnitude];
  
      return this.amplitude(newVec, amp);
    },
      vector2Pt: function(pt1, pt2) {
      return [pt2[0]-pt1[0], pt2[1]-pt1[1]];
    }
  };
  
  //init 
  WebDingies.prototype.init = function(opts) {

    this.opts = {
      el: opts.el || '[' + ANGLE_ATTR + ']|[' + SPEED_ATTR + ']',
      speed:  opts.speed || '.2, .5, .8 -> 1.0', // px specified as an array or num to be inserted in wildcard * slots
      angle:  opts.angle || '0 -> 360', // angle offset from mouse, array or num to be inserted in wildcard * slots
      overrideSpeed: opts.overrideSpeed || false, //override the hardcoded attribute of speed and reassign
      overrideAngle: opts.overrideAngle || false, //override the hardcoded attribute of angle and reassign
    };

    this.destroyEventTracking();
    $els = document.querySelectorAll(this.opts.el);
    this.calculateComputedDataAttributes();
    this.addEventTracking();
  };

  // calculate computed data attribute name
  WebDingies.prototype.getComputedDataAttName = function(attKey) {
    var attDic = {
      'angle': ANGLE_ATTR,
      'speed': SPEED_ATTR
    };
    return attDic[attKey] + '-' + COMPUTED_SUFFIX;
  };

  // set computed data attribute based on defaults/element set attributes
  WebDingies.prototype.calculateComputedDataAttributes = function() {
    var atts = [
      [ANGLE_ATTR,  'angle', 'overrideAngle'], 
      [SPEED_ATTR,  'speed', 'overrideSpeed']
    ];
    var attName, defaultMetric, overrideMetric, computedDataAttName, parsedValue;
    // iterate through each el 
    $els.forEach((function($el) {
      atts.forEach((function(arr) {
        attName = arr[0];
        console.log(arr[0], attName);
        computedDataAttName = this.getComputedDataAttName(arr[1]);
        defaultMetric = this.opts[arr[1]];
        overrideMetric = this.opts[arr[2]];
        if ($el.getAttribute(attName) && !overrideMetric) {
          // does it have a angle attt and is not overridden?
          parsedValue = this.parseAttribute($el.getAttribute(attName));
        } else {
          // else use default
          parsedValue = this.parseAttribute(defaultMetric || 0);
        }
        $el.setAttribute(computedDataAttName, parsedValue);
      }).bind(this));
    }).bind(this));
  };

  WebDingies.prototype.parseAttribute = function(arr) {
    var RANGE_INDICATOR = '->';
    var finalNum = 0;
    // if not array split by commas
    if (!Array.isArray(arr)) {
      if (typeof arr !== 'string') {
        throw 'Attribute must be string or array. Unknown type (' + (typeof arr) + ') provided.';
      }
      arr = arr.split(',');
    }
    // randomly select one of em
    var choice = arr[Math.floor(arr.length * Math.random())];
    // if its got the arrow
    if (choice.indexOf(RANGE_INDICATOR) !== -1 ) {
      var range = choice.split(RANGE_INDICATOR).map(function(item) {
        return parseFloat(item);
      }).filter(function(num) {
        return !isNaN(num);
      });
      if (range.length < 2) {
        throw 'Rand range error. To use the range operator, you must supply 2 numbers with a rand range indicator (' + RANGE_INDICATOR + ') in between.';
      }
      finalNum = range[0] + Math.random() * (range[1] - range[0]);
    } else {
      finalNum = parseFloat(choice) || 0;
    }
    return finalNum;
  };

  WebDingies.prototype.onMouseMove = function(e) {
    var centerPoint =  [0,0];
    var vec = this.vecUtils.vector2Pt( centerPoint, this.vecUtils.getMousePos(e));
    // console.log("centerpoint:", centerPoint, "mouse:", this.vecUtils.getMousePos(e), "vector:", vec, "angle:", this.vecUtils.vecAngle(vec), "magnitude:", this.vecUtils.magnitude(vec));
    
    if ($els) {
      $els.forEach((function($el) {
        this.vecUtils.translateObject($el, vec, this.getComputedDataAttName('speed'), this.getComputedDataAttName('angle'));
      }).bind(this));
    }
  };
  
  // add mouse events
  WebDingies.prototype.addEventTracking = function() {
    document.addEventListener('mousemove', this.onMouseMove, true);
  };
  
  // destroy mouse events
  WebDingies.prototype.destroyEventTracking = function() {
    document.removeEventListener('mousemove', this.onMouseMove, true);
  };
  
  // update
  // WebDingies.prototype.update = function(options) {

  // };
  
  
})();
