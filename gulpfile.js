var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require("gulp-minify-html"),
	jshint = require("gulp-jshint"),
	concat = require("gulp-concat"),
	less = require("gulp-less"),
	sass = require("gulp-sass"),
	imagemin = require('gulp-imagemin'),
	assetRev = require('gulp-asset-rev'),
	clean = require('gulp-clean');
//	var pngquant = require('imagemin-pngquant'); //png图片压缩插件

//清除文件
gulp.task('clean', function () {
  return gulp.src('dist/js', {read: ture})
    .pipe(clean());
});

//js文件压缩	
gulp.task('minify-js',['clean-scripts'], function() {
	gulp.src('src/js/*.js') //要压缩的js文件
		.pipe(uglify()) //使用uglify进行压缩,更多配置请参考：
		.pipe(gulp.dest('dist/js')); //压缩后的路径
});
gulp.task('clean-scripts', function () {
  return gulp.src('dist/js/*.js', {read: false})
    .pipe(clean());
});

//css文件压缩
gulp.task('minify-css', function() {
	gulp.src('src/css/*.css')
		.pipe(assetRev())
		.pipe(minifyCss())
		.pipe(gulp.dest('dist/css'));
});

//html文件压缩
gulp.task('minify-html', function() {
	gulp.src('src/html/*.html')
	 	.pipe(assetRev())
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist/html'));
});

//js代码检查
gulp.task('jsLint', function() {
	gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter()); // 输出检查结果
});

//文件合并
gulp.task('concat', function() {
	gulp.src('src/js/*.js') //要合并的文件
		.pipe(concat('all.js')) // 合并匹配到的js文件并命名为 "all.js"
		.pipe(gulp.dest('dist/js'));
});

// less的编译
gulp.task('compile-less', function() {
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css'));
});
// sass的编译
gulp.task('compile-sass', function() {
	gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function() {
	gulp.src('src/images/*')
		.pipe(imagemin({
			progressive: true,
//			use: [pngquant()] //使用pngquant来压缩png图片
		}))
		.pipe(gulp.dest('dist/images'));
});

//根据文件的变化添加版本号；
gulp.task('rev',['revCss'],function() {
    gulp.src("src/html/test.html")
        .pipe(assetRev())
        .pipe(gulp.dest('dist/html/'));
});
 
gulp.task('revCss',function () {
    gulp.src('src/css/test.css')
        .pipe(assetRev())
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('watch', function() {
  gulp.watch('src/less/*', ['compile-less']);
});

//执行任务
gulp.task('default', ['minify-js', 'minify-css', 'minify-html', 'jsLint', 'concat', 'compile-less', 'compile-sass','imagemin']);

