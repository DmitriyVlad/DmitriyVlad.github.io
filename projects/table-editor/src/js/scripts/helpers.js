export function getSum(arr) {
  return arr.reduce((a, b) => a + b);
}

export function getAverageValue(arr) {
  return Math.round(getSum(arr) / arr.length);
}

export function getFileExtension(fileName) {
  return fileName.split('.').pop();
}
