/** @format */

const token = localStorage.getItem("token");
console.log(localStorage.getItem(""))

export const Auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
