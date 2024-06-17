import { Button } from "antd";
import { useState } from "react";
import { db} from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../../context/authContext";
import design1 from "../../assets/design1.svg";
import design2 from "../../assets/design2.svg";
import design3 from "../../assets/design3.svg";

const Step1 = ({ nextStep }) => {
  const [addcs, setAddcs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();

  const addictions = [
    { name: "Alcohol" },
    { name: "Cocaine" },
    { name: "Tobacco" },
    { name: "Pain reliever" },
    { name: "Methamphetamine" },
    { name: "Marijuana" },
    { name: "Heroine" },
    { name: "Others" },
  ];

  const handleClick = (interest) => {
    if (addcs.includes(interest)) {
      setAddcs(addcs.filter((item) => item !== interest));
    } else {
      setAddcs([...addcs, interest]);
    }
  };
  const handleContinue = async () => {
    try {
      setLoading(true)
      await updateDoc(doc(db, "users", user?.uid), {
        substances:addcs
      });
      setLoading(false)
      nextStep()
    } catch (error) {
      console.log(error)
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
      <div className="px-5 flex items-center pt-12 flex-col md:px-24 lg:px-14 lg:pb-10 xl:px-20 2xl:px-32 2xl:pt-32 overflow-auto">
        <h1 className="text-[#615E5E] text-[17px] font-normal">
          Let’s take the first step together
        </h1>
        <p className="text-[30px] font-semibold text-center">
          What are you seeking to recover from?
        </p>
        <div className="flex flex-col gap-2">
          {addictions.map((addiction, index) => (
            <div
              className={`border-[1.5px] border-[#D9D9D9] rounded-md flex items-center justify-center cursor-pointer h-[40px] w-[50vh] xl:w-[400px] 2xl:w-[500px] ${
                addcs.includes(addiction.name)
                  ? "bg-[#1B49C1] text-white border-none"
                  : "bg-white text-black"
              }`}
              key={index}
              onClick={() => handleClick(addiction.name)}
            >
              <h1>{addiction.name}</h1>
            </div>
          ))}
        </div>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          onClick={handleContinue}
          className="bg-[#1945B7] py-6 w-full mt-5 rounded-full text-[16px]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Step1;
