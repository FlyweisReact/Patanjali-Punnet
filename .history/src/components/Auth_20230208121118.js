import { MdImportExport } from "react-icons/md"

const token = localStorage.getItem("token")


 export    const Auth = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     
  

