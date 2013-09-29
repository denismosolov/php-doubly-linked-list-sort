module.exports = function(grunt) {
    
    var filelist = {
          mediaelement: [
            //'src/js/me-header.js',
            'src/js/me-namespace.js',
            'src/js/me-utility.js',
            'src/js/me-plugindetector.js',
            'src/js/me-featuredetection.js',
            'src/js/me-mediaelements.js',
            'src/js/me-shim.js',
            'src/js/me-i18n.js',
            'src/js/me-i18n-locale-de.js',
            'src/js/me-i18n-locale-zh.js'
          ],
          player: [
            //'src/js/mep-header.js',
            'src/js/mep-library.js',
            'src/js/mep-player.js',
            'src/js/mep-feature-playpause.js',
            'src/js/mep-feature-stop.js',
            'src/js/mep-feature-progress.js',
            'src/js/mep-feature-time.js',
            'src/js/mep-feature-volume.js',
            'src/js/mep-feature-fullscreen.js',
            'src/js/mep-feature-tracks.js',
            'src/js/mep-feature-contextmenu.js',
            'src/js/mep-feature-postroll.js'//,
            //'mep-feature-sourcechooser.js'
          ],
          onebuttonplayer: [
            'src/js/onebutton-mep-header.js',
            'src/js/onebutton-mep-library.js',
            'src/js/onebutton-mep-player.js',
            'src/js/onebutton-mep-feature-playpause.js'
          ]
    },
    meHeader = '/*!\n* MediaElement.js\n* HTML5 <video> and <audio> shim and player\n* http://mediaelementjs.com/\n*\n* Creates a JavaScript object that mimics HTML5 MediaElement API\n* for browsers that don\'t understand HTML5 or can\'t play the provided codec\n* Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3\n*\n* Copyright 2010-2013, John Dyer (http://j.hn)\n* License: MIT\n* <%= grunt.template.today("dd-mm-yyyy") %>\n*\n*/\n',
    mepHeader = '/*!\n * MediaElementPlayer\n * http://mediaelementjs.com/\n *\n * Creates a controller bar for HTML5 <video> add <audio> tags\n * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)\n *\n * Copyright 2010-2013, John Dyer (http://j.hn/)\n * License: MIT\n *\n */';
    
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
          options: {
              separator: ';'
          },
          mediaelement: {
              options: {
                  banner: meHeader
              },
              files: [
                  {
                      src: filelist.mediaelement, 
                      dest: 'build/mediaelement.js'
                  }
              ]
          },
          player: {
              options: {
                  banner: mepHeader
              },
              files: [
                  {
                      src: filelist.player,
                      dest: 'build/mediaelementplayer.js'
                  }
              ]
          },
          onebuttonplayer: {
              files: [
                  {
                      src: filelist.onebuttonplayer,
                      dest: 'build/mediaelementonebuttonplayer.js'
                  }
              ]
          },
          mediaelementandplayer: {
              files: [
                  {
                      src: filelist.mediaelement.concat(filelist.player),
                      dest: 'build/mediaelement-and-player.js' 
                  }
              ]
          },
          mediaelementandonebuttonplayer: {
              files: [
                  {
                      src: filelist.mediaelement.concat(filelist.onebuttonplayer),
                      dest: 'build/mediaelement-and-onebuttonplayer.js'
                      // build/mediaelementonebuttonplayer.js
                  }
              ]
          }
      },
      jshint: {
          files: ['gruntfile.js', 'src/**/*.js'],
          options: {
            globals: {
                jQuery: true,
                console: true,
                module: true
            }
          }
      },
      uglify: {
          mediaelement: {
              options: {
                  banner: meHeader
              },
              files: [
                  {
                      src: 'build/mediaelement.js', 
                      dest: 'build/mediaelement.min.js'
                  }
              ]
          },
          player: {
              options: {
                  banner: mepHeader
              },
              files: [
                  {
                      src: 'build/mediaelementplayer.js',
                      dest: 'build/mediaelementplayer.min.js'
                  }
              ]
          },
          onebuttonplayer: {
              options: {
                  banner: meHeader
              },
              files: [
                  {
                      src: 'build/mediaelementonebuttonplayer.js',
                      dest: 'build/mediaelementonebuttonplayer.min.js'
                  }
              ]
          },
          mediaelementandplayer: {
              options: {
                  banner: meHeader + mepHeader
              },
              files: [
                  {
                      src: 'build/mediaelement-and-player.js',
                      dest: 'build/mediaelement-and-player.min.js' 
                  }
              ]
          },
          mediaelementandonebuttonplayer: {
              options: {
                  banner: meHeader
              },
              files: [
                  {
                      src: 'build/mediaelement-and-onebuttonplayer.js',
                      dest: 'build/mediaelement-and-onebuttonplayer.min.js'
                      // build/mediaelementonebuttonplayer.js
                  }
              ]
          }
      },
      sass: {
        dist: {
          options: {
            style: 'expanded'
          },
          files: {
            'src/css/mediaelementplayer.css': 'src/scss/mediaelementplayer.scss',
            'src/css/playlist.css': 'src/scss/playlist.scss'
          }
        },
        min: {
          options: {
            style: 'expanded'
          },
          files: {
            'build/mediaelementplayer.min.css': 'src/scss/mediaelementplayer.scss',
            'build/playlist.min.css': 'src/scss/playlist.scss'
          }
        }
      }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    grunt.registerTask('movefiles', 'Copy files', function () {
        grunt.file.copy('src/css/controls.png', 'build/controls.png');
        grunt.file.copy('src/css/controls.svg','build/controls.svg');
        grunt.file.copy('src/css/bigplay.png','build/bigplay.png');
        grunt.file.copy('src/css/bigplay.svg','build/bigplay.svg');
        grunt.file.copy('src/css/loading.gif','build/loading.gif');
        
        grunt.file.copy('src/css/loading.gif','build/background.png');
        grunt.file.copy('src/css/mejs-skins.css','build/mediaelementplayer.css');
        grunt.file.copy('src/css/mejs-skins.css','build/mejs-skins.css');
        grunt.file.copy('src/css/controls-ted.png','build/controls-ted.png');
        grunt.file.copy('src/css/controls-wmp.png','build/controls-wmp.png');
        grunt.file.copy('src/css/controls-wmp-bg.png','build/controls-wmp-bg.png');
        
        grunt.file.copy('src/js/ill-lesson-playlist.js', 'build/ill-lesson-playlist.js');
    });
    
    grunt.registerTask('default', [/*'jshint',*/ 'concat', 'uglify', 'sass', 'movefiles']);
};
