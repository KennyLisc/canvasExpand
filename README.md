# grunt-canvasExpand

> expand canvas size of image, espically for icons

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-canvasExpand --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-canvasExpand');
```

windows用户务必安装ImageMagick.exe文件，因为npm安装的imageMagick只是个调用exe程序的包装器，例如本人安装的是ImageMagick-6.9.3-6-Q16-x64-dll. [官网有下载](http://www.imagemagick.org/script/binary-releases.php)。

## The "canvasExpand" task

### Overview
In your project's Gruntfile, add a section named `canvasExpand` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  canvasExpand: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.size
Type: `Array`
Default value: `[20, 20]`

希望扩展的图片尺寸大小，大于这个尺寸的图片会被忽略

#### options.filenameMap
Type: `Function`
Default value: `function(filename) { return filename; }`

扩展后的新图片的名称，<code>filename</code>参数是原始文件名称。

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  canvasExpand: {
    default_options: {
      options: {
      },
      files: {
        'tmp/icons/': 'test/fixtures/icons/*.png'
      }
    }
  }
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  canvasExpand: {
    options: {
      size: [40,40],
      punctuation: ' !!!',
    },
    filenameMap: function(name) {
      return '40x40-' + name;
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
