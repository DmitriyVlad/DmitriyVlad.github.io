const util = require('gulp-util');

const production = util.env.production || util.env.prod || false;
const destPath = 'build';

const config = {
  env: 'development',
  production,

  src: {
    root: 'src',
    templates: 'src/templates',
    templatesData: 'src/templates/data',
    pagelist: 'src/index.yaml',
    sass: 'src/styles',
    // path for sass files that will be generated automatically via some of tasks
    sassGen: 'src/styles/generated',
    js: 'src/js',
    img: 'src/img',
    svg: 'src/img/svg',
    icons: 'src/icons',
    // path to png sources for sprite:png task
    iconsPng: 'src/icons',
    // path to svg sources for sprite:svg task
    iconsSvg: 'src/icons',
    // path to svg sources for iconfont task
    iconsFont: 'src/icons',
    fonts: 'src/fonts',
    lib: 'src/lib'
  },
  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/assets/css`,
    js: `${destPath}/assets/js`,
    img: `${destPath}/assets/img`,
    fonts: `${destPath}/assets/fonts`,
    lib: `${destPath}/assets/lib`
  },

  setEnv(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv() {
    util.log('Environment:', util.colors.white.bgRed(` ${process.env.NODE_ENV} `));
  },

  errorHandler: require('./utils/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
