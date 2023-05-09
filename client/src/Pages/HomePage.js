import Layout from "../Components/Layout.js";
import axios from "axios";
import React, { useEffect } from "react";
import '../Styles/LayoutStyles.css';

const HomePage = () => {
  const getUserData = async () => {
    try {
      await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default HomePage;
