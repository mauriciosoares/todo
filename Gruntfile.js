module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		requirejs: {
			compile: {
				options: {
					baseUrl: 'build/',
					mainConfigFile: 'build/config.js',
					out: 'js/all.min.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['requirejs']);
};