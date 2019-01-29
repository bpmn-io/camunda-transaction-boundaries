# Changelog

All notable changes to [camunda-transaction-boundaries](https://github.com/bpmn-io/camunda-transaction-boundaries) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

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
