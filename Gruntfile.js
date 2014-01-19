module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: "stik_url_state.js",
      options: {
        specs: 'specs.js'
      }
    },
    uglify: {
      stik: {
        files: {
         'stik_url_state.min.js': ['stik_url_state.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('pack', ['uglify']);
};
