
var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    connect     = require('gulp-connect'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    minifyCSS   = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    del         = require('del'),
    bs          = require('browser-sync').create(),
    reload      = bs.reload,
    historyApiFallback = require('connect-history-api-fallback');


/*****************************************************************************
 CONFIGURATIONS
 ******************************************************************************/

var srcDir = 'src/',
    buildDir = 'dist/';

var sassOptions = {
    outputStyle: 'compressed'
};

var config = {
    jsPlugins: {
        src: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-filter/dist/angular-filter.min.js',
            'bower_components/respond/dest/respond.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-touch/angular-touch.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/ngstorage/ngStorage.min.js',
            'bower_components/blockUI/jquery.blockUI.js',
            'bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
            'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js',
            'bower_components/jcrop/js/jquery.Jcrop.js',
            'bower_components/oclazyload/dist/ocLazyLoad.min.js',
            'bower_components/jquery-validation/dist/jquery.validate.min.js',
            'bower_components/jquery-validation/dist/additional-methods.min.js',
            'bower_components/angularUtils-pagination/dirPagination.js',
            'bower_components/angular-bootstrap/ui-bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/ng-tags-input/ng-tags-input.js',
            'bower_components/angular-xeditable/dist/js/xeditable.js',
            'bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
            'bower_components/ui-select/dist/select.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-moment/angular-moment.min.js',
            srcDir+'js/metronic.js',
            srcDir+'js/layout.js',
            srcDir+'js/classie.js',
            srcDir+'js/components-form-tools.js',
            srcDir+'js/handlebars.min.js',
            srcDir+'js/spinner.min.js',
            srcDir+'js/form-validation.js',
            srcDir+'js/components-pickers.js'
        ],
        build: buildDir+'js'
    },
    js: {
        src: [
            srcDir+'app/app.js',
            srcDir+'app/controllers/*.js',
            srcDir+'app/controllers/**/*.js',
            srcDir+'app/routes/routes.js',
            srcDir+'app/directives/*.js',
            srcDir+'app/services/*.js'
        ],
        build: buildDir+'js'
    },
    cssPlugins: {
        src: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css',
            'bower_components/simple-line-icons/css/simple-line-icons.css',
            'bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
            'bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
            'bower_components/ng-tags-input/ng-tags-input.css',
            'bower_components/angular-xeditable/dist/css/xeditable.css',
            'bower_components/ui-select/dist/select.css'
        ],
        build: buildDir+'css',
        output: 'plugins.css',
        css: srcDir+'css'
    },
    css: {
        src: [
            srcDir+'css/components-rounded.css',
            srcDir+'css/select2.css',
            srcDir+'css/selectize.default.css',
            srcDir+'css/layout.css',
            srcDir+'css/profile.css',
            srcDir+'css/darkblue.css',
            srcDir+'css/login.css',
            srcDir+'css/error.css',
            srcDir+'css/custom.css',
            srcDir+'css/style.css'
        ],
        build: buildDir+'css',
        output: 'tradelab.css',
        css: srcDir+'css'
    },
    fonts: {
        src: [
            'bower_components/bootstrap/dist/fonts/*.*',
            'bower_components/font-awesome/fonts/*.*',
            'bower_components/simple-line-icons/fonts/*.*'
        ],
        build: buildDir+'fonts'
    },
    templates: {
        src: srcDir+'templates/**/**/*.*',
        build: buildDir+'templates'
    },
    images: {
        src: srcDir+'images/**/*.*',
        build: buildDir+'images'
    },
    config: {
        src: srcDir+'config/*.*',
        build: buildDir+'config'
    },
    index: {
        src: [
            srcDir+'index.html',
            srcDir+'.htaccess',
            srcDir+'sw.js'
        ],
        build: buildDir
    },
    browserSync: {
        baseDir: buildDir,
        files: [
            buildDir + 'app/**/**/*.*',
            buildDir + 'templates/**/**/*.*',
            buildDir + 'js/*.*',
            buildDir + 'css/*.*'
        ],
        ignore: [
            'public/lib',
            'public/app',
            'public/js/**/*.min.js'
        ],
        open: true,
        port: 3000,
        reloadDelay: 1000
    }
};


/*********************************************************************************************************
 TASKS
 ********************************************************************************************************/

