import React from 'react';
import DataTable from './DataTable';
import { createData } from './utils/data';

const data = [
  createData(0, 'eggs', 'sandra', 'food', 2000, '02/11/2023'),
  createData(1, 't-shirt', 'peter', 'clothing', 3500, '07/11/2023'),
  createData(2, 'notebook', 'aliyah', 'misc', 200, '30/10/2023'),
  createData(3, 'electricity', 'joe', 'utility', 7000, '27/10/2023'),
  createData(4, 'eggs', 'sandra', 'food', 2000, '12/11/2023'),
  createData(5, 't-shirt', 'peter', 'clothing', 3500, '07/11/2023'),
  createData(6, 'notebook', 'aliyah', 'misc', 200, '30/10/2023'),
  createData(7, 'electricity', 'joe', 'utility', 7000, '27/10/2023'),
  createData(8, 'eggs', 'sandra', 'food', 2000, '12/11/2023'),
  createData(9, 't-shirt', 'peter', 'clothing', 3500, '07/11/2023'),
  createData(10, 'notebook', 'aliyah', 'misc', 200, '30/10/2023'),
  createData(11, 'electricity', 'joe', 'utility', 7000, '27/10/2023'),
  createData(12, 'eggs', 'sandra', 'food', 2000, '12/11/2023'),
  createData(13, 't-shirt', 'peter', 'clothing', 3500, '07/11/2023'),
  createData(14, 'notebook', 'aliyah', 'misc', 200, '30/10/2023'),
  createData(15, 'electricity', 'joe', 'utility', 7000, '27/10/2023'),
  createData(16, 'eggs', 'sandra', 'food', 2000, '12/11/2023'),
  createData(17, 't-shirt', 'peter', 'clothing', 3500, '07/11/2023'),
  createData(18, 'notebook', 'aliyah', 'misc', 200, '30/10/2023'),
  createData(19, 'electricity', 'joe', 'utility', 7000, '27/10/2023'),
  createData(20, 'eggs', 'sandra', 'food', 2000, '12/11/2023'),
  createData(21, 't-shirt', 'peter', 'clothing', 3500, '07/11/2023'),
  createData(22, 'notebook', 'aliyah', 'misc', 200, '30/10/2023'),
  createData(23, 'electricity', 'joe', 'utility', 7000, '01/10/2023'),
];

export default function ExpenseTable() {
  return <DataTable id='expenseTable' data={data} type='expense' />;
}
