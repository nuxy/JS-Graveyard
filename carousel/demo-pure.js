/**
 *  Carousel (Pure Javascript)
 *
 *  Copyright 2011-2012, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

window.onload = function() {
  var parent = document.getElementById('container');
  var nodes  = parent.getElementsByTagName('DIV');

  var active = null;
  var dist   = 20;
  var offset = 0;
  var shift  = 4.6;
  var speed  = 3;
  var ticks  = (speed * 0.001);
  var timer  = null;

  /**
   * Rotate left button event
   */
  document.getElementById('button1').onclick = function() {
    stop();
    ticks = (speed * 0.001) * +1;
    init();
    active = true;
  };

  /**
   * Stop button event
   */
  document.getElementById('button2').onclick = function() {
    stop();
  };

  /**
   * Rotate right button event
   */
  document.getElementById('button3').onclick = function() {
    stop();
    ticks = (speed * 0.001) * -1;
    init();
    active = true;
  };

  /**
   * Stop animations
   */
  function stop() {
    clearInterval(timer);
    ticks  = 0;
    active = null;
  }

  /**
   * Simulate object rotation on vertical-axis.
   */
  function init() {
    if (active) return;

    timer = setInterval(
      function() {

        // Process images in #container
        for (var i = 0; i < nodes.length; i++) {
          var angle = ((Math.PI * i * 2) / nodes.length) + offset;
          var depth = Math.round(Math.sin(angle - shift) * 100);
          var width = parent.offsetWidth * (50 - Math.sin(angle) * dist);
          var posX  = (width / 100) - (nodes[i].offsetWidth / 2);

          nodes[i].style.display = 'block';
          nodes[i].style.left    = posX + 'px';

          setOpacity(nodes[i], depth);
        }

        offset += ticks;
      }
    , 16.6666667);
  }

  init();

  /**
   * Change the object opacity
   */
  function setOpacity(obj, value) {
    if (navigator.appName == 'Microsoft Internet Explorer') {
      obj.style.filter = 'alpha(opacity=' + value + ')';
    }
    else {
      obj.style.opacity = (value / 100);
    }
  }
};
