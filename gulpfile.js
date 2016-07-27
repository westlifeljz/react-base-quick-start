/**
 * Created by luojianzong on 16/7/7.
 */
var gulp = require('gulp');
var gulpUtil = require("gulp-util");
var less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    htmlReplace = require("gulp-html-replace"),
    strReplace = require("gulp-replace");
var spriter = require('gulp-css-spriter');
var rename = require("gulp-rename");


// it will add version for image, if the gulp use the gulp-css-spriter, this plugin will display error;
var cssver = require('gulp-make-css-url-version');

var webpack = require("webpack");
var devServer = require("./server");
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var api = require("./apiUrlConfig.js");


var timestamp = +new Date();





var env = process.argv[2];

var envPath = {
    dev: "dev",
    prod : "prod",
    stg1: "stg1"
};

env = envPath[process.argv[2]];


var pcProdConfig = require("./webpack.config.pc.js")(timestamp, env);
var mobileProdConfig = require("./webpack.config.mobile.js")(timestamp, env);
var padProdConfig = require("./webpack.config.pad.js")(timestamp, env);

gulp.task ("strReplace", function() {
    //less(api[key]);

    gulp.src("src/**/**/*.html")
        .pipe(strReplace("<%=globalApi=%>", JSON.stringify(api.dev)) )
        .pipe(gulp.dest("dist/" + env + "/"));
} );

gulp.task('spriter', function () {
    gulp.src(['src/style/**/*.less', '!src/**/{reset,test}.less'])
        .pipe(spriter ({
            spriteSheet: './dist/'+ env +'/images/sprite'+ timestamp + '.png',
            pathToSpriteSheetFromCSS : './dist/' + env + '/images/sprite'+timestamp+'.png'
        }))
});

gulp.task('less', function () {
    gulp.src(['src/style/**/*.less', '!src/**/{reset,test}.less'])
        .pipe(spriter ({
            spriteSheet: './dist/' + env + '/img/sprite' + timestamp + '.png',
            pathToSpriteSheetFromCSS : './dist/' + env + '/images/sprite'+timestamp+'.png'
        }))
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/' + env + '/style/'))
});

gulp.task('watchLess', function () {
    gulp.watch('src/style/**/*.less', ['less']); //当所有less文件发生改变时，调用testLess任务
});

gulp.task("devServer", function (){
    devServer();
});

gulp.task ("htmlReplace", function() {
    //less(api[key]);

    gulp.src("src/**/**/*.html")
        .pipe(strReplace("<%=globalApi=%>", JSON.stringify(api.dev)) )
        .pipe(htmlReplace({
            'js': 'js/bundle.min.js'
        }))
        .pipe(gulp.dest("dist/" + env + "/"));
} );





gulp.task("prodWebpack", function(callback) {
    // run webpack
    webpack(prodConfig,
        function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gulpUtil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
});


gulp.task ("strReplaceProd", function() {
    gulp.src("src/**/**/*.html")
        .pipe(strReplace("<%=globalApi=%>", JSON.stringify(api.dev)) )
        .pipe(strReplace(/\/\w*.js/g, function (str) {
            var temp =str.split(".");
            return temp[0] + timestamp+ "." + temp[1];
        }))
        .pipe(strReplace(/\/\w*.css/g, function (str) {
            var temp =str.split(".");
            return temp[0] + timestamp+ "." + temp[1];
        }))
        .pipe(gulp.dest("dist/" + env + "/"));
} );

gulp.task('lessProd', function () {
    gulp.src(['src/style/**/*.less', '!src/**/{reset,test}.less'])
        .pipe(spriter ({
            spriteSheet: './dist/' + env + '/img/sprite' + timestamp + '.png',
            pathToSpriteSheetFromCSS : './dist/' + env + '/images/sprite'+timestamp+'.png'
        }))
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename(function (path) {
            console.log(path);
            path.basename += timestamp;
        }))
        .pipe(gulp.dest('./dist/' + env + '/style/'))
});

gulp.task("prodWebpackPC", function(callback) {
    // run webpack
    webpack(pcProdConfig,
        function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gulpUtil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
});

gulp.task("prodWebpackMobile", function(callback) {
    // run webpack
    webpack(mobileProdConfig,
        function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gulpUtil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
});

gulp.task("prodWebpackPad", function(callback) {
    // run webpack
    webpack(padProdConfig,
        function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gulpUtil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
});


// This task is used to compile "Develop environment"
gulp.task("dev", ["strReplace", "less", "watchLess", "devServer"], function() {

});


// It is used to compile to "Production environment"
gulp.task ("prod", ["strReplaceProd", "lessProd", "prodWebpackPC", "prodWebpackMobile", "prodWebpackPad"], function (callback){
    console.log("All job has been finished by Element Luo");
});