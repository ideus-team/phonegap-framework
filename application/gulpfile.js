'use strict';
const gulp          = require('gulp');

const imagemin      = require('gulp-imagemin');
const newer         = require('gulp-newer');

const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const csscomb       = require('gulp-csscomb');

const browserify    = require('browserify');
const source        = require('vinyl-source-stream');
const babelify      = require('babelify');
const uglify        = require('gulp-uglify');
const streamify     = require('gulp-streamify');

const del           = require('del');
const sizereport    = require('gulp-sizereport');
const duration      = require('gulp-duration');

const colour        = require('colour');

const template      = require('gulp-template-compile-es6');
const concat        = require('gulp-concat');


/**
 * PATH FILES
 */
const BUILD_DIR = 'public/www/';
const SOURCE_DIR = 'src/';
const CONFIG_DIR = 'public/';

const PATH = {
  SRC: {
    ALL_JS: SOURCE_DIR + 'js/**/*.js',
    APP_JS: SOURCE_DIR + 'js/bundle.js',
    HTML: SOURCE_DIR + '**/*.html',
    TEMPLATES: SOURCE_DIR + 'js/common/templates/**/*.html',
    XML: SOURCE_DIR + '**/*.xml',
    SASS: SOURCE_DIR + 'sass/**/*.scss',
    FONTS: SOURCE_DIR + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
    IMG: SOURCE_DIR + 'img/**/*.{png,jpg,gif,svg}',
    MEDIA: SOURCE_DIR + ['media/**/*.*'],
  },

  BUILD: {
    APP_JS: BUILD_DIR + 'js/',
    HTML: BUILD_DIR,
    TEMPLATES: SOURCE_DIR + 'js/common/templates/',
    XML: BUILD_DIR,
    CSS: BUILD_DIR + 'css/',
    FONTS: BUILD_DIR + 'fonts/',
    IMG: BUILD_DIR + 'img/',
    MEDIA: BUILD_DIR + 'media/',
    SIZEREPORT: [
      BUILD_DIR + '/js/bundle.js',
      SOURCE_DIR + 'js/common/templates/templates.js',
      BUILD_DIR + '/css/main.css',
    ]
  }
}

// =================================================================================================================
// 
// COMMON
// 
// =================================================================================================================

/**
 * HTML COMMON
 */
gulp.task('html:common', () => {
  return gulp.src(PATH.SRC.HTML)
    .pipe(gulp.dest(PATH.BUILD.HTML))
});

const watchHTML = () => {
  gulp.watch(PATH.SRC.HTML, gulp.series('html:common'));
}

/**
 * TEMPLATES DEV
 */
