module.exports = function(grunt) {
	grunt.initConfig({
		//======Pug=======
		pug: {
			default: {
				options: {
					basedir: "./",
					pretty: true,
					debug: false,
				},
				files: [{
					expand: true,
					cwd: "src/views/",
					src: ["**/*.pug"],
					dest: "tmp/views/",
					ext: ".html"
				}]
			}
		},

		//======Sass=======
		"dart-sass": {
			default: {
				options:
				{
					sourceMap: true,
					quiet: true
				},
				files: [{
					expand: true,
					cwd: "src/styles",
					src: ["**/*.scss"],
					dest: "tmp/styles/",
					ext: ".css"
				}]
			}
		},

		//========TypeScript=======
		ts: {
			default : {
				tsconfig: "./tsconfig.json"
			}
		},

		//=======HTML min===========
		htmlmin: {
			default: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyURLs: String,
					sortAttributes: true,
					sortClassName: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true
				},
				files: [{
					expand: true,
					cwd: "tmp/views",
					src: ["**/*.html"],
					dest: "public/views/",
					ext: ".min.html"
				}]
			}
		},

		//=======CSS min===========
		cssmin: {
			default: {
				options: {
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: "tmp/styles",
					src: ["**/*.css"],
					dest: "public/styles/",
					ext: ".min.css"
				}]
			}
		},

		//=========IMG min============
		imagemin: {
			default: {
					options: {
							optimizationLevel: 5,
							progressive: true,
							interlaced: true,
							svgoPlugins: [{removeViewBox: false}],
					},
					files: [{
						expand: true,
						cwd: "src/images",
						src: ["**/*.{ico,jpg,jpeg,png,gif,svg}"],
						dest: "public/images/"
					}]
			}
		},

		//==========JS min============
		uglify: {
			default: {
				options: {
					mangle: false,
					compress: true,
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: "tmp/js",
					src: ["**/*.js"],
					dest: "public/js/",
					ext: ".min.js"
				}]
			}
		},

		//===========WATCH============
		watch: {
			scripts: {
				std: {
					files: ["src/scripts/**/*.ts"],
					tasks: ["newer:ts"]
				},
				inc: {
					files: ["src/inc/scripts/**/*.ts"],
					tasks: ["newer:ts"]
				},
				min:{
					files: ["tmp/scripts/**/*.js"],
					tasks: ["newer:uglify"]
				}
			},
			styles: {
				std: {
					files: ["src/styles/**/*.scss"],
					tasks: ["newer:sass"]
				},
				inc: {
					files: ["src/inc/styles/**/*.scss"],
					tasks: ["newer:sass"]
				},
				min:{
					files: ["tmp/styles/**/*.css"],
					tasks: ["newer:cssmin"]
				}
			},
			templates: {
				std: {
					files: ["src/views/**/*.pug"],
					tasks: ["newer:pug"]
				},
				inc: {
					files: ["src/inc/views/**/*.pug"],
					tasks: ["newer:pug"]
				},
				min:{
					files: ["tmp/views/**/*.html"],
					tasks: ["newer:htmlmin"]
				}
			},
			img: {
				files: ["src/img/**/*.{ico,jpg,jpeg,png,gif,svg}"],
				tasks: ["newer:imagemin"],
			}
		},

		//==========CLEAN TMP===========
		clean: {
			default: ["tmp/**/*/", "public/**/*/"]
		}

		//=========COPY PROJECTS FILES==========
		/*copy: {
			default: {
				files: [
					{expand: true, src: ["src/manifest.json"], dest: "dist/manifest.json"}
				],
			},
		}*/
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-pug");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks("grunt-newer");
	
	grunt.registerTask("build", ["ts", "dart-sass", "pug", "htmlmin", "cssmin", "imagemin", "uglify"]);
	grunt.registerTask("build_clean", ["clean", "build"]);
	grunt.registerTask("build_watch", ["build", "watch"]);

	grunt.registerTask("default", ["build_watch"]);
};