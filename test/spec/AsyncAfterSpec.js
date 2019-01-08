import '../TestHelper';

import Modeler from 'bpmn-js/lib/Modeler';

import transactionBoundariesModule from '../..';

import { forEach } from 'min-dash';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';


describe('transaction-boundaries-async-after', function() {

  var diagram = require('./async-after.bpmn');

  function withModeler(config, fn) {

    return function(done) {

      var modeler = new Modeler(config);

      modeler.importXML(diagram, function(err) {
        if (err) {
          done(err);
        }

        modeler.invoke(fn);

        done();
      });

    };
  }


  function inject(fn) {

    var config = {
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
      expect(overlays.get({ type: 'transaction-boundaries' })).to.have.length(6);

    }));

  });


  describe('unit tests', function() {

    it('get transaction boundary elements', inject(function(transactionBoundaries, elementRegistry) {

      // given
      var expectedBoundaries = {
        'StartEvent_1': { before: false, after: true },
        'Task_1': { before: true, after: true },
        'MessageEvent': { before: true, after: true },
        'EndEvent_1': { before: true, after: false }
      };

      // when
      var transactionBoundaryElements = transactionBoundaries._getTransactionBoundaryElements();

      // then
      expect(transactionBoundaryElements).to.have.length(4);

      forEach(transactionBoundaryElements, function(element) {

        var boundaries = expectedBoundaries[element.shape.id];

        expect(boundaries).to.eql(element.boundaries);
      });

    }));

  });

});