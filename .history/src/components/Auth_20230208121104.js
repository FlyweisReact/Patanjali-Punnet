const token = localStorage.getItem("token")

export const Auth = () => {

    const Auth = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     
  
}
