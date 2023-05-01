import { useState } from "react";
import { SwitchMonthComponent } from "../../components/switchComponent/SwitchMonthComponent";

const AnalyzerPage = ({ months }) => {
  const currentDate = new Date();
  const [month, setMonth] = useState(0);

  return (
    <SwitchMonthComponent
      month={month}
      setMonth={setMonth}
      months={months}
      currentDate={currentDate}
    />
  );
};

export default AnalyzerPage;
