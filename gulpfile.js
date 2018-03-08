const gulp = require( 'gulp' );
const concat = require( 'gulp-concat' );
const connect = require( 'gulp-connect' );
const cssmin = require( 'gulp-cssmin' );
const del = require( 'del' );
const htmlmin = require( 'gulp-htmlmin' );
const htmlreplace = require( 'gulp-html-replace' );
const order = require( 'gulp-order' );
const path = require( 'path' );
const rename = require( 'gulp-rename' );
const task = require( 'gulp-task' );
const uglify = require( 'gulp-uglify' );

const paths = {
    source: {
        css: [ 'src/css/*.css' ],
        html: [ 'src/*.html' ],
        js: [ 'node_modules/lz-string/libs/base64-string.js', 'src/js/*.js' ]
    },
    develop: {
        css: 'css',
        html: 'dev',
        js: 'js'
    },
    production: {
        css: 'css',
        html: 'build',
        js: 'js'
    }
};

gulp.task( 'build', () => {
    let cssDestPath = path.join( paths.production.html, paths.production.css );
    let jsDestPath = path.join( paths.production.html, paths.production.js );
    let cssSrcPath = path.join( paths.develop.html, paths.develop.css );
    let jsSrcPath = path.join( paths.develop.html, paths.develop.js );
    del.sync( [ cssDestPath + '/*.css', paths.production.html + '/*.html', jsDestPath + '/*.js' ] );
    gulp.src( cssSrcPath + '/*.css' )
        .pipe( order( paths.source.css ) )
        .pipe( cssmin() )
        .pipe( concat( 'style.css' ) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( cssDestPath ) );
    gulp.src( jsSrcPath + '/*.js' )
        .pipe( order( paths.source.js ) )
        .pipe( concat( 'bundle.js' ) )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( jsDestPath ) );
    return gulp.src( paths.develop.html + '/*.html' )
        .pipe( htmlreplace( { 'css': paths.production.css + '/style.min.css', 'js': paths.production.js + '/bundle.min.js' } ) )
        .pipe( htmlmin( { removeComments: true } ) )
        .pipe( gulp.dest( paths.production.html ) );
} );

gulp.task( 'scripts', () => {
    let jsDestPath = path.join( paths.develop.html, paths.develop.js );
    del.sync( [ paths.source.js + '/*.js' ] );
    return gulp.src( paths.source.js )
        .pipe( gulp.dest( jsDestPath ) );
} );

gulp.task( 'styles', () => {
    let cssDestPath = path.join( paths.develop.html, paths.develop.css );
    del.sync( [ paths.source.css + '/*.css' ] );
    return gulp.src( paths.source.css )
        .pipe( gulp.dest( cssDestPath ) );
} );

gulp.task( 'views', () => {
    del.sync( [ paths.develop.html + '/*.html' ] );
    return gulp.src( paths.source.html )
        .pipe( order( paths.source.html ) )
        .pipe( concat( 'index.html' ) )
        .pipe( gulp.dest( paths.develop.html ) );
} );

gulp.task( 'server', () => {
    let pathRoot = process.argv[ 3 ].indexOf( 'production' ) >= 0 ? paths.production.html : paths.develop.html;
    connect.server( {
        root: pathRoot,
        port: 3000,
        livereload: true
    } );
} );

gulp.task( 'watch', () => {
    gulp.watch( paths.source.js, [ 'scripts' ] );
    gulp.watch( paths.source.css, [ 'styles' ] );
    gulp.watch( paths.source.html, [ 'views' ] );
} );

gulp.task( 'pre-production', [ 'build', 'server' ] );

gulp.task( 'default', [ 'watch', 'scripts', 'styles', 'views', 'server' ] );
