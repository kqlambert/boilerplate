/*global module*/
/*node browser: true*/
module.exports = function (grunt) {
	'use strict';
	var $jsFiles = [
		'js/build/*.js'
	];
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: $jsFiles,
				dest: 'js/production/production.js'
			}
		},
		uglify: {
			build: {
				src: 'js/production/production.js',
				dest: 'js/scripts.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/global-expand.css': 'css/build/global.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'css/build/global-expand.css',
				dest: 'css/build'
			}
		},
		cssmin: {
			combine: {
				files: {
					'css/global.css': ['css/build/global-expand.css']
				}
			}
		},
		dynamic: {
			files: [{
				expand: true,
				cwd: 'i/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'i/'
			}]
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: $jsFiles,
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['css/build/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'watch']);
};
