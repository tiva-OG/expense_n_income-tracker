import React from 'react';
import DataTable from './DataTable';
import { createData } from './utils/data';

const data = [
  createData(0, 'allowee', 'joe', 'salary', 40_000, '28/10/2023', 'income'),
  createData(1, 'sandra', 'peter', 'transfer', 3_000, '13/11/2023', 'income'),
  createData(2, 'james', 'aliyah', 'debt', 600, '19/11/2023', 'income'),
  createData(3, 'first bank', 'sandra', 'salary', 45_000, '29/11/2023', 'income'),
  createData(4, 'access', 'peter', 'bank loan', 8_000, '29/11/2023', 'income'),
  createData(5, 'sandra', 'aliyah', 'transfer', 700, '10/11/2023', 'income'),
];

export default function IncomeTable() {
  return <DataTable id='incomeTable' data={data} type='income' />;
}
