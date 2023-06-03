import React, { useContext } from 'react'
import {Link} from "react-router-dom";
import { Context } from '../main';
import axios from 'axios';
import { server } from '../main';
import { toast } from 'react-hot-toast';

const Header = () => {

   const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
//   console.log(data);

   
  const logoutHandler = async ()=>{
   setLoading(true);

 //   console.log(name,email,password);
  try{
      await axios.get(`${server}/users/logout`,
        
      {
         withCredentials:true,
      }
   );

       toast.success("Logout Successfully");  
       setIsAuthenticated(false);
       setLoading(false);
  } catch(error)
  {
     toast.error(error.response.data.message);
     // console.log(error);
     setIsAuthenticated(true);
     setLoading(false);
  }
 
 };

  
  return (
  <nav className='header'>
     <div>
        <h2>Task App</h2>
     </div>
     <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
         {
            isAuthenticated ? <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>:
            <Link to={"/login"}>Login</Link>
         }

     </article>
  </nav>
  );
};

export default Header;
