import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

const Onboarding = () => {
  const [page, setPage] = useState(1);

  const nextStep = () => {
    setPage((page) => page + 1);
  };
  const previousStep = () => {
    setPage((page) => page - 1);
  };

  return (
    <div>
      {page === 1 && <Step1 nextStep={nextStep} />}
      {page === 2 && <Step2 nextStep={nextStep} previousStep={previousStep} />}
      {page === 3 && <Step3 nextStep={nextStep} previousStep={previousStep} />}
      {page === 4 && <Step4 previousStep={previousStep} />}
      {/* {page === 5 && <Step5 nextStep={nextStep} previousStep={previousStep} />}
      {page === 6 && <Step6 nextStep={nextStep} previousStep={previousStep} />} */}
    </div>
  );
};

export default Onboarding;
