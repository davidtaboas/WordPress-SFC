module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // CONFIG ===================================/
    watch: {
        compass: {
            files: ['**/*.{scss,sass}'],
            tasks: ['compass:dev']
        },
        js: {
            files: ['library/jsdev/*.js'],
            tasks: ['uglify']
        },
        todos: {
            files: ['**/*.{php,js,scss}'],
            tasks: ['todos']
        }
    },
    compass: {

        dev: {
            options: {
                sassDir: ['library/scss'],
                cssDir: ['library/css'],
                environment: 'development',
                outputStyle: 'nested', //nested, expanded
                config: './library/config.rb'

            }
        },
        prod: {
            options: {
                sassDir: ['library/sass'],
                cssDir: ['library/css'],
                environment: 'production',
                outputStyle: 'compressed',
                config: './library/config.rb'
            }
        },
    },
    uglify: {
        all: {
            files: {
                'library/js/main.min.js': [
                    'library/jsdev/scripts.js',
                    'library/jsdev/app.js'
                ]
            }
        }
    },
    todos: {
        options: {
            verbose: true,
            priorities : {
                low : /TODO/,
                med : /FIXME/,
                high: /IMPORTANT/
            },
            reporter: {
                header: function () {
                    return '=== Lista de Tareas ===\n\n';
                },
                fileTasks: function (file, tasks, options) {
                    var result = '';
                    result += '>: ' + file + '\n';
                    tasks.forEach(function (task) {
                        result += '[line: ' + task.lineNumber + ' - ' + task.priority.toUpperCase() + ']\n';
                        result += '\t' + task.line + '\n';
                    });
                    result += '\n';
                    return result;
                },
                footer: function () {
                    return '\n';
                }
            }
        },
        src: ['**/*.{php,js}', '!**/node_modules/**', '!**/bower_components/**', '!**/Gruntfile.js**']
    }


  });

  // DEPENDENT PLUGINS =========================/

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-todos');

  // TASKS =====================================/

  grunt.registerTask('default', ['watch']);

};