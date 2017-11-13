const notify = require('gulp-notify');

// eslint-disable-next-line
module.exports = function(...args) {
  notify
    .onError({
      title: 'Compile Error',
      message: '<%= error.message %>',
      sound: 'Submarine'
    })
    .apply(this, args);
  this.emit('end');
};
