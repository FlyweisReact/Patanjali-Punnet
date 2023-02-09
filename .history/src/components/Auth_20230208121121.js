
const token = localStorage.getItem("token")


 export    const Auth = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     
  

