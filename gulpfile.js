const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done){
    // Compila sass
    src('src/scss/app.scss')
        // Compilar
        // OutputStyle te permite comprimir los elementos compilados (minifica)
        .pipe( sass() )
        .pipe( postcss( [autoprefixer()] ) )
        // Guardar
        .pipe( dest('build/css') )
    // Termina la ejecucion de la funcion
    done();
}

function dev(){
    // Watch queda a la escucha de una archivo y una funcion
    // Siempre dejar al final en la ejecucucion
    watch('src/scss/**/*.scss',css); // ** = Todas las carpetas | * = Todos los archivos 
}

exports.css = css; 
exports.dev = dev;
exports.default = series(css, dev);
// Series : Inicia las tareas una a una - (Inicia una, termina y sigue la siguiente)
// Parallel - Todas inician al mismo tiempo