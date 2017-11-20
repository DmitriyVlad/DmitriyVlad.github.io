const formatFileSize = (size) => {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size > 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(1)} KB`;
  } else if (size > 1048576) {
    return `${(size / 1048576).toFixed(1)} MB`;
  }

  return size;
};

const MAX_SIZE = 10485760; // 10 MB in bytes
const errorMessages = {
  invalidType: 'You can upload only csv files, please select again',
  sizeExceeded: `Selected file size exceeds max limit in ${formatFileSize(MAX_SIZE)}`,
  fileReader: 'FileReader are not supported in this browser',
  invalidDataType: 'Invalid data type: first column must be string, second - number',
  fileNotSelected: 'You must select a file',
  invalidStructure: 'Invalid file structure: CSV file must contain only two columns'
};

const validateFileType = type => fileType => fileType === type;
const isCSV = validateFileType('csv');

const isNumeric = number => !isNaN(parseFloat(number)) && isFinite(number);
const isString = string => typeof string === 'string' && !Number(string);

const validateSize = size => size <= MAX_SIZE;

const validator = {
  isCSV,
  validateSize,
  isNumeric,
  isString
};

export { validator, errorMessages };
