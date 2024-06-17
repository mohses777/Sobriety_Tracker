import { Button, ConfigProvider, TimePicker } from "antd";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../../context/authContext";
import design1 from "../../assets/design1.svg";
import design2 from "../../assets/design2.svg";
import design3 from "../../assets/design3.svg";
import back from "../../assets/back.svg";
import { useNavigate } from "react-router-dom";

const Step4 = ({previousStep }) => {
  const [pledgeTime, setPledgeTime] = useState(null);
  const [reviewTime, setReviewTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate()

  const handlePledge = (time) => {
    if (time) {
      setPledgeTime(time);
    }
  };

  const handleReview = (time) => {
    if (time) {
      setReviewTime(time);
    }
  };

  const handleContinue = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "users", user?.uid), {
        pledgeTime: pledgeTime ? pledgeTime.format("HH:mm") : null,
        reviewTime: reviewTime ? reviewTime.format("HH:mm") : null,
      });
      setLoading(false);
      navigate("/")
    } catch (error) {
      console.log(error);
      setLoading(false);
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
        <div className="flex items-center pt-3 flex-col md:px-24 lg:px-14 xl:px-20 2xl:px-32">
          <h1 className="text-[#615E5E] text-[17px] font-normal">
            Let’s take the first step together
          </h1>
          <p className="text-[30px] font-semibold text-center">
            Confirm your daily pledge and review times
          </p>
          <div className="mt-[20%] flex items-center justify-between border-b-[1px] border-black w-full">
            <h1 className="text-[17px] font-normal mb-1">Daily pledge</h1>

            <ConfigProvider
              theme={{
                token: {
                  fontSize: 15,
                  colorText: "#199DE7",
                },
                components: {
                  DatePicker: {
                    inputFontSize: 17,
                  },
                },
              }}
            >
              <TimePicker
                use12Hours
                format="h:mm a"
                onChange={handlePledge}
                variant="borderless"
              />
            </ConfigProvider>
          </div>
          <div className="mt-5 flex items-center justify-between border-b-[1px] border-black w-full">
            <h1 className="text-[17px] font-normal mb-1">Daily review</h1>

            <ConfigProvider
              theme={{
                token: {
                  fontSize: 15,
                  colorText: "#199DE7",
                },
                components: {
                  DatePicker: {
                    inputFontSize: 17,
                  },
                },
              }}
            >
              <TimePicker
                use12Hours
                format="h:mm a"
                onChange={handleReview}
                variant="borderless"
              />
            </ConfigProvider>
          </div>
          <div className="px-3 md:px-24 lg:px-14 xl:px-20 2xl:px-32 fixed bottom-6 w-[100%] lg:w-[50%]">
            <Button
              loading={loading}
              onClick={handleContinue}
              htmlType="submit"
              type="primary"
              className="bg-[#1945B7] py-6 w-full rounded-full text-[16px]"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
