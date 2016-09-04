module.exports = function (grunt) {
  grunt.initConfig({
    scsslint: {
      allFiles: '_sass/*.scss'
    }
  });

  grunt.loadNpmTasks('grunt-scss-lint');

  grunt.registerTask('default', 'scsslint');
};
