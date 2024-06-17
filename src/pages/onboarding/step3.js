import { Button, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { addDoc, collection, doc, getDoc,updateDoc } from "firebase/firestore";
import { UserAuth } from "../../context/authContext";
import design1 from "../../assets/design1.svg";
import design2 from "../../assets/design2.svg";
import design3 from "../../assets/design3.svg";
import back from "../../assets/back.svg";
import { ClipLoader } from "react-spinners";

const Step3 = ({ nextStep, previousStep }) => {
  const [abuse,setAbuse] = useState([])
  const [loading, setLoading] = useState(false);
  const [get, setGetting] = useState(true);
  const [selectedDates, setSelectedDates] = useState(abuse.map(() => null));
  const { user } = UserAuth();

  const handleDateChange = (index, date) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      const sobrietyCollectionRef = collection(db, "sobrietyData");

      for (let i = 0; i < abuse.length; i++) {
        if (selectedDates[i]) {
          const timestamp = selectedDates[i].toDate();
          const docref = await addDoc(sobrietyCollectionRef, {
            substance: abuse[i],
            startDate: timestamp,
            lastPledgeDate: new Date(),
            uid: user?.uid,
          });
          await updateDoc(doc(db, "sobrietyData", docref.id), {
            id: docref.id,
          });
        }
      }
      setLoading(false);
      nextStep();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user?.uid));
        if (userDoc.exists()) {
          // setUserData(userDoc.data());
          setAbuse(userDoc.data().substances)
          setGetting(false)
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (user?.uid) {
      fetchUserData();
    }
  }, [user]);
  
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
            When did your journey begin?
          </h1>
          <p className="text-[30px] font-semibold text-center">
            Choose a sober date that has meaning to you
          </p>
          {get ? <>
          <ClipLoader size={20} color={"#1945B7"} loading={get} className="mt-5"/>
          </>:<><div className="w-full pt-5">
            {abuse.map((item, index) => (
              <div key={index} className="w-full mb-4">
                <h1>{item}</h1>
                <DatePicker
                  className="h-9 mb-2 w-full"
                  onChange={(date) => handleDateChange(index, date)}
                />
              </div>
            ))}
          </div></>}
          <div className="px-3 md:px-24 lg:px-14 xl:px-20 2xl:px-32 fixed bottom-6 w-[100%] lg:w-[50%]">
            <Button
              onClick={handleContinue}
              loading={loading}
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

export default Step3;
