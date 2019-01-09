> As of version `1.0.0` this library exposes [ES modules](http://exploringjs.com/es6/ch_modules.html#sec_basics-of-es6-modules). Use an ES module aware bundler such as [Webpack](https://webpack.js.org) or [Rollup](https://rollupjs.org) to bundle it for the browser.


# bpmn-js-transaction-boundaries

[![Build Status](https://travis-ci.com/bpmn-io/bpmn-js-transaction-boundaries.svg?branch=master)](https://travis-ci.com/bpmn-io/bpmn-js-transaction-boundaries)

A bpmn-js extension to visualize transaction boundaries

![transaction boundaries screenshot](docs/screenshot.png "Screenshot of Transaction Boundaries")


## Features

Visualize all transaction boundaries in a BPMN diagram.


This includes all BPMN elements that are wait states and have a boundary for incoming connections:

* Intermediate Catching Message Event
* Intermediate Catching Timer Event
* Intermediate Catching Signal Event
* Receive Task
* User Task
* Event Based Gateway

Furthermore all activities which have asynchronous continuations act as transaction boundaries. This is also valid for multi-instance activities.

Learn more about [transactions and wait states](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/).


## Usage

Extend the [bpmn-js](https://github.com/bpmm-io/bpmn-js) modeler with the transaction boundaries module:

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

var transactionBoundariesModule from 'bpmn-js-transaction-boundaries';

var canvas = $('#js-canvas');

var bpmnModeler = new BpmnModeler({
  container: canvas,
  additionalModules: [
    transactionBoundariesModule
  ]
});

bpmnModeler.importXML(xml, function(err) {

  if (err) {
    return console.error(err);
  }

  var transactionBoundaries = bpmnModeler.get('transactionBoundaries');

  transactionBoundaries.show();
});
```

Please see [this example](https://github.com/bpmn-io/bpmn-js-examples/tree/master/transaction-boundaries) for a more detailed instructions.


## Test

```
npm install
npm test
```


## License

MIT
