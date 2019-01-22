module.exports = function(grunt) {
    const sass = require('node-sass');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['src/scss/*.scss'],
				tasks: ['sass:dist', 'autoprefixer']
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['concat', 'uglify']
			},
			livereload: {
				// host: 'localhost',
        		// port: 9001,
				files: ['*.html', 'js/**/*.{js,json}', 'css/*.css','img/*.{png,jpg,jpeg,gif,svg}'],
				options: {
					livereload: true
				}
			}
        },
        concat: {
			main: {
				files: {
					'js/main.js': ['src/js/vendor/*.js', 'src/js/*.js'],
				},
			},
		},
		uglify: {
			main: {
				files: {
					'js/main.min.js': ['js/main.js']
				},
			},
        },
        
		sass: {
			options: {
                implementation: sass,
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'css/style.css': 'src/scss/style.scss'
				}
			}
		},
		
		autoprefixer: {
			dist:{
			  	files: {
					'css/style.css':'css/style.css'
				}
			}
		},

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'img/'
                }]
            }
		},

		jimp: {
			placeholders: {
				options: {
					suffix: 'placeholder',
					actions: {
						blur: 10,
						quality: 40,
					}
				},
				files: [{
					expand: true,
					cwd: 'src/img',
					src: ['*.{jpg,jpeg,png}'],
					dest: 'img/'
				}]
			},
		},
		
		connect: {
			server: {
			  options: {
				port: 9001,
				livereload: true,
			  }
			}
		}
	});

	// Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'sass:dist', 'autoprefixer', 'connect:server', 'watch']);
	grunt.registerTask('image', ['imagemin', 'jimp']);

	// Register tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-jimp');
	grunt.loadNpmTasks('grunt-contrib-connect');
};