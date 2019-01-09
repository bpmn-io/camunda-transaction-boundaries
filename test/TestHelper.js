'use strict';

var diagramCSS = require('diagram-js/assets/diagram-js.css');
var bpmnCSS = require('bpmn-js/assets/bpmn-font/css/bpmn-embedded.css');


function addStyle(styleText) {

  var head = document.head;

  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.textContent = styleText;

  head.appendChild(styleElement);
}

module.exports.addStyle = addStyle;


// add initial style
addStyle(diagramCSS);
addStyle(bpmnCSS);

addStyle('html, body { height: 100%; padding: 0; margin: 0; }');