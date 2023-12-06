import moment from 'moment/moment';

export const equalRange = (a, b) => {
  return a[0] === b[0] && a[1] === b[1];
};

export const getMax = (data, field) => {
  return Math.max(...data.map((row) => row[field])) + 1000;
};

export const getMin = (data, field) => {
  return Math.min(...data.map((row) => row[field]));
};

export const preventDefault = (event) => {
  event.preventDefault();
};
