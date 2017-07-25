var mjAPI = require("mathjax-node");
var svg2png = require('svg2png');
var fs = require('fs');

function createPNG(result, callback){
  var sourceBuffer = new Buffer(result.svg, "utf-8");
  svg2png(sourceBuffer).then(function(buffer){
    result.png = "data:image/png;base64," + buffer.toString('base64');
    return callback(result);
  })
};

exports.math2png = function(options, callback){
  var mjConfig = Object.assign({}, options.config);
  var typesetOptions = Object.assign({}, options.typeset);

  // make sure SVG output will be generated and disable mml and html
  typesetOptions.svg = true;
  typesetOptions.mml = false;
  typesetOptions.html = false;
  mjAPI.config(mjConfig);
  mjAPI.typeset(typesetOptions, function(result){
    if (result.errors) callback(result);
    createPNG(result, callback);
  });
}