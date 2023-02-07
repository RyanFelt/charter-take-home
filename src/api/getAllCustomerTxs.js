const txDataDump = [
  {
    customerId: 1,
    txId: 1,
    purchaseAmtUSD: 100,
    date: "2022-01-01",
  },
  {
    customerId: 2,
    txId: 2,
    purchaseAmtUSD: 20,
    date: "2022-01-01",
  },
  {
    customerId: 1,
    txId: 3,
    purchaseAmtUSD: 350,
    date: "2022-02-02",
  },
  {
    customerId: 2,
    txId: 4,
    purchaseAmtUSD: 273.56,
    date: "2022-02-02",
  },
  {
    customerId: 3,
    txId: 5,
    purchaseAmtUSD: 132.15,
    date: "2022-02-02",
  },
  {
    customerId: 1,
    txId: 6,
    purchaseAmtUSD: 72.29,
    date: "2022-03-03",
  },
  {
    customerId: 2,
    txId: 7,
    purchaseAmtUSD: 51.34,
    date: "2022-03-03",
  },
  {
    customerId: 4,
    txId: 8,
    purchaseAmtUSD: 25,
    date: "2022-03-03",
  },
];

// Simulates a async downstream api call, will return between 0 - 5000 ms
const getAllCustomerTxs = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(txDataDump);
    }, Math.floor(Math.random() * 5000));
  });

export default getAllCustomerTxs;
