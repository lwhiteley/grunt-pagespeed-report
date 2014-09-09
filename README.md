# grunt-pagespeed-report

> This plugin will run pagespeed tests on urls and generate reports. See reporting options below.

> [![Build Status](https://travis-ci.org/lwhiteley/grunt-pagespeed-report.svg?branch=master)](https://travis-ci.org/lwhiteley/grunt-pagespeed-report)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pagespeed-report --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pagespeed-report');
```

NB. If you use [load-grunt-tasks](https://www.npmjs.org/package/load-grunt-tasks) then this step won't be necessary.

## The "pagespeedReport" task

### Overview
In your project's Gruntfile, add a section named `pagespeedReport` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pagespeedReport: {
    mySite: {
      options: {
        reporters: [ 'json', 'console'],
        key: '', // required google api key
        url: 'http://html5rocks.com/en',
        paths: ['/updates', '/resources'],
        locale: 'en_US',     // optional
        strategy: 'desktop',  // optional
        threshold: 80        // optional
      }
    },
    otherSite: {
      // Target-specific options go here.
    },
  },
});
```

### Options

#### options.reporters
- Type: `Array`
- Default value: `['console']`
- Required: false

An array of supported reporters than will generate or display content based on the type.
The available reporters are: `console`, `json`, (`html` coming soon)

#### options.key
- Type: `String`
- Default value: `''`
- Required: true

A string value that is used to access the google API.

#### options.url
- Type: `String`
- Default value: `''`
- Required: true

A string value that is the base/home page url for the site under test.

#### options.testHome
- Type: `Boolean`
- Default value: `true`
- Required: false

A boolean value that tells the task to test the home page or not.
#### options.paths
- Type: `Array`
- Default value: `['']`
- Required: false

An Array of paths that will be tested on the site of the base url provided. If not set then the homepage alone will be tested by default, given `testHome` is not set or set to `true`

#### options.locale
- Type: `String`
- Default value: `en_US`
- Required: false

The locale that results should be generated in. If set to something else please use a valid locale string.

#### options.strategy
- Type: `String`
- Default value: `desktop`
- Required: false

The strategy to use when analyzing the page. Possible values are `desktop` and `mobile`.
#### options.dest
- Type: `String`
- Default value: `.reporters`
- Required: false

The `dest` options is the location where reporters that produce output files will generate artifacts. This Should be specified if you have a preference of where to store your artifacts. This should also be specified and unique when multiple tasks are defined as to avoid overwriting of files.

#### options.threshold
- Type: `Number|Object`
- Default value: `80`
- Required: false

The threshold score dictates what is a pass, warning or failure.
- The default success criteria is `80` (>= 80)
- The default warning criteria is `60` (60 - 79)

eg.

```js
    pagespeedReport: {
      mySite: {
        options: {
          threshold: 80,
        }
      }
    }

    //OR
    pagespeedReport: {
      mySite: {
        options: {
          threshold: {success:80, warning: 70},
        }
      }
    }

```
A threshold object is generated based on the actual page score and passed to each reporter. This object looks like the following:
```js
  var threshold = {
    success: 80,
    warning: 60,
    marker: '' // 'success' || 'warning' || 'danger'
  };
```
NB.
- The marker is a descriptor of the state of the score based on the threshold.
For eg. if a page scores 81 and the success threshold is 80 then the marker will be `success`.
- If the warning is somehow less then the success value then the warning will be set to `10` less than the success value.
- If `threshold.success` is `0` then no markers will be produced.
- Passing a number as a threshold ill only set the success criteria. Please use the `object` if you wish to fine tune the threshold
- It is recommended to configure one task per website/domain. This way you can do `grunt pagespeedReport:mysite` to have a more targeted resultset.

### Usage Examples
TODO:
- Ability to set paths in a global option so different tasks will use those paths and probably different base urls.
- HTML reporter

## Contributing
- Pull requests are welcome

## Release History
_(Nothing yet)_

License: MIT
