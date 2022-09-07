import '../TestHelper';

import Modeler from 'bpmn-js/lib/Modeler';

import transactionBoundariesModule from '../..';

import { forEach } from 'min-dash';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import diagramXML from './external-service-task.bpmn';


describe('transaction-boundaries-external-service-task', function() {


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

    it('should show', inject(function(transactionBoundaries, overlays) {

      // when
      transactionBoundaries.show();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.have.length(1);

    }));

  });


  describe('unit tests', function() {

    it('get transaction boundary elements', inject(function(transactionBoundaries, elementRegistry) {

      // given
      var expectedBoundaries = {
        'ExternalServiceTask': { before: true, after: false }
      };

      // when
      var transactionBoundaryElements = transactionBoundaries._getTransactionBoundaryElements();

      // then
      expect(transactionBoundaryElements).to.have.length(1);

      forEach(transactionBoundaryElements, function(element) {

        var boundaries = expectedBoundaries[element.shape.id];

        expect(boundaries).to.eql(element.boundaries);
      });

    }));

  });

});