const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const htmlmin = require('gulp-htmlmin');

const browserSync = require("browser-sync").create();

const sass = require('gulp-sass'); // модуль для компиляции SASS (SCSS) в CSS
const imagemin = require('gulp-imagemin'); // плагин для сжатия PNG, JPEG, GIF и SVG изображений
const jpegrecompress = require('imagemin-jpeg-recompress'); // плагин для сжатия jpeg
const pngquant = require('imagemin-pngquant'); // плагин для сжатия png
const plumber = require('gulp-plumber'); // модуль для отслеживания ошибок
const rigger = require('gulp-rigger'); // модуль для импорта содержимого одного файла в другой
const uglify = require('gulp-uglify'); // модуль для минимизации JavaScript
const cache = require('gulp-cache'); // модуль для кэширования
const rimraf = require('gulp-rimraf'); // плагин для удаления файлов и каталогов


// +++++++++++++++//
// BUILD FOR DEV //
// +++++++++++++++//

// No real reason to minify into the dev build but it gets the files there without adding gulp-copy as another dep

function minifyHtml() {
  return gulp.src('src/*.html')
    .pipe(plumber()) // отслеживание ошибок
    .pipe(rigger()) // импорт вложений
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'));
}

// This unpacks the styles.css file into a master CSS containing all the tailwind classes and any custom CSS added to the sheet

function css() {

  const plugins = [
    tailwindcss(),
    autoprefixer({ overrideBrowserslist: ['last 4 version'] }),
    cssnano(),
    // purgecss({
    //   content: ['build/*.html'],
    //   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    // }),

  ];
  return gulp.src('src/css/styles.scss')
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(sass()) // scss -> css
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/css/'));
}

function tailwindCss() {

  const plugins = [
    tailwindcss(),
    cssnano(),
    // purgecss({
    //   content: ['src/**/*.html'],
    //   defaultExtractor: content => content.match(/[\w-/:#.]+(?<!:)/g) || []
    // }),
  ];
  return gulp.src('src/css/tailwind.scss')
    .pipe(sass()) // scss -> css
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/css/'));
}


function cssLibs() {

  const plugins = [
    autoprefixer({ overrideBrowserslist: ['last 2 version'] }),
    cssnano(),
  ];

  return gulp.src('src/css/libs.scss')
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(sass()) // scss -> css
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/css/'));
}

// +++++++++++++++//
// BUILD FOR PROD //
// +++++++++++++++//



function Js() {
  return gulp.src('src/js/main.js') // получим файл main.js
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указанные файлы в main.js
    .pipe(uglify()) // минимизируем js
    .pipe(gulp.dest('build/js/'));
}

function libsJs() {
  return gulp.src('src/js/libs.js') // получим файл main.js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указанные файлы в main.js
    .pipe(uglify()) // минимизируем js
    .pipe(gulp.dest('build/js/'));
}

function fonts() {
  return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts/'));
}

function images() {
  return gulp.src('src/img/**/*.*') // путь с исходниками картинок
    .pipe(cache(imagemin([ // сжатие изображений
      imagemin.gifsicle({ interlaced: true }),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] })
    ])))
    .pipe(gulp.dest('build/img/')); // выгрузка готовых файлов
}

function watch_files() {
  gulp.watch('src/css/styles.scss', gulp.series(css, reload));
  gulp.watch('src/css/libs.scss', gulp.series(cssLibs, reload));
  gulp.watch('src/css/libs.scss', gulp.series(tailwindCss, reload));
  gulp.watch('src/**/*.html', gulp.series(minifyHtml, reload));
  gulp.watch('src/js/main.js', gulp.series(Js, reload));
  gulp.watch('src/js/libs.js', gulp.series(libsJs, reload));
  gulp.watch('src/fonts/**/*.*', gulp.series(fonts, reload));
  gulp.watch('src/img/**/*.*', gulp.series(images, reload));
}

// SERVE //

function serve() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
}

function delBuild() {
  return gulp.src('build/*', { read: false })
    .pipe(rimraf());
}

function reload(done) {
  browserSync.reload();
  done();
}

// сборка
gulp.task('build',
  gulp.series(delBuild,
    gulp.parallel(minifyHtml, css, cssLibs, tailwindCss, Js, libsJs, fonts, images)
  )
);

// задача по умолчанию
gulp.task('default', gulp.series(
  'build',
  gulp.parallel(serve, watch_files)
));


