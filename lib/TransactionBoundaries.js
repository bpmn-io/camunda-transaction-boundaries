'use strict';

var forEach = require('lodash/collection/forEach');

var getOrientation = require('diagram-js/lib/layout/LayoutUtil').getOrientation;

/**
 * A module for showing the transaction boundaries in a BPMN diagram
 */
function TransactionBoundaries(elementRegistry, overlays, eventBus) {
  this._overlays = overlays;
  this._elementRegistry = elementRegistry;

  this.active = false;
  this.overlayIds = [];

  var self = this;

  eventBus.on('elements.changed', function() {
    if (self.active) {
      self.hide();
      self.show();
    }
  });
}

TransactionBoundaries.$inject = [ 'elementRegistry', 'overlays', 'eventBus' ];

module.exports = TransactionBoundaries;


/**
 * Get the transaction boundaries for the given element
 *
 * The following BPMN elements are always wait states
 * and have a boundary for incoming connections:
 *
 * - Intermediate Catching Message Event
 * - Intermediate Catching Timer Event
 * - Intermediate Catching Signal Event
 * - Receive Task
 * - User Task
 * - Event Based Gateway
 *
 * Furthermore all elements which have asynchronous
 * continuations act as transaction boundaries.
 *
 * Learn more about transactions and wait states:
 * https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/
 *
 * @param  {djs.shape} element
 *
 * @return {object|undefined}  an object with boolean properties 'before' and 'after'
 *
 * @example:
 * A plain task with the camunda:asyncAfter extension attribute set
 * has a transaction boundary after itself. This will return the following:
 * { before: false, after: true }
 */
TransactionBoundaries.prototype.getTransactionBoundaries = function(element) {

  var businessObject = element.businessObject,
      eventDefinitionType = businessObject.eventDefinitions && businessObject.eventDefinitions[0].$type;

  var isWaitStateTask = element.type === 'bpmn:ReceiveTask' || element.type === 'bpmn:UserTask';

  var isWaitStateEvent = element.type === 'bpmn:IntermediateCatchEvent' && (
    eventDefinitionType === 'bpmn:MessageEventDefinition' ||
    eventDefinitionType === 'bpmn:TimerEventDefinition' ||
    eventDefinitionType === 'bpmn:SignalEventDefinition'
  );

  var waitStateBefore = isWaitStateTask || isWaitStateEvent || businessObject.asyncBefore,
      waitStateAfter = businessObject.asyncAfter;

  if (waitStateBefore || waitStateAfter) {
    return { before: waitStateBefore, after: waitStateAfter };
  }
};


/**
 * Get all elements which have a transaction boundary.
 *
 * @return {object}
 */
TransactionBoundaries.prototype.getTransactionBoundaryElements = function() {

  var transactionBoundaryElements = [];

  var self = this;

  this._elementRegistry.forEach(function(element) {

    if (element.type === 'label') {
      return;
    }

    var transactionBoundaries = self.getTransactionBoundaries(element);

    if (transactionBoundaries) {
      transactionBoundaryElements.push({
        shape: element,
        boundariesBefore: transactionBoundaries.before,
        boundariesAfter: transactionBoundaries.after });
    }

  });

  return transactionBoundaryElements;

};


/**
 * Add an transaction boundary overlay at the correct trbl position.
 *
 * @param {djs.model.Shape} shape
 * @param {String} orientation trbl position ('top'|'right'|'bottom'|'left')
 */
TransactionBoundaries.prototype.addOverlay = function(element, orientation) {
  var position = {};
  var height;
  var width;

  if (orientation === 'left') {
    width = 5;
    height = element.shape.height;
    position.left = -width;
    position.top = 0;
  } else if (orientation === 'right') {
    width = 5;
    height = element.shape.height;
    position.right = 0;
    position.top = 0;
  } else if (orientation === 'top') {
    width = element.shape.width;
    height = 5;
    position.left = 0;
    position.top = - height;
  } else if (orientation === 'bottom') {
    width = element.shape.width;
    height = 5;
    position.bottom = 0;
    position.left = 0;
  }

  var id = this._overlays.add(element.shape, {
    position: position,
    html: '<div style="width: '+ width +'px; height: '+ height +'px; background: #cc0000; opacity: 0.35; "> </div>'
  });

  this.overlayIds.push(id);
};


/**
 * Show transaction boundaries.
 *
 * Create overlays for all
 */
TransactionBoundaries.prototype.show = function() {

  var transactionBoundaryElements = this.getTransactionBoundaryElements();

  var self = this;

  forEach(transactionBoundaryElements, function(element) {

    if (element.boundariesBefore) {

      forEach(element.shape.incoming, function(connection) {

        // get orientation for element and last waypoint of incoming connection
        var orientation = getOrientation(connection.waypoints.slice(-1).pop(), element.shape);

        self.addOverlay(element, orientation);
      });
    }

    if (element.boundariesAfter) {

      forEach(element.shape.outgoing, function(connection) {

        // get orientation for element and first waypoint of outgoing connection
        var orientation = getOrientation(connection.waypoints[0], element.shape);

        self.addOverlay(element, orientation);

      });
    }

  });
};


/**
 * Hide transaction boundaries
 */
TransactionBoundaries.prototype.hide = function() {

  var self = this;

  forEach(this.overlayIds, function(overlay) {
    self._overlays.remove(overlay);
  });

  this.overlayIds = [];

};


/**
 * Toggle the visibility of transaction boundaries
 */
TransactionBoundaries.prototype.toggle = function() {
  this.active ? this.hide() : this.show();
  this.active = !this.active;
};
