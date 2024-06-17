import { UserAuth } from "../../context/authContext";
import design5 from "../../assets/design5.svg";
import DynamicCarousel from "../../components/carousel";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import PulseLoader from "react-spinners/PulseLoader";
import TruncateText from "../../utils/truncate";
import {
  MdDashboard,
  MdOutlineFeedback,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { FiUserCheck, FiAlignLeft } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Button, Drawer } from "antd";
import PledgeModal from "../../components/pledgeModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProgressTracker = () => {
  const { user } = UserAuth();
  const [sobrietyData, setSobrietyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const today = new Date();
  const options = { month: "short", day: "numeric" };
  const formattedDate = today.toLocaleString("en-US", options);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Links = [
    { name: "Progress Tracker", link: "/", logo: <MdDashboard /> },
    { name: "Daily motivations", link: "/motivations", logo: <FiUserCheck /> },
    { name: "Resources", link: "/resources", logo: <MdOutlineLibraryBooks /> },
    { name: "Feedback", link: "/feedback", logo: <MdOutlineFeedback /> },
  ];

  // const notify = () => toast("");


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handlePledge = () => {
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();
    const currentMinute = currentDateTime.getMinutes();
    const [pledgeHour, pledgeMinute] = name.pledgeTime.split(":").map(Number);

    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const pledgeTimeInMinutes = pledgeHour * 60 + pledgeMinute;

    if( currentTimeInMinutes >= pledgeTimeInMinutes &&
      currentTimeInMinutes <= pledgeTimeInMinutes + 30){
      setIsModalOpen(true);
    }else{
    //toast.error("It's not yet time to make your pledge")
     setIsModalOpen(true);
    }
  };

  const getSobrietyData = async () => {
    const sobrietyRef = collection(db, "sobrietyData");
    const dataQuery = query(sobrietyRef, where("uid", "==", user?.uid));
    const querySnapshots = await getDocs(dataQuery);
    let data = [];
    querySnapshots.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setSobrietyData(data);
    setLoading(false);
  };

  const getUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", user?.uid));
      if (userDoc.exists()) {
        setName(userDoc.data());
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };


  useEffect(() => {
    getSobrietyData();
    getUserData();
    return () => {
      getSobrietyData();
      getUserData();
    };
  }, [sobrietyData]);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (loading) {
    return (
      <div
        className="spinner"
        style={{
          marginLeft: "5%",
        }}
      >
        <PulseLoader color={"#1945B7"} loading={loading} size={10} />
      </div>
    );
  }
  return (
    <div className="bg-[#F3FBFF] grid grid-cols-1 lg:grid-cols-6">
      <div
        className="col-span-4 h-screen flex flex-col md:w-full"
        style={{
          borderRight: "1px solid black",
        }}
      >
        <div
          className="bg-white h-[60px] flex items-center px-5 w-full md:hidden"
          onClick={showDrawer}
        >
          <FiAlignLeft className="md:hidden text-[30px]" />
        </div>
        <div className="px-5 md:px-10 pt-5 md:pt-10">
          <div className="flex items-center w-full ">
            <h1 className="text-[18px] font-semibold">Welcome back</h1>
            {screenWidth >= 768 ? (
              <>
                <h1 className="text-[18px] font-normal ml-2">
                  {TruncateText(`${name.fname} ${name.lname}`, 25)}
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-[18px] font-normal ml-2">
                  {TruncateText(`${name.fname} ${name.lname}`, 15)}
                </h1>
              </>
            )}
            <img src={design5} alt="" />
          </div>
          <DynamicCarousel data={sobrietyData} className={`w-[100%] mt-5`} />
        </div>
      </div>
      <div className="hidden pt-3 px-5 pb-6 lg:block lg:col-span-2 bg-[#F3FBFF] h-screen">
        <div className="bg-white rounded-[12px] w-full h-[40%] mb-3 px-4 py-3">
          <h1 className="text-[15px] font-semibold">Pledges</h1>
          <h1 className="text-[13px] font-normal mt-1">{`Today, ${formattedDate}`}</h1>
          <div className="mt-5 flex flex-col gap-4">
            <Button
            onClick={handlePledge}
              type="primary"
              className="bg-[#7340E1] w-full h-[45px] rounded-[10px] font-semibold text-[13px]"
            >
              Make Today’s Pledge
            </Button>
            <Button
              type="primary"
              className="bg-[#7CCAF6] w-full h-[45px] rounded-[10px] font-semibold text-[13px]"
            >
              Review Today
            </Button>
          </div>
        </div>
        <div className="bg-red-400 rounded-[12px] w-full h-[60%]"></div>
      </div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
        width={screenWidth <= 500 ? 300 : 378}
        // zIndex={100000000}
      >
        <div className="flex-col h-full relative pt-5">
          <div className="flex items-center">
            <h1 className="text-xl font-bold ml-3">SOBRIETY</h1>
          </div>
          <div className="flex flex-col items-start mt-6 h-auto w-full">
            {Links.map((link) => (
              <NavLink
                key={link.name}
                onClick={onClose}
                to={link.link}
                className="mb-1 py-3 w-full flex items-center"
              >
                <span>{link.logo}</span>
                <span className="text-sm font-normal mt-1 ml-3">
                  {link.name}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </Drawer>
      <PledgeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={sobrietyData}/>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ProgressTracker;
