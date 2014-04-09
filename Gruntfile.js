module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'public/js/src/formikation.js',
        dest: 'public/js/formikation.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/formikation.css': 'public/css/src/formikation.scss',
          'public/css/formikation-theme-ue.css': 'public/css/src/formikation-theme-ue.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['**/*.css', '**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      }
    }
  });

  // Plugins we use
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['uglify','sass']);
  grunt.registerTask('prod', ['uglify','sass']);

};
