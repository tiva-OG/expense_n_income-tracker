function descendingComparator(a, b, orderBy) {
  if (orderBy === 'in' || orderBy === 'out') {
    const column = orderBy === 'in' ? 'amtIn' : 'amtOut';
    if (b[column] < a[column]) return -1;
    if (b[column] > a[column]) return 1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilized.map((el) => el[0]);
}