gulp.task('templates:common', () => {
  return gulp.src(PATH.SRC.TEMPLATES)
    .pipe(template({
        templateSettings : {
            variable : 'data'
        }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(PATH.BUILD.TEMPLATES));
});

const watchTEMPLATES = () => {
  gulp.watch(PATH.SRC.TEMPLATES, gulp.series('templates:common'));
}

/**
 * XML CONFIG 
 */
gulp.task('xml:common', () => {
  return gulp.src(PATH.SRC.XML)
    .pipe(gulp.dest(CONFIG_DIR))
});

const watchXML = () => {
  gulp.watch(PATH.SRC.XML, gulp.series('xml:common'));
}

/**
 * FONTS COMMON
 */
gulp.task('fonts:common', () => {
  return gulp.src(PATH.SRC.FONTS)
    .pipe(gulp.dest(PATH.BUILD.FONTS))
});

const watchFONTS = () => {
  gulp.watch(PATH.SRC.FONTS, gulp.series('fonts:common'));
}

/**
 * MEDIA COMMON
 */
gulp.task('media:common', () => {
  return gulp.src(PATH.SRC.MEDIA)
    .pipe(gulp.dest(PATH.BUILD.MEDIA))
});

const watchMEDIA = () => {
  gulp.watch(PATH.SRC.MEDIA, gulp.series('media:common'));
}

/**
 * IMG COMMON
 */
gulp.task('img:common', () => {
  return gulp.src(PATH.SRC.IMG)
    .pipe(newer(PATH.BUILD.IMG))
    .pipe(imagemin())
    .pipe(gulp.dest(PATH.BUILD.IMG))
});

const watchIMG = () => {
  gulp.watch(PATH.SRC.IMG, gulp.series('img:common'));
}

/**
 * CLEAN BUILD
 */
gulp.task('clean:build', () => {
  return del([
    BUILD_DIR,
  ]);
});

/**
 * SIZEREPORT COMMON
 */
gulp.task('sizereport:common', function () {
  return gulp.src(PATH.BUILD.SIZEREPORT)
    .pipe(sizereport({
        gzip: true
    }));
});


// =================================================================================================================
// 
// DEVELOPER
// 
// =================================================================================================================

/**
 * STYLES DEV
 */
gulp.task('styles:dev', () => {
  return gulp.src(PATH.SRC.SASS)
    .pipe(sass({ sourceComments: true }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(csscomb())
    .pipe(gulp.dest(PATH.BUILD.CSS))
});

const watchStylesDev = () => {
  gulp.watch(PATH.SRC.SASS, gulp.series('styles:dev', 'sizereport:common'));
}

/**
 * JS BUNDLE DEV
 */
gulp.task('js:dev', function() {
  return browserify(PATH.SRC.APP_JS)
    .transform('babelify', { presets: ["es2015"] })
    .bundle().on('error', log)
    .pipe(source('bundle.js'))
    .pipe(duration('----------- Babel time -----------'))
    .pipe(gulp.dest(PATH.BUILD.APP_JS));
});

function log(error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------".bold.red.underline,
    ("[" + error.name + "]").red.bold.inverse,
    error.message,
    "----------ERROR MESSAGE END----------".bold.red.underline,
    ''
  ].join('\n'));
  this.emit('end');
}

const watchJsDev = () => {
  gulp.watch(PATH.SRC.ALL_JS, gulp.series('js:dev', 'sizereport:common'));
}

/**
 * WATCH DEV
 */
gulp.task('watch:dev', () => {
  watchHTML();
  watchXML();
  watchFONTS();
  watchIMG();
  watchMEDIA();
  watchTEMPLATES();

  watchJsDev();
  watchStylesDev();
});

// DEV
gulp.task('dev', 
  gulp.series('clean:build', 
    gulp.parallel(
      'templates:common',
      'js:dev', 
      'media:common', 
      'html:common', 
      'xml:common', 
      'styles:dev', 
      'fonts:common', 
      'img:common'
      ),
    'sizereport:common', 'watch:dev'));


// =================================================================================================================
// 
// PRODUCTION
// 
// =================================================================================================================

/**
 * STYLES PROD
 */
gulp.task('styles:prod', () => {
  return gulp.src(PATH.SRC.SASS)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(PATH.BUILD.CSS))
});

/**
 * JS BUNDLE PROD
 */
gulp.task('js:prod', function() {
  return browserify(PATH.SRC.APP_JS)
    .transform('babelify', { presets: ["es2015"] })
    .bundle().on('error', log)
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(PATH.BUILD.APP_JS));
});

const watchJsProd = () => {
  gulp.watch(PATH.SRC.ALL_JS, gulp.series('js:prod', 'sizereport:common'));
}

/**
 * WATCH PROD
 */
gulp.task('watch:prod', () => {
  watchHTML();
  watchXML();
  watchFONTS();
  watchIMG();
  watchMEDIA();
  watchTEMPLATES();

  watchJsProd()
  watchStylesProd();
});

const watchStylesProd = () => {
  gulp.watch(PATH.SRC.SASS, gulp.series('styles:prod', 'sizereport:common'));
}

// PROD
gulp.task('prod', 
  gulp.series('clean:build', 
    gulp.parallel(
      'templates:common',
      'js:prod', 
      'media:common', 
      'html:common', 
      'xml:common', 
      'styles:prod', 
      'fonts:common', 
      'img:common'
      ),
    'sizereport:common', 'watch:prod'));