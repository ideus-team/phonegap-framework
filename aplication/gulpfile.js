'use strict';
const gulp          = require('gulp');

const imagemin      = require('gulp-imagemin');

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
const duration      = require('gulp-duration')


/**
 * PATH FILES
 */
const BUILD_DIR = 'public/www/';
const SOURCE_DIR = 'src/';
const CONFIG_DIR = 'public/';

const PATH = {
  SRC: {
    APP_JS: SOURCE_DIR + 'js/bundle.js',
    HTML: SOURCE_DIR + '**/*.html',
    XML: SOURCE_DIR + '**/*.xml',
    SASS: SOURCE_DIR + 'sass/**/*.scss',
    FONTS: SOURCE_DIR + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
    IMG: SOURCE_DIR + 'img/**/*.{png,jpg,gif,svg}',
  },

  BUILD: {
    APP_JS: BUILD_DIR + 'js/',
    HTML: BUILD_DIR,
    XML: BUILD_DIR,
    CSS: BUILD_DIR + 'css/',
    FONTS: BUILD_DIR + 'fonts/',
    IMG: BUILD_DIR + 'img/',
    SIZEREPORT: [
      BUILD_DIR + '/js/bundle.js', 
      BUILD_DIR + '/css/main.css'
    ]
  }
}

// =================================================================================================================
// COMMON
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
 * IMG COMMON
 */
gulp.task('img:common', () => {
  return gulp.src(PATH.SRC.IMG)
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
// DEVELOPER
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
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(duration('----------- Babel time -----------'))
    .pipe(gulp.dest(PATH.BUILD.APP_JS));
});

const watchJsDev = () => {
  gulp.watch(PATH.SRC.APP_JS, gulp.series('js:dev', 'sizereport:common'));
}

/**
 * WATCH DEV
 */
gulp.task('watch:dev', () => {
  watchHTML();
  watchXML();
  watchFONTS();
  watchIMG();

  watchJsDev();
  watchStylesDev();
});

// DEV
gulp.task('dev', gulp.series('clean:build', gulp.parallel('js:dev', 'html:common', 'xml:common', 'styles:dev', 'fonts:common', 'img:common'), 'sizereport:common', 'watch:dev'));


// =================================================================================================================
// PRODUCTION
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
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(PATH.BUILD.APP_JS));
});

const watchJsProd = () => {
  gulp.watch(PATH.SRC.APP_JS, gulp.series('js:prod', 'sizereport:common'));
}

/**
 * WATCH PROD
 */
gulp.task('watch:prod', () => {
  watchHTML();
  watchXML();
  watchFONTS();
  watchIMG();

  watchJsProd()
  watchStylesProd();
});

const watchStylesProd = () => {
  gulp.watch(PATH.SRC.SASS, gulp.series('styles:prod', 'sizereport:common'));
}

// PROD
gulp.task('prod', gulp.series('clean:build', gulp.parallel('js:prod', 'html:common', 'xml:common', 'styles:prod', 'fonts:common', 'img:common'), 'sizereport:common', 'watch:prod'));