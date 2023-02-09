/** @format */

import React from "react";
import HOC from "../layout/HOC";
import {  MdPayment, MdPrivacyTip } from "react-icons/md";
import {
  FaUserFriends,
  FaCity,
  FaUserTie,
  FaUser,
  FaFileInvoice,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillPieChartFill } from "react-icons/bs";
import { BiHelpCircle, BiSupport, BiLogOutCircle } from "react-icons/bi";
import { AiFillNotification } from "react-icons/ai";
import { RiCoupon3Line } from "react-icons/ri";
import { ImPriceTag, ImImage } from "react-icons/im";

// SVG
import img from "../SVG/home.svg";
import img2 from "../SVG/user.svg";
import img3 from "../SVG/users.svg";
import img4 from "../SVG/tag.svg";

export const dash = (data) => {
  return data;
};
const Dashboard = () => {
  const card = [
    {
      progress: "bg-green-400",
      title: "Total Users",
      number: "100",
      link: "/customer",
      img: `${img2}`,
      bg: "#ff5370",
    },
    {
      progress: "bg-yellow-400",
      title: "Total Heros",
      number: "150",
      img: `${img3}`,
      link: "/generateId",
      bg: "#4099ff",
    },
    {
      progress: "bg-yellow-400",
      title: "Ongoing tast",
      number: "150",
      img: `${img4}`,
      link: "/Notice/Labour",
      bg: "#2ed8b6",
    },
    {
      progress: "bg-yellow-400",
      title: "City",
      number: "150",
      icon: <FaCity className="text-2xl text-[#ffb64d]" />,
      link: "/city",
      bg: "#ffb64d",
    },
  ];

  const smallCards = [
    {
      progress: "bg-green-400",
      title: " Users",
      number: "100",
      icon: <FaUserFriends className="text-2xl text-[#19ac5e]" />,
      link: "/customer",
      color: "rgb(64,153,255)",
    },
    {
      progress: "bg-yellow-400",
      title: "City",
      number: "150",
      icon: <FaCity className="text-2xl text-[rgb(170,93,225)]" />,
      link: "/city",
      color: "rgb(170,93,225)",
    },
    {
      progress: "bg-yellow-400",
      title: "Analatical Graph",
      number: "150",
      icon: <BsFillPieChartFill className="text-2xl text-[rgb(67,136,232)]" />,
      link: "/graph",
      color: "rgb(239,76,77)",
    },
    {
      progress: "bg-green-400",
      title: "Notification",
      number: "100",
      icon: <AiFillNotification className="text-2xl text-[rgb(244,169,52)]" />,
      link: "/notification",
      color: "#36b672",
    },
    {
      progress: "bg-yellow-400",
      title: " Hero's",
      number: "150",
      icon: <FaUserTie className="text-2xl text-[rgb(237,77,77)]" />,
      link: "/generateId",
      color: "#36b672",
    },
    {
      progress: "bg-yellow-400",
      title: "Common Users",
      number: "150",
      icon: <FaUser className="text-2xl text-[rgb(241,147,48)]" />,
      link: "/common",
      color: "rgb(170,93,225)",
    },
    {
      progress: "bg-green-400",
      title: "Booking",
      number: "100",
      icon: <MdPayment className="text-2xl text-[#19ac5e]" />,
      link: "/Notice/Labour",
      color: "rgb(239,76,77)",
    },
    {
      progress: "bg-yellow-400",
      title: "Coupons",
      number: "150",
      icon: <RiCoupon3Line className="text-2xl text-[rgb(170,93,225)]" />,
      link: "/Notice/Customer",
      color: "rgb(170,93,225)",
    },
    {
      progress: "bg-yellow-400",
      title: "Pricing Section",
      number: "150",
      icon: <ImPriceTag className="text-2xl text-[rgb(67,136,232)]" />,
      link: "/pay",
      color: "#36b672",
    },
    {
      progress: "bg-green-400",
      title: "Transiction",
      number: "100",
      icon: <FaFileInvoice className="text-2xl text-[rgb(244,169,52)]" />,
      link: "/trans",
      color: "#ff5370",
    },
    {
      progress: "bg-yellow-400",
      title: "Banners",
      number: "150",
      icon: <ImImage className="text-2xl text-[rgb(237,77,77)]" />,
      link: "/cat",
      color: "rgb(239,76,77)",
    },
    {
      progress: "bg-yellow-400",
      title: "Terms&Condition",
      number: "150",
      icon: <BiHelpCircle className="text-2xl text-[rgb(241,147,48)]" />,
      link: "/terms",
      color: "rgb(170,93,225)",
    },

    {
      progress: "bg-green-400",
      title: "Privacy Policy",
      number: "100",
      icon: <MdPrivacyTip className="text-2xl text-[#19ac5e]" />,
      link: "/privacy",
      color: "#ff5370",
    },
    {
      progress: "bg-yellow-400",
      title: "Help&Support",
      number: "150",
      icon: <BiSupport className="text-2xl text-[rgb(170,93,225)]" />,
      link: "/help",
      color: "rgb(170,93,225)",
    },

    {
      progress: "bg-yellow-400",
      title: "Logout",
      number: "150",
      icon: <BiLogOutCircle className="text-2xl text-[rgb(170,93,225)]" />,
      link: "/",
      color: "#ff5370",
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Dashboard
        </p>
      </div>

      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md"
              key={index}
              onClick={() => navigate(`${card.link}`)}
              style={{ cursor: "pointer", backgroundColor: `${card.bg}` }}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "white" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "white" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div
                  className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center myICons"
          
                  
                >
                  {card.img ? <img src={card.img} alt="" /> : card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>


    </>
  );
};

export default HOC(Dashboard);
