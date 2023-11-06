import React, { useEffect, useState } from "react";
import UpdateIncomeComponent from "../../components/updateComponents/UpdateIncomeComponent";
import IncomeService from "../../services/incomeService";
import SimplePage from "../simplePage/SimplePage";

const UpdateIncomePage = () => {
  const [incomes, setIncomes] = useState([]);

  const getIncomes = async () => {
    const response = await IncomeService.getIncomes();

    setIncomes(response.data);
  };

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <SimplePage>
      <UpdateIncomeComponent incomes={incomes} />
    </SimplePage>
  );
};

export default UpdateIncomePage;
