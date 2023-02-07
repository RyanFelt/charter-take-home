import { useState, useEffect } from "react";
import getAllCustomerTxs from "../api/getAllCustomerTxs";

const useGetAllCustomerTxs = () => {
  const [allCustomerTxs, setAllCustomerTxs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const logic = async () => {
    try {
      setLoading(true);
      const _allCustomerTxs = await getAllCustomerTxs();
      setAllCustomerTxs(_allCustomerTxs);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!allCustomerTxs.length && !loading) {
      logic();
    }
  }, []);

  return [allCustomerTxs, error, loading];
};

export default useGetAllCustomerTxs;
