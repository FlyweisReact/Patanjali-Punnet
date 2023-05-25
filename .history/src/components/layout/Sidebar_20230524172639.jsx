/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { MdDashboardCustomize, MdPrivacyTip } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { toast } from "react-toastify";
import { FiHelpCircle } from "react-icons/fi";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/dashboard",
      name: "Dashboard",
    },
    {
      icon: <i className="fa-sharp fa-solid fa-envelope text-xl mr-3"></i>,
      link: "/push-notification",
      name: "Push Notification",
    },
    {
      icon: <i className="fa-solid fa-cart-shopping text-xl mr-3"></i>,
      link: "/product",
      name: " Products",
    },
    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/patanjali-category",
      name: " Patanjali Category ",
    },
    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/non_patanjali-category",
      name: " Non-Patanjali Category ",
    },
    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/user",
      name: "User",
    },
   
    {
      icon: <BsFillImageFill className="text-xl mr-3" />,
      link: "/banner",
      name: "Banners",
    },

    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/Notice/Labour",
      name: "Orders",
    },

    {
      icon: <IoIosPricetags className="text-xl mr-3" />,
      link: "/trans",
      name: "Transactions",
    },
 
    {
      icon: <BsFillImageFill className="text-xl mr-3" />,
      link: "/terms",
      name: "Terms&Condition",
    },
    {
      icon: <MdPrivacyTip className="text-xl mr-3" />,
      link: "/privacy",
      name: "Privacy Policy",
    },
    {
      icon: <FiHelpCircle className="text-xl mr-3" />,
      link: "/help",
      name: "Help&Support",
    },
    {
      icon: <FiHelpCircle className="text-xl mr-3" />,
      link: "/coupon",
      name: "Coupons",
    },
  ];

  const logOut = async (e) => {
    localStorage.removeItem("token");
    toast.success("Log-Out SuccessFull");
    navigate("/");
  };

  return (
    <>
      <div
        className="p-4 Menu_Bar"
        style={{
          backgroundColor: "#263544",
            minWidth : '300px',
            minHeight : '100vh'
        }}
      >
        <div className="w-full md:hidden relative  mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[rgb(241,146,46)]"
            style={{ fontSize: "2rem", textAlign: "center", color: "#fff" }}
          >
            Admin Panel
          </span>
        </figure>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span
                  className="flex my-3 items-center cursor-pointer   tracking-wider p-2 rounded-sm"
                  style={{ color: "#aac0bb" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}

          <span
            onClick={() => logOut()}
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            style={{ color: "#aac0bb" }}
          >
            <BiLogOutCircle className="text-xl mr-3" /> Logout
          </span>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
