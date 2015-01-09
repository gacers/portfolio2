'use strict()';

var config= {
	port: 3000
};

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			options: {
				port: config.port
			},
			dev: {
				options: {
					script: 'keystone.js',
					debug: true
				}
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				force: true
			},
			all: [
				'routes/**/*.js',
				'models/**/*.js',
				'public/js/custom/*.js'
			],
			server: [
				'./keystone.js'
			]
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'shell:nodeInspector', 'node-inspector', 'stopServices', 'startServices', 'shell:keystone', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		'node-inspector': {
			custom: {
				options: {
					'web-host': 'localhost',
					'web-port': '8080'
				}
			}
		},

		nodemon: {
			debug: {
				script: 'keystone.js',
				options: {
					nodeArgs: ['--debug'],
					env: {
						port: config.port
					}
				}
			}
		},

		sass: {
			dist: {
				options: {
		// includePaths: require('node-bourbon').with('other/path', 'another/path')
		// - or -
					includePaths: require('node-bourbon').includePaths
					// loadPath: require('node-bourbon').includePaths
				},
				files: {
					'public/styles/site.css': '/node_modules/sass-bourbon/bourbon/_bourbon.scss'
				}
			}
		},

		shell: {
			nodeInspector: {
				command: 'lsof -t -i tcp:8080 | xargs kill'
			},
			keystone: {
				command: 'node keystone'
			}
		},

		uglify: {
			all_src : {
				options : {
					sourceMap : true
				},
				src : 'public/js/global/**/*.js',
				dest : 'public/js/site.min.js'
			}
		},

		watch: {
			js: {
				files: [
					'model/**/*.js',
					'public/js/custom/**/*.js',
					'routes/**/*.js'
				],
				tasks: ['uglify', 'jshint:all']
			},
			express: {
				files: [
					'keystone.js',
					'public/js/lib/**/*.{js,json}'
				],
				tasks: ['jshint:server', 'concurrent:dev']
			},
			livereload: {
				files: [
					'public/styles/**/*.css',
					'public/styles/**/*.less',
					'public/styles/**/*.sass',
					'public/styles/**/*.scss',
					'templates/**/*.jade',
					'node_modules/keystone/templates/**/*.jade'
				],
				options: {
					livereload: true
				}
			}
		}
	});

	// load jshint
	grunt.registerTask('lint', function(target) {
		grunt.task.run([
			'jshint'
		]);
	});

	// default option to connect server
	grunt.registerTask('serve', function(target) {
		grunt.task.run([
			'jshint',
			'concurrent:dev'
		]);
	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	// custom command to start project: grunt start
	grunt.registerTask('start', function () {
		grunt.task.run([
			'concurrent:dev'
		]);
	});

	// starts mongodb
	grunt.registerTask('startServices', 'Start all required services', ['startMongo']);

	// stops all instances of mongodb
	grunt.registerTask('stopServices', 'Stop all services', ['stopMongo']);

};
