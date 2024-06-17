import { Button, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import design1 from "../../assets/design1.svg";
import design2 from "../../assets/design2.svg";
import design3 from "../../assets/design3.svg";
import design5 from "../../assets/design5.svg";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import design6 from "../assets/design6.svg";
// import design7 from "../assets/design7.svg";
// import design8 from "../assets/design8.svg";
// import design9 from "../assets/design9.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");
      if (!fname || !lname || !email || !password) {
        setMessage({ error: true, msg: "All fields are required" });
        setLoading(false);
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          fname,
          lname,
          email,
        });
        setLoading(false);
        setMessage("");
        navigate("/onboarding");
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
      console.log(err);
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
      <div className="px-5 pt-20 flex-col md:px-24 lg:px-14 lg:pb-4 xl:px-20 2xl:px-32 2xl:pt-32 overflow-auto">
        <div className="flex">
          <h1 className="text-[30px] font-semibold">Hey There!</h1>
          <img src={design5} alt="" />
        </div>
        <p className="text-[#615E5E] text-[17px] font-normal pt-2">
          Enter your details to create your account
        </p>
        <Form
          className="pt-5"
          onFinish={handleSubmit}
          onSubmit={(e) => e.preventDefault()}
        >
          {message?.msg && (
            <Alert
              message=""
              description={message?.msg}
              type="error"
              showIcon
              className="mb-3"
            />
          )}
          <h1 className="text-[15px] font-medium pb-1">First Name</h1>
          <Input
            className="h-9 mb-5"
            placeholder="Enter your first name"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
          />
          <h1 className="text-[15px] font-medium pb-1">Last Name</h1>
          <Input
            className="h-9 mb-5"
            placeholder="Enter your last name"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
          />
          <h1 className="text-[15px] font-medium pb-1">Email</h1>
          <Input
            className="h-9 mb-5"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1 className="text-[15px] font-medium pb-1">Password</h1>
          <Input.Password
            className="h-9"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="text-[#1945B7] pt-2 text-end cursor-pointer">
            Forgot password?
          </h1>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="bg-[#1B49C1] h-10 w-full mt-5"
          >
            Sign up
          </Button>
          <h1 className="text-center pt-3">
            Already have an account?
            <span
              className="text-[#1945B7] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </h1>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
