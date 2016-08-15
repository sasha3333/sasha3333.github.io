var gulp = require('gulp'),
sass = require('gulp-sass'),
concat      = require('gulp-concat'), 
uglify      = require('gulp-uglifyjs'),
// cssnano     = require('gulp-cssnano'),
// rename      = require('gulp-rename'),
del         = require('del'),
imagemin    = require('gulp-imagemin'), 
pngquant    = require('imagemin-pngquant'),
cache       = require('gulp-cache');

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
});

gulp.task('styles', function() {
	return gulp.src(['app/css/normalize.css', 'app/css/main.css'])
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

/*gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});*/

gulp.task('watch', ['sass', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/css/*.css', ['styles']);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') 
	.pipe(cache(imagemin({  
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([
		'app/css/styles.css',
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
	return cache.clearAll();
})

gulp.task('default', ['watch']);