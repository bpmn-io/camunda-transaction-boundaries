import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  browser: [
    'lib/**/*.js',
    'test/**/*.js'
  ],
  node: [
    'index.js',
    'karma.conf.js'
  ],
  test: [
    'test/**/*.js'
  ]
};

export default [
  ...bpmnIoPlugin.configs.browser.map(config => ({
    ...config,
    files: files.browser
  })),
  ...bpmnIoPlugin.configs.node.map(config => ({
    ...config,
    files: files.node,
    languageOptions: {
      ...config.languageOptions,
      sourceType: 'commonjs'
    }
  })),
  ...bpmnIoPlugin.configs.mocha.map(config => ({
    ...config,
    files: files.test
  })),
  {
    files: files.test,
    languageOptions: {
      globals: {
        require: 'readonly'
      }
    }
  }
];
