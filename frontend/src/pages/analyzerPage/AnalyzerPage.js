import { useState } from "react";
import SwitchMonthComponent from "../../components/switchComponent/SwitchMonthComponent";
import SummaryComponent from "../../components/summaryComponent/SummaryComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";

const AnalyzerPage = ({ months }) => {
  const currentDate = new Date();
  const [month, setMonth] = useState(0);

  return (
    <>
      <SwitchMonthComponent
        month={month}
        setMonth={setMonth}
        months={months}
        currentDate={currentDate}
      />
      <SummaryComponent />
      <SeparatorComponent />
    </>
  );
};

export default AnalyzerPage;
