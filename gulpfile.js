const gulp = require('gulp') //导入gulp

const cssmin = require('gulp-cssmin') //导入css压缩包
const autoprefixer = require('gulp-autoprefixer') //导入css文件自动添加后缀的方法包

const uglify = require('gulp-uglify') //导入js压缩包（es5）
const babel = require('gulp-babel') //导入把es6语法转换成es5语法的方法包

const htmlmin = require('gulp-htmlmin') //导入html压缩包

const del = require('del') //导入删除文件的方法

const webserver = require('gulp-webserver') //配置服务器的方法

const sass = require('gulp-sass')//导入sass

// 书写打包css的方法
const cssHandler = () => {
    return gulp.src('./src/css/*.css') //找到路径下所有后缀为.css的文件
        .pipe(autoprefixer()) //自动添加前缀  -webkit等  
        .pipe(cssmin()) //压缩css代码（去掉空格和回车）
        .pipe(gulp.dest('./dist/css')) //压缩好的代码放入dist下面的css文件夹里面（也可以指定文件名）
}

// 书写打包js的方法
const jsHandler = () => {
    return gulp.src('./src/js/*.js') //找到源码下所有的后缀为.js文件
        .pipe(babel({
            presets: ['@babel/env']
        })) //把es6的语法转换成es5，再进行压缩
        .pipe(uglify()) //压缩js代码
        .pipe(gulp.dest('./dist/js')) //压缩好的js代码放入文件夹

}

// 书写html打包方法
const htmlHandler = () => {
    return gulp.src('./src/pages/*.html') // 找到要压缩的 html 文件
        .pipe(htmlmin({ // 想进行压缩, 需要在这个对象里面进行配置
            removeAttributeQuotes: true, // 移出属性上的双引号
            removeComments: true, // 移除注释
            collapseBooleanAttributes: true, // 把值为布尔值的属性简写
            collapseWhitespace: true, // 移除所有空格, 变成一行代码
            minifyCSS: true, // 把页面里面的 style 标签里面的 css 样式也去空格
            minifyJS: true, // 把页面里面的 script 标签里面的 js 代码给去空格
        })) // 压缩
        .pipe(gulp.dest('./dist/pages')) // 把压缩完毕的放到一个指定目录
}

// 移动images文件夹方法
const imgHandler = () => {
    return gulp.src('./src/images/**') //两个星号表示文件夹下的所有文件
        .pipe(gulp.dest('./dist/images')) //放到指定的目录下
}

// 移动lib文件的方法
const libHandler =()=>{
    return gulp.src("./src/lib/**")
    .pipe(gulp.dest('./dist/lib'))
}

// 删除dist目录的方法（每次整体打包前，先删除dist，然后用最新的src重新生成一遍任务）
const delHandler = () => {
    return del(['./dist'])
}

// 配置服务器的方法
// 在开发的时候，把代码直接在服务器上打开，这里是使用node开启一个服务器
// 自动刷新：当dist目录里面的代码改变后，会自动刷新浏览器
const serverHandler = () => {
    return gulp.src('./dist') //把dist文件夹当做网页根目录
        .pipe(webserver({ //配置服务器
            host: 'localhost', //域名  可以自定义
            port: 8080, //端口号
            open: './pages/index.html', //默认打开的首页
            livereload: true, //自动刷新浏览器（热重启）
            proxies: [ //每一个代理配置都是一个对象
                {
                    source: '/yyl', //代理标识符
                    target: 'http://127.0.0.1/test.php' //要代理的地址
                },
            ]
        })) //开启服务器
}
const sassHandler=()=>{
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/sass'))
}

// 自动监听文件，监听src下面的代码，一旦修改，就执行对应的任务
const watchHandler = () => {
    // 监控着 src 下的 css 下的所有 .css 文件, 只要一发生变化, 就会自动执行一遍 cssHandler 任务
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/lib/**',libHandler)
    gulp.watch('./src/images/**', imgHandler)
    gulp.watch('./src/sass/*.scss',sassHandler)
}



module.exports.default = gulp.series(
    delHandler, //先删除，在执行
    gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler,libHandler),
    serverHandler,
    watchHandler
)

