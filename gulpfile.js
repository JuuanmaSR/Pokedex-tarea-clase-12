/* eslint-disable indent */

const {
    src, dest, series, parallel, watch,
} = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const noop = require('gulp-noop');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const outputCss = './dist/assets/css';
const output = './dist/js';
const isDevelopment = process.env.NODE_ENV === 'development';

function limpiarCss() {
    return src(`${outputCss}/*.css`)
        .pipe(clean());
}

function limpiarJs() {
    return src(`${output}/*.js`)
        .pipe(clean());
}

function copiarCss() {
    return src('./src/assets/css/**/*.css')
        .pipe(dest(outputCss));
}

function copiarJs() {
    return src('src/**/*.js')
        .pipe(dest(output));
}

function minificarCss() {
    return src('./src/assets/css/**/*.css')
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest(outputCss));
}

function compilarTs() {
    return src('./src/**/*.ts')
        .pipe(tsProject()).js
        .pipe(!isDevelopment ? uglify({
            mangle: true,
        }) : noop())
        .pipe(dest(output));
}

function minificarJs() {
    return src('src/**/*.js')
        .pipe(uglify({
            mangle: true,
        }))
        .pipe(dest(output));
}

function copiarHtml() {
    return src('index.html')
        .pipe(dest('./dist'));
}

function copiarImagenes() {
    return src('./src/public/images/*')
        .pipe(dest('./dist/public/images'));
}

function iniciarServidor() {
    return src('./dist')
        .pipe(webserver({
            livereload: true,
            open: false,
        }));
}

const correrTareasCss = series([limpiarCss, minificarCss]);
const correrTareasJs = series([limpiarJs, minificarJs]);

const correrTareasTs = series([compilarTs])

const correrTareasCssDev = series([limpiarCss, copiarCss]);
const correrTareasJsDev = series([limpiarJs, copiarJs]);

const tareasDev = series(
    [parallel(
        [correrTareasCssDev, correrTareasTs, correrTareasJsDev, copiarImagenes, copiarHtml],
    ), iniciarServidor],
);
const tareasProd = series(
    [parallel(
        [correrTareasCss, correrTareasTs, correrTareasJs, copiarImagenes, copiarHtml],
    ), iniciarServidor],
);

watch(['./src/**/*.js'], isDevelopment ? correrTareasJsDev : correrTareasJs);
watch(['./src/assets/css/*.css'], isDevelopment ? correrTareasCssDev : correrTareasCss);
watch(['./src/**/*.ts'], correrTareasTs);
watch(['./src/public/images/*'], copiarImagenes);
watch(['index.html'], copiarHtml);

exports.default = isDevelopment ? tareasDev : tareasProd;