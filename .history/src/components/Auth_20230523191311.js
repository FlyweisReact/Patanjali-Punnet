/** @format */

const token = localStorage.getItem("token");
console.log(localStorage.getItem("token"))

export const Auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
