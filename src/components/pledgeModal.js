import { Modal, ConfigProvider, Button } from "antd";
import { useState, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const PledgeModal = ({ isModalOpen, setIsModalOpen, data }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const today = new Date();
  const options = { month: "short", day: "numeric" };
  const formattedDate = today.toLocaleString("en-US", options);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  // const notify = () => toast("Pledge updated successfully");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCancel = () => {
    setSelected({});
    setIsModalOpen(false);
  };

  const handleOptionClick = (item, id) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [id]: item,
    }));
  };

  const handleConfirm = async () => {
    const currentDateTime = new Date();

    try {
      setLoading(true);
      for (const id in selected) {
        const item = selected[id];
        if (item === "Yes") {
          await updateDoc(doc(db, "sobrietyData", id), {
            lastPledgeDate: currentDateTime,
          });
        } else if (item === "No") {
          await updateDoc(doc(db, "sobrietyData", id), {
            startDate: currentDateTime,
          });
        }
      }
      setLoading(false);
      setIsModalOpen(false);
      toast.info("Pledge updated successfully")
    } catch (error) {
      console.error("Error updating pledge:", error);
      setLoading(false);
    }
  

  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              titleFontSize: 20,
            },
          },
        }}
      >
        {screenWidth >= 640 ? (
          <Modal
            title="Sobriety Daily Pledge"
            open={isModalOpen}
            onCancel={handleCancel}
            centered
            width={460}
            footer={[
              <Button
                key={"continue"}
                loading={loading}
                disabled={loading}
                type="primary"
                className="bg-[#1B49C1] text-white h-11 rounded-[12px] text-base font-semibold w-full"
                onClick={handleConfirm}
              >
                Confirm
              </Button>,
            ]}
          >
            <div className="h-[270px] overflow-auto">
              {data.map((item, index) => (
                <div key={index} className="mb-2">
                  <h1 className="text-[14px] font-light mb-2">
                    {`I have remained free from ${item.substance} for Today, ${formattedDate}`}
                  </h1>
                  <div className="flex item-center justify-center gap-4">
                    <div
                      key={item.id}
                      className={`border-[1.5px] rounded-[5px] flex items-center justify-center cursor-pointer py-3 px-5 xl:py-3 xl:px-6 2xl:py-4 2xl:px-10 ${
                        selected[item.id] === "Yes"
                          ? "border-[#7CCAF6]"
                          : "border-[#D9D9D9]"
                      }`}
                      onClick={() => handleOptionClick("Yes", item.id)}
                    >
                      Yes
                    </div>
                    <div
                      className={`border-[1.5px] rounded-[5px] flex items-center justify-center cursor-pointer py-3 px-5 xl:py-3 xl:px-6 2xl:py-4 2xl:px-10 ${
                        selected[item.id] === "No"
                          ? "border-[#7CCAF6]"
                          : "border-[#D9D9D9]"
                      }`}
                      onClick={() => handleOptionClick("No", item.id)}
                    >
                      No
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        ) : (
          <Modal
            style={{
              marginBottom: "100px",
            }}
            zIndex={10000}
            title="Level up your matches"
            open={isModalOpen}
            onCancel={handleCancel}
            wrapClassName="flex justify-end items-end"
            width="90%"
            footer={[
              <Button
                key={"continue"}
                className="bg-black text-white h-11 rounded-full text-base font-semibold w-full"
                onClick={handleConfirm}
              >
                Apply filter
              </Button>,
            ]}
          >
            <div className="h-[270px]"></div>
          </Modal>
        )}
      </ConfigProvider>
    </>
  );
};

export default PledgeModal;
