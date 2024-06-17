import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineFeedback,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";

const Sidebar = () => {
  const [newActiveLink, setNewActiveLink] = useState(1);
  const path = window.location.pathname;

  useEffect(() => {
    if (path === "/") {
      setNewActiveLink(1);
    } else if (path === "/motivations") {
      setNewActiveLink(2);
    } else if (path === "/resources") {
      setNewActiveLink(3);
    } else {
      setNewActiveLink(4);
    }
    console.log(path);
  }, [path]);

  return (
    <div className="bg-[#7CCAF6] h-screen text-gray-100 flex-col items-center w-0 hidden shadow-lg border-r border-lg-grey-75 md:flex md:w-64 lg:w-72">
      <div className="h-24 w-full flex items-center justify-center"></div>
      <div className="flex flex-col items-start mt-6 px-6 h-auto w-full md:px-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            [
              "mb-1 py-3 w-full pl-5",
              "flex items-center",
              "hover:bg-cprimary-300 hover:text-csecond-100",
              "rounded-[10px] transition",
              isActive ? "bg-[#1B49C1] text-white" : "bg-[#7CCAF6] text-black",
            ].join(" ")
          }
        >
          {newActiveLink === 1 ? (
            <>
              <MdDashboard color="white" className="mr-3" />
            </>
          ) : (
            <>
              <MdDashboard color="black" className="mr-3" />
            </>
          )}
          <span className="text-sm font-normal mt-1">Progress Tracker</span>
        </NavLink>

        <NavLink
          to="/motivations"
          className={({ isActive }) =>
            [
              "mb-1 py-3 w-full pl-5",
              "flex items-center",
              "hover:bg-cprimary-300 hover:text-csecond-100",
              "rounded-[10px] transition",
              isActive ? "bg-[#1B49C1] text-white" : "bg-[#7CCAF6] text-black",
            ].join(" ")
          }
        >
          {newActiveLink === 2 ? (
            <>
              <FiUserCheck color="white" className="mr-3" />
            </>
          ) : (
            <>
              <FiUserCheck color="black" className="mr-3" />
            </>
          )}
          <span className="text-sm font-normal mt-1">Daily motivations</span>
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive }) =>
            [
              "mb-1 py-3 w-full pl-5",
              "flex items-center",
              "hover:bg-cprimary-300 hover:text-csecond-100",
              "rounded-[10px] transition",
              isActive ? "bg-[#1B49C1] text-white" : "bg-[#7CCAF6] text-black",
            ].join(" ")
          }
        >
          {newActiveLink === 3 ? (
            <>
              <MdOutlineLibraryBooks color="white" className="mr-3" />
            </>
          ) : (
            <>
              <MdOutlineLibraryBooks color="black" className="mr-3" />
            </>
          )}
          <span className="text-sm font-normal mt-1">Resources</span>
        </NavLink>
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            [
              "mb-1 py-3 w-full pl-5",
              "flex items-center",
              "hover:bg-cprimary-300 hover:text-csecond-100",
              "rounded-[10px] transition",
              isActive ? "bg-[#1B49C1] text-white" : "bg-[#7CCAF6] text-black",
            ].join(" ")
          }
        >
          {newActiveLink === 4 ? (
            <>
              <MdOutlineFeedback color="white" className="mr-3" />
            </>
          ) : (
            <>
              <MdOutlineFeedback color="black" className="mr-3" />
            </>
          )}
          <span className="text-sm font-normal mt-1">Feedback</span>
        </NavLink>
      </div>
      <div className="fixed bottom-6 md:w-64 lg:w-72 flex flex-col items-center">
       <div className="flex items-center gap-3">
        <LuLogOut color="black" className="cursor-pointer" />
        <h1 className="text-black">Log out</h1>
       </div>
      </div>
    </div>
  );
};

export default Sidebar;
