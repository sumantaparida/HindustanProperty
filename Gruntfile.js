'use strict';
/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
  return require('serve-static')(require('path').resolve(dir));
};

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
          src: 'source',
          app: 'app',
          assets: 'app',
          scss: ['<%= project.src %>/scss/style.scss'],
          js: ['<%= project.src %>/js/*.js'],
          jsfile: ['<%= project.src %>/scss/js/minify/']
        },
        // SASS
        sass: {                              // Task
          dist: {                            // Target
            options: {                       // Target options
              style: 'expanded'
            },
            files: {                         // Dictionary of files
              'app/css/style.css': '<%= project.scss %>',
              'app/css/home.css': '<%= project.src %>/scss/home.scss'
            }
          }
        },
        // CSS MIN
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'app/css/style.min.css': ['app/css/style.css'],
                    'app/css/hp.home.min.css': ['app/css/home.css']
                }
            }
        },

        // UGLIFY
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'app/js/style.min.js': ['<%= project.src %>/scss/js/style.js'],
                    'app/js/custom.1.8.min.js': ['<%= project.src %>/scss/js/custom.1.8.js'],
                    'app/js/custom.1.12.min.js': ['<%= project.src %>/scss/js/custom.1.12.js']
                }
            },
            silu: {
                files: {
                  'app/js/prod/step1/set1.min.js': ['<%= project.src %>/scss/theam/js/jquery.js','<%= project.src %>/scss/theam/js/jquery-migrate.min.js'],
                  'app/js/prod/step2/set2.min.js': ['<%= project.app %>/js/lib/bootstrap.min.js','<%= project.app %>/js/lib/jquery.nicescroll.js','<%= project.app %>/js/lib/moment.js','<%= project.app %>/js/lib/plugins.js','<%= project.app %>/js/lib/core.min.js','<%= project.app %>/js/lib/widget.min.js'],
                  'app/js/prod/step3/set3.min.js': ['<%= project.app %>/js/lib/property-carousels.js','<%= project.src %>/scss/js/minify/set3/custom.1.12.min.js','<%= project.app %>/js/lib/jquery-1.8.0.min.js','<%= project.app %>/js/lib/jquery-ui.js','<%= project.app %>/js/lib/bootstrap-multiselect.js','<%= project.src %>/js/custom.1.8.min.js']
                }
            }
        },
        // OPEN
        open: {
          server: {
            path: 'http://localhost:<%= connect.options.port %>'
          }
        },
        // WATCH
        watch: {
          options: {livereload: true},
          uglify: {
            files: [
              '<%= project.src %>/scss/*.js',
              '<%= project.src %>/scss/js/*.js',
            ],
            tasks: ['uglify'],
          },
          sass: {
            files: [
              '<%= project.src %>/scss/*.scss',
              '<%= project.src %>/scss/theam/scss/*.scss',
              '<%= project.src %>/scss/module/*.scss',
            ],
            tasks: ['sass', 'cssmin'],
          },
          // files: [
          //   '<%= project.src %>/scss/*.scss',
          //   '<%= project.src %>/scss/theam/scss/*.scss',
          //   '<%= project.src %>/scss/module/*.scss',
          //   '<%= project.src %>/scss/js/*.js',
          //   '<%= project.src %>/scss/*.js',
          // ],
          // tasks: ['sass', 'cssmin', 'uglify'],
          livereload: {
            options: { livereload: true },
            files: ['<%= project.src %>/**/*','<%= project.app %>/**/*'],
          }
        },
        //  Connect
        connect: {
          options: {
            port: 9999,
            hostname: '*'
          },
          livereload: {
            options: {
              middleware: function(connect) {
                return [lrSnippet, mountFolder(connect, 'app')];
              }
            }
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('test', ['sass', 'cssmin', 'uglify']);
    grunt.registerTask('server', ['uglify:silu']);
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'connect:livereload', 'open', 'watch']);

};
