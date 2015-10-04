/**
 *  Carousel (jQuery)
 *
 *  Copyright 2011-2012, Marc S. Brooks (http://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Dependencies:
 *    jquery.js
 */

$(document).ready(function() {
  var parent = $('#container');
  var nodes  = $('#container > div');

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
  $('#button1').click(function() {
    stop();
    ticks = (speed * 0.001) * +1;
    init();
    active = true;
  });

  /**
   * Stop button event
   */
  $('#button2').click(function() {
    stop();
  });

  /**
   * Rotate right button event
   */
  $('#button3').click(function() {
    stop();
    ticks = (speed * 0.001) * -1;
    init();
    active = true;
  });

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
        nodes.each(function(index) {
          var angle = ((Math.PI * index * 2) / nodes.length) + offset;
          var depth = Math.sin(angle - shift);
          var width = parent.width() * (50 - Math.sin(angle) * dist);
          var posX  = (width / 100) - ($(this).width() / 2);

          $(this).css({
            display : 'block',
            left    : posX,
            opacity : depth
          });
        });

        offset += ticks;
      }, 16.6666667);
  }

  init();
});
