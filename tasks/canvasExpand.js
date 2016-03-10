/*
 * grunt-canvasExpand
 * https://github.com/xinxuzhang/canvasExpand
 *
 * Copyright (c) 2016 zhangxinxu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var fs = require('fs');
  var gm = require('gm').subClass({ imageMagick: true });

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('canvasExpand', 'expand canvas size of image, espically for icons', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      size: [20, 20],
      filenameMap: function(name) {
        return name;
      }
    });

    // Iterate over all specified file groups.
    // this.files是一个数组，示意：
    /*
      [{
        src: [Getter],
        dest: 'tmp/default_options',
        orig: {
          src: [Object],
          dest: 'tmp/default_options'
        }
      }]
      就是把default_options对象中的files对象的键值数据变成了数组
    */

    // 扩展图片尺寸
    var sizew = options.size[0], sizeh = options.size[1];

    // 异步告知
    var done = this.async();

    this.files.forEach(function(f) {
      /*
        f的结构如下
        {
          src: [Getter],
          dest: 'tmp/default_options',
          orig: {
            src: ['test/fixtures/testing'. 'test/fixtures/123'],
            dest: 'tmp/default_options'
          }
        }

      */
      /*
        console.log(f.src)的内容，等于orig.src的数组内容
      */

      // 文件夹是否存在
      if (!grunt.file.isDir(f.dest)) {
        // 生成文件夹
        grunt.file.mkdir(f.dest);
      }

      // 记住任务完成数目
      var start = 0, length = f.src.length;

      // Concat specified files.
      f.src.forEach(function(filepath, index) {
        var filename = filepath.split('/')[filepath.split('/').length-1];
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('文件"' + filepath + '"找不到。');
        } else if (/^.+\.(?:png|jpg|gif)$/i.test(filepath) == false) {
          // 是否是图片
          grunt.log.warn('文件"' + filepath + '"不是图片。');
        } else {    
          // image resize
          gm(filepath).size(function(err, value) {
            if (err) {
              console.log(err);
              return;
            }
            // note : value may be undefined
            if (value) {
              var width = value.width, height = value.height;
              // 新文件路径和名称
              var filepathNew = f.dest + options.filenameMap(filename);
              // 当高宽都小于20像素的时候
              if (width <= sizew && height <= sizeh && width*height != sizew*sizeh) {
                  // 透明边框填充实线透明背景的画笔扩展效果
                  gm(filepath)                    
                  .borderColor('none')
                  .border((sizew-width)/2, (sizeh-height)/2)
                  .crop(sizew,sizeh, 0, 0)
                  .write(filepathNew, function (err) {  
                    // 有错报错，无错加冕   
                    if (!err) {
                      grunt.log.writeln('Expand done('+ index +'): ' + filepathNew);
                    } else {
                      grunt.log.warn(err);
                    }

                    // 统计任务完成数目
                    start++;
                    if (start == length) {
                      done();
                    }
                  });
              } else {
                // 直接复制图片
                gm(filepath).write(filepathNew, function (err) {                  
                  if (!err) {
                    grunt.log.writeln('Just copy('+ index +'): ' + filepathNew);
                  } else {
                    grunt.log.warn(err);
                  }

                  // 统计任务完成数目
                  start++;
                  if (start == length) {
                    done();
                  }
                });
              }
            }
          });
        }
      });

      /*
        console.log(src) 
        Testing, 1 2 3   -这里使用的是默认的options.separator
        Testing: 1 2 3   -这里使用的是Gruntfile.js中设置的options
      */

      // Handle options.
      // src += options.punctuation;

      /* 结束的标点 */
      /*
        console.log(src) 
        Testing, 1 2 3.   -这里使用的是默认的options.punctuation
        Testing: 1 2 3 !!!   -这里使用的是Gruntfile.js中设置的options
      */

      // Write the destination file.
      // 写入新文件
      // 在tmp文件夹下面，
      // 新文件名是default_options等

      // grunt.file.write(f.dest, src);

      // Print a success message.
      // grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
