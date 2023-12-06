export const createData = (id, name, type, email, currency, deposit) => {
  return { id, name, type, email, currency, deposit };
};

export const createDetail = (id, name, type, amtIn, amtOut) => {
  return { id, name, type, amtIn, amtOut, balance: amtIn - amtOut };
};

export const nextId = (rows) => {
  return Math.max(...rows.map((row) => row['id'])) + 1;
};
