const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');

// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'))
}

exports.html = html;

//Styles
const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
}

exports.styles = styles;

//Clean
const clean = () => {
  return del("build");
}

exports.clean = clean;

//Copy
const copyImages = () => {
  return gulp.src("source/images/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/images"))
}

exports.copyImages = copyImages;

const copyScripts = () => {
  return gulp.src("source/scripts/*.js")
    .pipe(gulp.dest("build/scripts"))
}

exports.copyScripts = copyScripts

//Server
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
  done();
}

exports.server = server;

//Reload
const reload = (done) => {
  browserSync.reload();
  done();
}

//Watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/scripts/script.js", gulp.series(copyScripts, reload));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

exports.watcher = watcher;

//Start
exports.default = gulp.series(
  clean,
  copyImages,
  copyScripts,
  gulp.parallel(
    html,
    styles,
  ),
  gulp.series(
    server, watcher
));
