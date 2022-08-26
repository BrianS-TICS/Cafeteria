const {src, dest, watch, series} = require('gulp');

//CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// IMAGENES
const imagemin = require('gulp-imagemin');


function css(done){
    // Compila sass
    src('src/scss/app.scss')
        // Compilar
        // OutputStyle te permite comprimir los elementos compilados (minifica)
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer() ] ) )
        // Guardar
        .pipe( dest('build/css') )
    // Termina la ejecucion de la funcion
        done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel : 3 }) )    
        .pipe(dest('build/img'))
        
}

function dev(){
    // Watch queda a la escucha de una archivo y una funcion
    // Siempre dejar al final en la ejecucucion
    watch('src/scss/**/*.scss', css); // ** = Todas las carpetas | * = Todos los archivos 
    watch('src/img/**/*', imagenes);
}

exports.css = css; 
exports.imagenes = imagenes;
exports.dev = dev;
exports.default = series(imagenes,css, dev);
// Series : Inicia las tareas una a una - (Inicia una, termina y sigue la siguiente)
// Parallel - Todas inician al mismo tiempo