//Copy Config directory contents
gulp.task('config', function () {
    return gulp.src(config.config.src)
        .pipe(gulp.dest(config.config.build));
});

//Concatenate all js plugins
gulp.task('jsPlugins', function () {
    return gulp.src(config.jsPlugins.src)
    //.pipe(sourcemaps.init())
    //.pipe(strip())
        .pipe(concat('plugins.js'))
        //only uglify if gulp is ran with '--type production'
        /*.pipe(gutil.env.type === 'production' ? uglify().on('error', function (err) {
         console.log(err.message);
         }) : gutil.noop())*/
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.jsPlugins.build));
});



//Concatenate all Angular App Files
gulp.task('js', function () {
    return gulp.src(config.js.src)
    // .pipe(sourcemaps.init())
    //     .pipe(strip())
        .pipe(concat('app.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify().on('error', function (err) {
            console.log(err.message);
        }) : gutil.noop())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.js.build));
});


// Concatenate all CSS Plugins ----> plugin.js
gulp.task('cssPlugins', function () {
    return gulp
        .src(config.cssPlugins.src)
        //.pipe(sourcemaps.init())
        //.pipe(sass( sassOptions ).on('error', sass.logError))
        // .pipe(sourcemaps.write())
        // .pipe(sass())
        .pipe(concat(config.cssPlugins.output))
        .pipe(gulp.dest(config.cssPlugins.css))
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.cssPlugins.build));
});


// Concatenate all CSS Files -----> mojojo.css
gulp.task('css', function () {
    return gulp
        .src(config.css.src)
        //.pipe(sourcemaps.init())
        //.pipe(sass( sassOptions ).on('error', sass.logError))
        // .pipe(sourcemaps.write())
        // .pipe(sass())
        .pipe(concat(config.css.output))
        .pipe(gulp.dest(config.css.css))
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.css.build));
});


//Copy all Fonts
gulp.task('fonts', function () {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.build));
});


//Copy all images
gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.build));
});

//Copy all templates
gulp.task('templates', function () {
    return gulp.src(config.templates.src)
        .pipe(gulp.dest(config.templates.build));
});

//Copy Index.html and .htaccess
gulp.task('index', function () {
    return gulp.src(config.index.src)
        .pipe(htmlreplace({
            'js': 'js/app.js'
        }).on('error', function (err) {
            console.log(err.message);
        }))
        .pipe(gulp.dest(config.index.build));
});

gulp.task('cleanCssPlugins',['cssPlugins'], function () {
    return del([
        srcDir+'css' +'/'+ config.cssPlugins.output
    ]);
});

gulp.task('cleanCss',['css'], function () {
    return del([
        srcDir+'css' +'/'+ config.css.output
    ]);
});

gulp.task('serve', function() {
    bs.init({
        ui: { port: 8000 },
        port: config.browserSync.port,
        server: {
            baseDir: buildDir,
            middleware: [ historyApiFallback() ]
        },
        reloadDelay: config.browserSync.reloadDelay

    });
});

gulp.task('reload', function () {
    reload();
});



// WATCH TASK
gulp.task('watch', function () {
    gulp.watch(config.config.src, ['config', 'reload']);
    gulp.watch(config.jsPlugins.src, ['jsPlugins', 'reload']);
    gulp.watch(config.js.src, ['js', 'reload']);
    gulp.watch(config.cssPlugins.src, ['cleanCssPlugins', 'reload']);
    gulp.watch(config.css.src, ['cleanCss', 'reload']);
    gulp.watch(config.fonts.src, ['fonts', 'reload']);
    gulp.watch(config.images.src, ['images', 'reload']);
    gulp.watch(config.templates.src, ['templates', 'reload']);
    gulp.watch(config.index.src, ['index', 'reload']);
});


/*********************************************************************************************************
 DEFAULT TASK
 ********************************************************************************************************/
gutil.log('STARTING PRODUCTION BUILD');

gulp.task('default', [
    'config', //Copies Config directory contents
    'jsPlugins', //copies all js plugins
    'js', //Concatenates all angular components
    'cleanCssPlugins', //Concatenates all CSS plugins
    'cleanCss', // concatenates all custom CSS
    'fonts', //copy fonts
    'images', //copy images
    'templates', //copy templates
    'index', //Copy index.html and .htaccess
    'serve',
    'watch'
]);