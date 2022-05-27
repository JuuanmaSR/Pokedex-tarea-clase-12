/* eslint-disable indent */

const {
    src, dest, series, parallel, watch,
} = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');

const outputCss = './dist/css';
const outputJs = './dist/js';
const isDevelopment = process.env.NODE_ENV === 'development';

function limpiarCss() {
    return src(`${outputCss}/*.css`)
        .pipe(clean());
}

function limpiarJs() {
    return src(`${outputJs}/*.js`)
        .pipe(clean());
}

function copiarCss() {
    return src('./src/css/**/*.css')
        .pipe(dest(outputCss));
}

function copiarJs() {
    return src('./src/**/*.js')
        .pipe(dest(outputJs));
}

function minificarCss() {
    return src('./src/css/**/*.css')
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest(outputCss));
}

function minificarJs() {
    return src('./src/**/*.js')
        .pipe(uglify({
            mangle: true,
        }))
        .pipe(dest(outputJs));
}

function copiarHtml() {
    return src('index.html')
        .pipe(dest('./dist'));
}
function iniciarServidor() {
    return src('dist')
        .pipe(webserver({
            livereload: true,
            open: false,
        }));
}

const correrTareasCss = series([limpiarCss, minificarCss]);
const correrTareasJs = series([limpiarJs, minificarJs]);

const correrTareasCssDev = series([limpiarCss, copiarCss]);
const correrTareasJsDev = series([limpiarJs, copiarJs]);

const tareasDev = series(
    [parallel(
        [correrTareasJsDev, correrTareasCssDev, copiarHtml],
    ), iniciarServidor],
);
const tareasProd = series(
    [parallel(
        [correrTareasJs, correrTareasCss, copiarHtml],
    ), iniciarServidor],
);

watch(['./src/**/*.js'], isDevelopment ? correrTareasJsDev : correrTareasJs);
watch(['./src/css/*.css'], isDevelopment ? correrTareasCssDev : correrTareasCss);
watch(['index.html'], copiarHtml);

exports.default = isDevelopment ? tareasDev : tareasProd;
