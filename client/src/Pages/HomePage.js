import Layout from "../Components/Layout.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Styles/LayoutStyles.css";
import { Row } from "antd";
import DoctorList from "../Components/DoctorList.js";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map(doctor => (
          <DoctorList doctor={doctor} />
        ) )}
      </Row>
    </Layout>
  );
};

export default HomePage;
