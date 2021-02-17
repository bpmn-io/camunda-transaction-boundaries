# Changelog

All notable changes to [camunda-transaction-boundaries](https://github.com/bpmn-io/camunda-transaction-boundaries) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 1.1.2

* `FIX`: handle empty event definitions ([`e9c630cc`](https://github.com/bpmn-io/camunda-transaction-boundaries/commit/e9c630ccbcea0623e2d6ba7177319de000654a66))
* `CHORE`: migrate CI to GitHub Actions ([`15727b22`](https://github.com/bpmn-io/camunda-transaction-boundaries/commit/15727b225fedc53e6943a352f375a4da1de248e3))
* `CHORE`: migrate test environment to `bpmn-js@8` ([`5c972848`](https://github.com/bpmn-io/camunda-transaction-boundaries/commit/5c9728480d1f6a42b0a976b0ba7e2966af7d610f))

## 1.1.1

* `FIX`: remove transaction boundaries from event based gateways ([`11e41795`](https://github.com/bpmn-io/camunda-transaction-boundaries/commit/11e4179522c83de465d35b6a6e401c0ecaced2b9))

## 1.1.0

* `FEAT`: add external service tasks ([`0362f734`](https://github.com/bpmn-io/bpmn-js-transaction-boundaries/pull/4/commits/0362f734364c7a9be909d6d98debf08c04ebcfe9))

## 1.0.1

* `DOCS`: fix usage section

## 1.0.0

* `FEAT`: add before start and after end boundaries ([`a7f5426a`](https://github.com/bpmn-io/bpmn-js-transaction-boundaries/pull/4/commits/a7f5426a24e4dd7be9614537841083e9ad0abca8))
* `FEAT`: add conditional event boundaries ([`2ffd2e99`](https://github.com/bpmn-io/bpmn-js-transaction-boundaries/pull/4/commits/2ffd2e99c74e853a60be2672c20d9a7486ec86e0))
* `CHORE`: rename to `camunda-transaction-boundaries` ([#5](https://github.com/bpmn-io/bpmn-js-transaction-boundaries/issues/5))
* `CHORE`: replace `lodash` with `min-dash`
* `CHORE`: migrate to `bpmn-js@3`
* `CHORE`: expose ES modules
* `FIX`: show boundary marker on sequence flows only ([`2886ec8f`](https://github.com/bpmn-io/bpmn-js-transaction-boundaries/pull/4/commits/2886ec8f5cad78ee246643eca27693578205cca1))

### Breaking Changes

* requires `bpmn-js@3`
* exposes ES modules and requires an appropriate bundler to consume
* renamed to `camunda-transaction-boundaries`

## ...

Check `git log` for earlier history.
