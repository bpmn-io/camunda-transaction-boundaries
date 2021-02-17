import '../TestHelper';

import Modeler from 'bpmn-js/lib/Modeler';

import transactionBoundariesModule from '../..';

import { forEach } from 'min-dash';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import diagramXML from './async-before-start.bpmn';


describe('transaction-boundaries-async-before-start', function() {


  function withModeler(config, fn) {

    return function() {

      var modeler = new Modeler(config);

      return modeler.importXML(diagramXML).then(function() {
        modeler.invoke(fn);
      });

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

    it('should show', inject(function(transactionBoundaries, overlays) {

      // when
      transactionBoundaries.show();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.have.length(2);

    }));

  });


  describe('unit tests', function() {

    it('get transaction boundary elements', inject(function(transactionBoundaries, elementRegistry) {

      // given
      var expectedBoundaries = {
        'StartEvent_1': { before: true, after: false },
        'EndEvent_1': { before: false, after: true }
      };

      // when
      var transactionBoundaryElements = transactionBoundaries._getTransactionBoundaryElements();

      // then
      expect(transactionBoundaryElements).to.have.length(2);

      forEach(transactionBoundaryElements, function(element) {

        var boundaries = expectedBoundaries[element.shape.id];

        expect(boundaries).to.eql(element.boundaries);
      });

    }));

  });

});