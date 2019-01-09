import '../TestHelper';

import Modeler from 'bpmn-js/lib/Modeler';

import transactionBoundariesModule from '../..';

import { forEach } from 'min-dash';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';


describe('transaction-boundaries', function() {

  var diagram = require('./transaction-boundaries.bpmn');

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

    it('should be hidden initially', inject(function(transactionBoundaries, overlays) {

      // when XML imported

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.be.empty;
    }));


    it('should show', inject(function(transactionBoundaries, overlays) {

      // when
      transactionBoundaries.show();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.have.length(5);

    }));


    it('should toggle on', inject(function(transactionBoundaries, overlays) {

      // when
      transactionBoundaries.toggle();

      // then
      expect(overlays.get({ type: 'transaction-boundaries' })).to.have.length(5);

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

    it('get transaction boundary elements', inject(function(transactionBoundaries, elementRegistry) {

      // given
      var expectedBoundaries = {
        'Task_1': { before: true, after: false },
        'Gateway_2': { before: true, after: false },
        'IntermediateCatchEvent_1': { before: true, after: false },
        'Task_3': { before: true, after: false },
        'Task_4': { before: false, after: true }
      };

      // when
      var transactionBoundaryElements = transactionBoundaries._getTransactionBoundaryElements();

      // then
      expect(transactionBoundaryElements).to.have.length(5);

      forEach(transactionBoundaryElements, function(element) {

        var boundaries = expectedBoundaries[element.shape.id];

        expect(boundaries).to.eql(element.boundaries);
      });

    }));

  });

});