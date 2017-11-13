import { validator, errorMessages } from './scripts/validator';
import { getSum, getAverageValue, getFileExtension } from './scripts/helpers';
import { createElement, showError, clearError } from './scripts/dom';

const form = document.getElementById('upload_form');
const inputFile = document.getElementById('incomes_upload');
const errorElem = document.getElementsByClassName('form__error')[0];
const tableView = document.getElementsByClassName(
  'table-editor__table-view'
)[0];
let selectedFile;

const aggregations = {
  sum: {
    name: 'Sum:',
    value: null
  },
  average: {
    name: 'Average:',
    value: null
  }
};

function renderAggregations() {
  const table = document.getElementsByClassName('table')[0];
  const tbody = table.getElementsByClassName('table__body')[0];
  const td = Array.from(tbody.querySelectorAll('td:last-child'));
  const tfoot = createElement('tfoot', { className: 'table__foot' });
  const numValues = td.map(elem => +elem.children[0].value);

  aggregations.sum.value = getSum(numValues);
  aggregations.average.value = getAverageValue(numValues);
  const aggregationsArr = Object.keys(aggregations);

  for (let i = 0; i < aggregationsArr.length; i += 1) {
    const tdFirst = createElement(
      'td',
      { className: 'table__col table__col--foot' },
      aggregations[aggregationsArr[i]].name
    );
    const tdSecond = createElement(
      'td',
      { className: 'table__col table__col--foot' },
      aggregations[aggregationsArr[i]].value
    );

    const row = createElement(
      'tr',
      {
        className: 'table__row table__row--foot'
      },
      tdFirst,
      tdSecond
    );

    tfoot.appendChild(row);
  }

  if (table.querySelector('.table__foot')) {
    table.querySelector('.table__foot').remove();
  }

  table.appendChild(tfoot);
}

function createEditableCell(innerValue, index) {
  const input = createElement('input', {
    type: 'text',
    className: 'table__input',
    value: innerValue,
    readOnly: true
  });
  input.ondblclick = function(event) {
    const { value } = this;
    this.readOnly = false;
    this.setAttribute('data-old-value', value);
  };
  input.onblur = function(event) {
    this.readOnly = true;
    const { target: { value: currentValue } } = event;
    const oldValue = this.getAttribute('data-old-value');

    if (index === 0 && validator.isString(currentValue)) {
      this.value = currentValue;
    } else if (index === 1 && validator.isNumeric(currentValue)) {
      this.value = currentValue;
    } else {
      this.value = oldValue;
    }

    if (this.value !== oldValue) {
      renderAggregations(aggregations);
    }
  };
  const td = createElement('td', { className: 'table__col' }, input);

  return td;
}

function renderTable(csvText) {
  const values = [];
  const csvRows = csvText.split(/\r?\n|\r/);

  const thead = createElement('thead', { className: 'table__head' });
  const tbody = createElement('tbody', { className: 'table__body' });
  const table = createElement('table', {
    className: 'table table-editor__table'
  });

  for (let i = 0; i < csvRows.length; i += 1) {
    const row = createElement('tr', {
      className: 'table__row'
    });

    if (i === 0) {
      row.className += ' table__row--head';
    }

    const cells = csvRows[i].split(',');

    for (let j = 0; j < cells.length; j += 1) {
      if (i === 0) {
        if (!validator.isString(cells[j])) {
          showError(errorMessages.invalidDataType, errorElem);

          return;
        }

        const th = createElement(
          'th',
          { className: 'table__col table__col--head' },
          cells[j]
        );
        row.appendChild(th);
      } else {
        if (j === 0 && !validator.isString(cells[j])) {
          showError(errorMessages.invalidDataType, errorElem);

          return;
        }

        if (j === 1 && !validator.isNumeric(cells[j])) {
          showError(errorMessages.invalidDataType, errorElem);

          return;
        } else if (j === 1) {
          values.push(cells[j]);
        }

        const td = createEditableCell(cells[j], j);
        row.appendChild(td);
      }
    }

    if (i === 0) {
      thead.appendChild(row);
    } else {
      tbody.appendChild(row);
    }
  }

  const numValues = values.map(value => +value);
  aggregations.sum.value = getSum(numValues);
  aggregations.average.value = getAverageValue(numValues);

  tableView.innerHTML = '';
  table.appendChild(thead);
  table.appendChild(tbody);
  tableView.appendChild(table);
  renderAggregations(aggregations);
}

function fileLoadHandler(event) {
  const resultCSV = event.target.result;

  renderTable(resultCSV);
}

function getAsText(file) {
  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = fileLoadHandler;
}

function handleFile(event) {
  event.preventDefault();
  clearError(errorElem);
  tableView.innerHTML = '';

  if (inputFile.files.length === 0) {
    showError('You must select a file.', errorElem);

    return;
  }

  [selectedFile] = inputFile.files;
  const isValidType = validator.isCSV(getFileExtension(selectedFile.name));

  if (!isValidType) {
    showError(errorMessages.invalidType, errorElem);

    return;
  }

  if (!validator.validateSize(selectedFile.size)) {
    showError(errorMessages.sizeExceeded, errorElem);

    return;
  }

  if (!window.FileReader) {
    showError(errorMessages.fileReader, errorElem);

    return;
  }

  getAsText(selectedFile);
}

inputFile.addEventListener('change', handleFile);
form.addEventListener('submit', handleFile);
