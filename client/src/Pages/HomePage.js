import axios from "axios";
import React, { useEffect } from "react";

const HomePage = () => {
  const getUserData = async () => {
    try {
      await axios.post('/api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return <h1>Home Page</h1>;
};

export default HomePage;
