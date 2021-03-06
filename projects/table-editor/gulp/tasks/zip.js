const gulp = require('gulp');
const zip = require('gulp-zip');
const plumber = require('gulp-plumber');
const config = require('../config');

const correctNumber = number => (number < 10 ? `0${number}` : number);

const getDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = correctNumber(now.getMonth() + 1);
  const day = correctNumber(now.getDate());
  const hours = correctNumber(now.getHours());
  const minutes = correctNumber(now.getMinutes());

  return `${year}-${month}-${day}-${hours}-${minutes}`;
};

gulp.task('zip', () => {
  const datetime = `-${getDateTime()}`;
  const zipName = `build${datetime}.zip`;

  gulp
    .src(['build/**/*', '!build/*.zip'])
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(zip(zipName))
    .pipe(gulp.dest('build'));
});
