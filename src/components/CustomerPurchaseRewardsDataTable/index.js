import "./index.css";

/**
 *
 * @param data  {customerId: {month: total}}
 * @param months ["01, "02", "03"]
 * @returns Table
 */

const CustomerPurchaseRewardsDataTable = ({ data, months }) => {
  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr key="header">
            <th>CustomerId</th>
            {months.map((month) => (
              <th key={month}>{`Month ${month}`}</th>
            ))}
            <th>Total</th>
          </tr>

          {Object.keys(data).map((customerId) => {
            const customerRecord = data[customerId];
            let customerTotal = 0;
            return (
              <tr key={customerId}>
                <td>{customerId}</td>

                {months.map((month) => {
                  if (customerRecord[month]) {
                    customerTotal += customerRecord[month];
                  }
                  return (
                    <td key={`${customerId}-${month}`}>
                      {customerRecord[month] || "-"}
                    </td>
                  );
                })}

                <td>{customerTotal || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPurchaseRewardsDataTable;
