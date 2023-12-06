import moment from 'moment/moment';

export const string2Date = (str) => {
  return str ? moment(str, 'DD-MM-YYYY') : moment();
};

export const date2Display = (str) => {
  return string2Date(str).format('ddd, Do MMM, YYYY');
};
