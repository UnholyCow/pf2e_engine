// Initializing modules
const { src, dest } = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const htmlMin = require('gulp-htmlmin');
const cssMin = require('gulp-cssmin');
const autoPrefix = require('gulp-autoprefixer');
const jsMin = require('gulp-uglify');
// const imgMin = require('gulp-imagemin');
const clean = require('gulp-clean');

// File paths
const files = {
	css: 'css/*.css',
	fonts: 'fonts/*',
	js: 'js/*.js',
	html: './*.html',
	img: 'img/*',
	scss: 'scss/*.scss'
}

function css() {
	return src(files.scss)
		.pipe(scss())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
		open: false,
		server: {
			baseDir: './',
			index: '/index.html',
		}
	});
	gulp.watch(files.scss, css);
	gulp.watch(files.html).on('change', browserSync.reload);
	gulp.watch(files.js).on('change', browserSync.reload);
}

function del() {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
}

function buildHtml() {
	return src(files.html)
		.pipe(htmlMin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
}

function buildCss() {
	return src(files.css)
		.pipe(autoPrefix())
		.pipe(cssMin())
		.pipe(gulp.dest('dist/css'));
}

function buildJs() {
	return src(files.js)
		.pipe(jsMin())
		.pipe(gulp.dest('dist/js'));
}

// function buildImg() {
// 	return src(files.img)
// 		.pipe(imgMin())
// 		.pipe(gulp.dest('dist/img'));
// }

function buildFonts() {
	return src(files.fonts)
		.pipe(gulp.dest('dist/fonts'));
}

exports.default = watch;
exports.build = gulp.series(del, buildHtml, buildCss, buildJs, /* buildImg, */ buildFonts);