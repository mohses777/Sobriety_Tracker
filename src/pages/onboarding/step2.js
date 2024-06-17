import { Button } from "antd";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../../context/authContext";
import design1 from "../../assets/design1.svg";
import design2 from "../../assets/design2.svg";
import design3 from "../../assets/design3.svg";
import back from "../../assets/back.svg";

const Step2 = ({ nextStep, previousStep }) => {
  const [recovery, setRecovery] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();
  const recoveryModes = [
    { name: "Sober day counting" },
    { name: "Daily devotionals" },
    { name: "Words of affirmation" },
    { name: "Journaling" },
    { name: "Something else" },
  ];
  const handleClick = (interest) => {
    if (recovery.includes(interest)) {
      setRecovery(recovery.filter((item) => item !== interest));
    } else {
      setRecovery([...recovery, interest]);
    }
  };
  const handleContinue = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "users", user?.uid), {
        inspiry: recovery,
      });
      setLoading(false);
      nextStep();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid w-full h-screen lg:grid-cols-2 lg:gap-0">
      <div className="bg-[#1945B7] hidden lg:block h-screen overflow-hidden">
        <div className="h-[33.33%] flex justify-between">
          <img src={design1} alt="" />
        </div>
        <div className="h-[auto] pl-4 pb-2 2xl:pl-7">
          <h1 className="text-white text-start text-[30px] font-semibold leading-[35px] 2xl:text-[45px] 2xl:leading-[50px]">
            Empowering your journey to recovery one step at a time
          </h1>
          <p className="text-white text-start text-[15px] font-normal pt-3 2xl:text-[20px]">
            Transforming Lives with Every Step Forward: Dedicated to Helping You
            Overcome Addiction, Reclaim Your Joy, and Embrace a Life Full of New
            Beginnings and Endless Possibilities.
          </p>
        </div>
        <div className="h-[33.33%] w-full flex justify-between">
          <img
            src={design2}
            alt=""
            className="object-cover fixed bottom-0"
          />
          <img
            src={design3}
            alt=""
            className="object-cover fixed bottom-0 left-[35%]"
          />
        </div>
      </div>
      <div className="px-3 pt-3 lg:pb-10 overflow-auto">
        <div className="w-full cursor-pointer" onClick={() => previousStep()}>
          <img src={back} alt="" />
        </div>
        <div className="flex items-center pt-3 flex-col md:px-24 lg:px-14 xl:px-20 2xl:px-32 ">
          <h1 className="text-[#615E5E] text-[17px] font-normal">
            Help us help you
          </h1>
          <p className="text-[30px] font-semibold text-center">
            What inspires your path to recovery?
          </p>
          <div className="flex flex-wrap gap-4 w-full pt-7 pl-[0%] xl:pl-[7%]">
            {recoveryModes.map((rec, index) => (
              <div
                key={index}
                onClick={() => handleClick(rec.name)}
                className={`border-[1.5px] border-[#D9D9D9] rounded-xl flex items-center justify-center cursor-pointer py-6 px-5 xl:py-8 xl:px-6 2xl:py-10 2xl:px-10 ${
                  recovery.includes(rec.name)
                    ? "bg-[#7CCAF6] text-white border-none"
                    : "bg-white text-black"
                }`}
              >
                <h1>{rec.name}</h1>
              </div>
            ))}
          </div>
          <Button
            onClick={handleContinue}
            type="primary"
            loading={loading}
            htmlType="submit"
            className="bg-[#1945B7] py-6 w-full mt-5 rounded-full text-[16px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
