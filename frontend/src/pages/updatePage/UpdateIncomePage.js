import React, { useEffect, useState } from "react";
import "./updatePage.scss";
import UpdateIncomeComponent from "../../components/updateComponent/UpdateIncomeComponent";
import IncomeService from "../../services/incomeService";

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
    <div className="d-flex justify-content-center">
      <div className="m-3 set-width">
        <UpdateIncomeComponent incomes={incomes} />
      </div>
    </div>
  );
};

export default UpdateIncomePage;
