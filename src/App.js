import { useMemo } from "react";
import useGetAllCustomerTxs from "./hooks/useGetAllCustomerTxs";
import CustomerPurchaseRewardsDataTable from "./components/CustomerPurchaseRewardsDataTable";
import "./App.css";

/**
  A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

  A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction.

  (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

  Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

    · Use React JS (do not use TypeScript)

    · Simulate an asynchronous API call to fetch data

    · Make up a data set to best demonstrate your solution

    · Check solution into GitHub
 */

const calculateRewardPoints = (usdAmt) => {
  if (usdAmt < 50) {
    return 0;
  } else if (usdAmt > 100) {
    return (parseInt(usdAmt) - 100) * 2 + 50;
  }
  return parseInt(usdAmt) - 50;
};

function App() {
  const [allCustomerTxs, allCustomerTxsError, allCustomerTxsIsLoading] =
    useGetAllCustomerTxs();

  // tableData data structure: {customerId: {month: total}}
  const tableData = useMemo(
    () =>
      allCustomerTxs.reduce((customerTxMap, customerTx) => {
        // create customer property if it does not already exist
        if (!customerTxMap[customerTx.customerId]) {
          customerTxMap[customerTx.customerId] = {};
        }

        const customerRecord = customerTxMap[customerTx.customerId];
        const month = customerTx.date.split("-")[1];

        // create month property on customer if it does not already exist, if it does exist add points
        if (!customerRecord[month]) {
          customerRecord[month] = calculateRewardPoints(
            customerTx.purchaseAmtUSD
          );
        } else {
          customerRecord[month] += calculateRewardPoints(
            customerTx.purchaseAmtUSD
          );
        }

        return customerTxMap;
      }, {}),
    [allCustomerTxs]
  );

  return (
    <div className="App">
      <h1>Customer Rewards Month Over Month</h1>

      {allCustomerTxsError ? (
        <div>`Error fetching data :: ${allCustomerTxsError}`</div>
      ) : (
        <>
          {allCustomerTxsIsLoading ? (
            <div>Loading...</div>
          ) : (
            <CustomerPurchaseRewardsDataTable
              data={tableData}
              months={["01", "02", "03"]} // This is assuming we know the 3 month period which we should as we would prob be using this data when we call the backend
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
