'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        'assets/js/app/**/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    less: {
      dist: {
        files: {
          'assets/css/app.min.css': [
            'assets/less/app.less',
            'assets/less/animatecss/animate.less',
            'assets/less/elements/elements.less',
            'assets/less/font-awesome/font-awesome.less',
            //'assets/less/queries.less',
          ]
        },
        options: {
          compress: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/bootstrap_3.1.1/transition.js',
            'assets/js/plugins/bootstrap_3.1.1/alert.js',
            'assets/js/plugins/bootstrap_3.1.1/button.js',
            'assets/js/plugins/bootstrap_3.1.1/carousel.js',
            'assets/js/plugins/bootstrap_3.1.1/collapse.js',
            'assets/js/plugins/bootstrap_3.1.1/dropdown.js',
            'assets/js/plugins/bootstrap_3.1.1/modal.js',
            'assets/js/plugins/bootstrap_3.1.1/tooltip.js',
            'assets/js/plugins/bootstrap_3.1.1/popover.js',
            'assets/js/plugins/bootstrap_3.1.1/scrollspy.js',
            'assets/js/plugins/bootstrap_3.1.1/tab.js',
            'assets/js/plugins/bootstrap_3.1.1/affix.js',
            'assets/js/plugins/*.js',

            'assets/js/_*.js',

            'assets/js/app/filters/*.js',
            'assets/js/app/directives/*.js',
            'assets/js/app/services/*.js',
            'assets/js/app/controllers/*.js',
            'assets/js/app/routes/*.js'
            
          ]
        },
        options: {
          // abcd
          mangle: false
        }
      }
    },
    watch: {
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/bootstrap_3.1.1/*.less',
          'assets/less/font-awesome/*.less'
        ],
        tasks: ['less']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      }
    },
    clean: {
      dist: [
        'assets/css/app.css',
        'assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'less',
    'uglify',
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
