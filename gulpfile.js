const { src, dest, watch, parallel, series } = require('gulp');

const browserSync = require('browser-sync').create();
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');


function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowsersList: ['last 10 versions']
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
};

function scripts() {
  return src('app/js/script.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
};

function libsJs() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
    'node_modules/mixitup/dist/mixitup.min.js',
    'node_modules/select2/dist/js/select2.min.js',
    'node_modules/nouislider/dist/nouislider.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/libs'))
    .pipe(browserSync.stream())
};

function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
};

function build() {
  return src([
    'app/*.html',
    'app/css/style.min.css',
    'app/js/script.min.js',
    'app/js/libs/*.js',
    'app/fonts/**/*'
  ], { base: 'app' })
    .pipe(dest('dist'))
};

function cleanDist() {
  return del('dist', { force: true })
};

function watchFiles() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
  });

  watch('app/*.html').on('change', browserSync.reload);
  watch('app/scss/**/*.scss', styles);
  watch(['app/js/**/*.js', '!app/js/script.min.js'], scripts);
};

exports.styles = styles;
exports.scripts = scripts;
exports.libsJs = libsJs;
exports.images = images;
exports.watchFiles = watchFiles;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, styles, scripts, libsJs, images, build);
exports.default = parallel(styles, libsJs, scripts, watchFiles);