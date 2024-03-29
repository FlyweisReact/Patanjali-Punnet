/** @format */

import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "../Auth";
import {MdCategory} from 'react-icons/md'
import {AiFillSwitcher} from 'react-icons/ai'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState("");
  const [patanjaliCount, setPatanjaliCount] = useState("");
  const [nonPatanjaliCount, setNonPatanjaliCount] = useState("");
  const [orderCount, setOrderCount] = useState("");
  const [productCount, setProductCount] = useState("");

  const token = localStorage.getItem("token");


  // User Count
  const fetchUserCount = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/users/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserCount(data.users.length);
    } catch (e) {
      console.log(e);
    }
  };

  // Patanjali Category Count
  const fetchPatanjaliCount = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/getAllCategory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatanjaliCount(data.categories.length);
    } catch (e) {
      console.log(e);
    }
  };

  // Non-Patanjali Category Count
  const fetchNonPatanjaliCount = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/non-pantangli/getAllNonPanangli"
      );
      setNonPatanjaliCount(data.message.length);
    } catch (e) {
      console.log(e);
    }
  };

  // Order Count
  const fetchOrderCount = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderCount(data.orders.length);
    } catch (e) {
      console.log(e);
    }
  };

  // Product Count
  const fetchProductCount = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductCount(data.products.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchPatanjaliCount();
    fetchNonPatanjaliCount();
    fetchOrderCount();
    fetchProductCount();
  }, []);

  const card = [
    {
      title: "Total Users",
      number: userCount,
      icon:<i className="fa-solid fa-user text-2xl text-[#ff5370]"></i>,
      bg: "#ff5370",
      link : '/user'
    },
    {
      title: "Total Patanjali Categories",
      number: patanjaliCount,
      icon: <MdCategory className="text-2xl text-[#4099ff]" />,
      link: "/patanjali-category",
      bg: "#4099ff",
    },
    {
      title: "Total Non-Patanjali Categories",
      number: nonPatanjaliCount,
      icon: <AiFillSwitcher className="text-2xl text-[#2ed8b6]" />,
      link: "/non_patanjali-category",
      bg: "#2ed8b6",
    },
    {
      progress: "bg-yellow-400",
      title: "Total Order's",
      number: orderCount,
      icon : <i class="fa-solid fa-cart-shopping  text-2xl text-[#ffb64d]"></i> ,
      link: "/Orders",
      bg: "#ffb64d",
    },
    {
      progress: "bg-yellow-400",
      title: "Total Product's",
      number: productCount,
      icon: <i className="fa-solid fa-money-bill text-2xl text-[#aa5de1]"></i>,
      bg: "#aa5de1",
      link : '/product'
    },
  ];

  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md"
              key={index}
              onClick={() => navigate(`${card.link ? card.link : "#"}`)}
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
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center myICons">
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
