var gulp = require('gulp');

var pug = require('gulp-pug');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

const config = require('./config/prod.conf.json');

var bases = {
 src: 'src/',
 dist: 'dist/',
};

var paths = {
 scripts: ['js/**/*.js', '!js/vendors/**/*.js'],
 vendors: ['js/vendors/**/*.js'],
 styles: ['css/**/*'],
 html: ['index.html', '404.html'],
 pug: ['views/index.pug'],
 images: ['images/**/*.png', 'images/**/*.jpg'],
 svg: ['images/**/*.svg'],
 extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};

gulp.task('clean', function() {
 return gulp.src(bases.dist)
 .pipe(clean());
});

gulp.task('scripts', ['clean'], function() {
 return gulp.src(paths.scripts, {cwd: bases.src})
 .pipe(uglify())
 .pipe(concat('main.min.js'))
 .pipe(gulp.dest(bases.dist + 'js/'));
});

gulp.task('imagemin', ['clean'], function() {
 return gulp.src(paths.images, {cwd: bases.src})
 .pipe(imagemin({verbose: true}))
 .pipe(gulp.dest(bases.dist + 'images/'));
});

gulp.task('copy-image', ['clean'], function() {
 // Copy images during development
 return gulp.src(paths.images, {cwd: bases.src})
 .pipe(gulp.dest(bases.dist + 'images'));
});

gulp.task('copy', ['clean'], function() {

 gulp.src(paths.styles, {cwd: bases.src})
 .pipe(gulp.dest(bases.dist + 'css'));

 gulp.src(paths.svg, {cwd: bases.src})
 .pipe(gulp.dest(bases.dist + 'images'));

 gulp.src(paths.vendors, {cwd: 'src/**'})
 .pipe(gulp.dest(bases.dist));

 gulp.src(paths.extras, {cwd: bases.src})
 .pipe(gulp.dest(bases.dist));
});

gulp.task('pug', ['clean'], function() {
  return gulp.src(paths.pug, {cwd: bases.src})
    .pipe(pug({
      pretty: true,
      data: { 
        google: config.google,
        firebase: config.firebase
      }
    }))
    .pipe(gulp.dest(bases.dist));
});

// Build task for production
gulp.task('build', ['clean', 'scripts', 'imagemin', 'pug', 'copy']);

// Build task for dev
gulp.task('build.dev', ['clean', 'scripts', 'copy-image', 'pug', 'copy']);

// Watch task
// Builds project then watches for changes. Images are not optmized
gulp.task('watch', ['build.dev'], function() {
 gulp.watch('src/**/*', ['scripts', 'copy-image', 'pug', 'copy']);
});

// Default task calls build
gulp.task('default', ['build']);