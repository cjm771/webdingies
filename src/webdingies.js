 /*
 * webdingiesjs.js v0.500 
 * http://webdingiesjs.chris-malcolm.com
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



var WebDingies = function() {

  var vecUtils = {
    magnitude: function(vec){
      var magnitude = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
      return magnitude;
    },
    nearest: function(num, nearest){
      return Math.ceil(num / nearest) * nearest;
    },
    rotateVec: function(vec, angle){
      var theta = vecUtils.toRad(angle);
      var cs = Math.cos(theta);
      var sn = Math.sin(theta);

      var px = vec[0] * cs - vec[1] * sn;
      var py = vec[0] * sn + vec[1] * cs;
      return [px, py]
    },
    toRad: function(deg){
      return deg/(180/Math.PI)
    },
    toDegrees: function(rad){
      return rad*(180/Math.PI)
    },
    translateObject: function(el, currVec){
      // measure angle + new angle
      var newAngle = vecUtils.vecAngle(currVec)+parseInt($(el).attr('data-angle'));
      var newVec = vecUtils.rotateVec(currVec, newAngle);
      var speed = $(el).attr('data-speed');
      $(el).css({
        '-webkit-transform': transString,
        'transform': transString
        
      });
      //rotate vector
      //apply transformation with new amplitude
    },
    vecAngle: function(b){
      var a = [0,1];
      return this.toDegrees(Math.atan2(b[1] - a[1],b[0] - a[0]));
    },
    getMousePos: function(e){
      return [e.clientX, e.clientY];
    },
    normalize: function(vec, amp){
      var amp = amp || 1
      var magnitude = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
      var newVec =  [vec[0]/magnitude, vec[1]/magnitude];

      return this.amplitude(newVec, amp);
    },
      vector2Pt: function(pt1, pt2){
      return [pt2[0]-pt1[0], pt2[1]-pt1[1]];
    }
  }
  //init 
  this.init = function(options) {

  };
  
  // update
  this.update = function(options) {

  };
};
