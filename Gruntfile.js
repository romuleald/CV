module.exports = function (grunt) {

    var pathcss = 'css/';
    var pathimg = 'img/';
    var pathjs = 'js/';
    var pathfonts = pathcss + 'font/';
    var pathbuild = 'build/';
    var pathsrc = 'src/';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-nunjucks-2-html');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-uncss');

    var preprocessData = function (data) {
        var page = this.src[0];
        var lang = this.orig.lang;
        return data[lang];
    };
    var oI18n = grunt.file.readJSON('src/i18n/i18n.json');
    var nunjucksoption = {
        options: {
            autoescape: false,
            preprocessData: preprocessData,
            data: oI18n
        }
    };
    for (var label in oI18n) {
        nunjucksoption[label] = {
            files: [
                {
                    expand: true,
                    cwd: pathsrc,
                    src: 'index.html',
                    dest: pathbuild,
                    ext: '-' + label + '.html',
                    lang: label
                }
            ]
        }
    }


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    // includes files within path
                    // includes files within path and its sub-directories
                    {expand: true, cwd: pathsrc + pathimg, src: ['**'], dest: pathbuild + pathimg},
                    {expand: true, cwd: pathsrc + pathfonts, src: ['**'], dest: pathbuild + pathfonts},
                    {expand: true, cwd: pathsrc, src: ['index.php'], dest: pathbuild}
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['Last 2 versions']
            },
            target: {
                expand: true,
                cwd: pathbuild + pathcss,
                src: '{,*/}*.css',
                dest: pathbuild + pathcss

            }
        },
        uncss: {
            dist: {
                files: {
                    'build/css/all.css': ['build/index-FR.html']
                }
            }
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: [pathsrc + pathcss + '**/*.scss'],
                tasks: ['sass'],
                options: {
                    debounceDelay: 50
                }
            },
            nunjucks: {
                files: pathsrc + '**/*.html',
                tasks: ['nunjucks'],
                options: {
                    livereload: true
                }

            },
            medias: {
                files: pathsrc + '/img/**',
                tasks: ['copy:main'],
                options: {
                    livereload: true
                }

            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: {livereload: true},
                files: [pathbuild + '**/*']
            }
        },
        nunjucks: nunjucksoption,
        interface: {
            files: ['index.html']
        }
    });

    var filessass = {};
    filessass[pathbuild + pathcss + 'all.css'] = pathsrc + pathcss + 'all.scss';
    grunt.config('sass', {
            options: {
                outputStyle: 'compressed'
            },
            app: {files: filessass}
        }
    );

    // REGISTER TAKS
    grunt.registerTask('clean',
        'Deletes the working folder and its contents', function () {
            grunt.file.delete(pathbuild, {force: true});
        });
    grunt.registerTask('build', "Builds the application.",
        ['clean', 'copy:main', 'nunjucks', 'sass', 'uncss', 'autoprefixer']);
};
