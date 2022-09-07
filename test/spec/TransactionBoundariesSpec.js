import '../TestHelper';

import Modeler from 'bpmn-js/lib/Modeler';

import transactionBoundariesModule from '../..';

import { forEach } from 'min-dash';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import diagramXML from './transaction-boundaries.bpmn';


describe('transaction-boundaries', function() {

  function withModeler(config, fn) {

    return async function() {

      var modeler = new Modeler(config);

      await modeler.importXML(diagramXML);
      return modeler.invoke(fn);
    };
  }


  function inject(fn) {

    var config = {
      container: 'body',
      additionalModules: [ transactionBoundariesModule ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    };

    return withModeler(config, fn);
  }


  describe('API', function() {

    it('should be hidden initially', inject(function(transactionBoundaries, overlays) {

      // when XML imported

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.be.empty;
    }));


    it('should show', inject(function(transactionBoundaries, overlays) {

      // when
      transactionBoundaries.show();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.have.length(8);

    }));


    it('should toggle on', inject(function(transactionBoundaries, overlays) {

      // when
      transactionBoundaries.toggle();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.have.length(8);

    }));


    it('should toggle off', inject(function(transactionBoundaries, overlays) {

      // given
      transactionBoundaries.show();

      // when
      transactionBoundaries.toggle();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.be.empty;

    }));


    it('should hide', inject(function(transactionBoundaries, overlays) {

      // given
      transactionBoundaries.show();

      // when
      transactionBoundaries.hide();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.be.empty;

    }));

  });


  describe('unit tests', function() {

    it('get transaction boundary elements', inject(function(transactionBoundaries) {

      // given
      var expectedBoundaries = {
        'Task_1': { before: true, after: false },
        'Task_2': { before: true, after: false },
        'Gateway_2': { before: false, after: false },
        'MessageCatchEvent': { before: true, after: false },
        'Task_3': { before: true, after: false },
        'Task_4': { before: false, after: true },
        'TimerCatchEvent': { before: true, after: false },
        'ConditionalCatchEvent': { before: true, after: false },
        'SignalCatchEvent': { before: true, after: false }
      };

      // when
      var transactionBoundaryElements = transactionBoundaries._getTransactionBoundaryElements();

      // then
      expect(transactionBoundaryElements).to.have.length(8);

      forEach(transactionBoundaryElements, function(element) {

        var boundaries = expectedBoundaries[element.shape.id];

        expect(boundaries).to.eql(element.boundaries);
      });

    }));


    it('should not crash on event definitions being an empty Array', inject(function(transactionBoundaries, elementRegistry) {

      // given
      var event = elementRegistry.get('StartEvent_1');

      event.businessObject.get('eventDefinitions'); // manipulate property

      // when
      var transactionBoundaryElements = transactionBoundaries._getTransactionBoundaryElements();

      // then
      expect(transactionBoundaryElements).to.exist;
    }));

  });

});
