import React , {useState, useEffect} from 'react';

const Logout = () => {
  
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    window.location = "/";
}
export default Logout;