/*
 * Created on 2019-08-28
 * Copyright (c) 2019
 */

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({

        //set work directory - config paths
        settings: {
            src: 'src',
            dist: 'public'
        },

        domains: {
            local: {
                main: 'https://localhost:8080',
                mask: 'http://localhost:9001'
            }
        },


        //wacth the files that the project is using according the paths set
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= settings.dist %>/*.html',
                    '<%= settings.dist %>/{,*/}*.html',
                    '<%= settings.dist %>/assets/css/*.css',
                    '<%= settings.dist %>/assets/css/**/*.css',
                    '<%= settings.dist %>/assets/js/{,*/}*.js',
                    '<%= settings.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= settings.src %>/assets/sass/*.scss',
                ]
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['build:local'],
            },
            data: {
                files: '<%= settings.src %>/**/**/*.json',
                tasks: ['build:local'],
            },
            template: {
                files: '<%= settings.src %>/**/{,*/}*.hbs',
                tasks: ['build:local'],
            },
            html: {
                files: '<%= settings.src %>/template/pages/{,*/}*.html',
                tasks: ['htmlmin'],
            },
            sass: {
                files: '<%= settings.src %>/assets/sass/*.scss',
                tasks: ['sass', 'cssmin'],
            },
        },

        //create a local connect server connecting on localhost with NodeJS
        connect: {
            options: {
                port: 9001,
                livereload: true,
                hostname: '*'
            },
            livereload: {
                options: {
                    open: {
                        target: 'localhost:9001'
                    },
                    base: '<%= settings.dist %>'
                }
            }
        },

        image: {
            static: {
                options: {
                    optipng: false,
                    pngquant: true,
                    zopflipng: true,
                    jpegRecompress: false,
                    mozjpeg: true,
                    guetzli: false,
                    gifsicle: true,
                    svgo: true
                },
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.src %>',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '<%= settings.src %>'
                }]
            }
        },


        assemble: {
            options: {
                assets: '<%= settings.src %>/assets',
                plugins: ['permalinks'],
                partials: ['<%= settings.src %>/templates/includes/**/*.hbs'],
                layoutdir: '<%= settings.src %>/templates/layout/',
                layout: 'global-ldp-template.hbs',
                data: ['<%= settings.src %>/templates/data/{,*/}*.{json,yml}']
            },
            localhost: {
                options: {
                    sitePath: "<%= domains.local.mask %>",
                    subdomain: "<%= domains.local.main %>",

                },
                files: {
                    './': ["<%= settings.src %>/templates/pages/**/*.hbs"]
                }
            },
            develop: {
                options: {
                    sitePath: "<%= domains.dev.mask %>",
                    subdomain: "<%= domains.dev.main %>",

                },
                files: {
                    './': ["<%= settings.src %>/templates/pages/**/*.hbs"]
                }
            }
        },
        // if you want to copy any file from dev enviroment to production <%= settings.dist %> set here
        copy: {
            assets: {
                expand: true,
                cwd: '<%= settings.src %>/assets',
                src: '**/*.{png,jpg,gif,ico,jpeg,svg}',
                dest: '<%= settings.dist %>/assets'
            },
            script: {
                expand: true,
                cwd: '<%= settings.src %>/assets',
                src: '**/*.js',
                dest: '<%= settings.dist %>/assets'
            },
            pdf: {
                expand: true,
                cwd: '<%= settings.src %>/assets/pdf',
                src: '**/*.pdf',
                dest: '<%= settings.dist %>/assets/pdf'
            },
            sitemap: {
                expand: true,
                cwd: '<%= settings.src %>/',
                src: '**/*.{xml,txt}',
                dest: '<%= settings.dist %>/'
            },
            css: {
                expand: true,
                cwd: '<%= settings.src %>/',
                src: '**/*.css',
                dest: '<%= settings.dist %>/'
            }
        },

        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files - 'destination': 'source'
                    '<%= settings.dist %>/index.html': '<%= settings.src %>/templates/pages/index.html',

                }
            },
        },

        sass: { // Task
            dist: { // Target
                files: { // Transform sass to css - 'destination': 'source'
                    '<%= settings.dist %>/assets/css/style.css': '<%= settings.src %>/assets/sass/style.scss'
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'app/css/*.css',
                        'app/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './app'
                }
            }
        },

        cssmin: { // Task
            dist: { // Target
                files: { // Minify css - 'destination': 'source'
                    '<%= settings.dist %>/assets/css/style.min.css': '<%= settings.dist %>/assets/css/style.css'
                }
            },
        },

        uglify: {
            my_target: {
                files: {
                    '<%= settings.dist %>/assets/js/main.min.js': '<%= settings.dist %>/assets/js/main.js',
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-browser-sync');

    // define default task
    grunt.registerTask('default', ['browserSync', 'watch']);

    //loading tasks from NPM modules installed on this project
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('assets', [
        'copy',
        'htmlmin',
        'sass',
        'cssmin',
        `uglify`
    ]);

    grunt.registerTask('load', [
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build:local', [
        'assemble:localhost',
        'assets'
    ]);

    grunt.registerTask('build:dev', [
        'assemble:develop',
        'image',
        'assets'
    ]);

    grunt.registerTask('build:hml', [
        'assemble:homolog',
        'assets'
    ]);

    grunt.registerTask('build:prod', [
        'assemble:production',
        'image',
        'assets'
    ]);

    grunt.registerTask('dev', [
        'build:local',
        'load',
    ]);

    grunt.registerTask('imagemin', [
        'image',
    ]);

};