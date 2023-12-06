import { date2Display } from './date';

const expenseCategories = [
  { name: 'food', class: 'blue' },
  { name: 'clothing', class: 'orange' },
  { name: 'misc', class: 'purple' },
  { name: 'utility', class: 'green' },
];

const incomeCategories = [
  { name: 'debt', class: 'blue' },
  { name: 'salary', class: 'orange' },
  { name: 'transfer', class: 'green' },
  { name: 'bank loan', class: 'red' },
];

export const nextId = (rows) => {
  return Math.max(...rows.map((row) => row['id'])) + 1;
};

export const createData = (id, name, account, category, amount, date, type = 'expense') => {
  // you may want to add a color selector for category later on

  const categories = type === 'expense' ? expenseCategories : incomeCategories;
  const itemCategory = categories.find((item) => item.name === category);
  return {
    id,
    name,
    account,
    category: itemCategory ? itemCategory : { name: category, class: 'primary' },
    amount,
    date: date2Display(date),
  };
};
