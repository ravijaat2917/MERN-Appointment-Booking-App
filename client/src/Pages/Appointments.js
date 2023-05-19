import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import {Table } from 'antd';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorId.firstName} {record.doctorId.lastName}
        </span>
      ),
    },
    {
      title: "Contact Number",
      dataIndex: "phone",
    },
    { title: "Status", dataIndex: "status" },
  ];
  return (
    <Layout>
          <h4 className="m-2 text-center">Appointments List</h4>
          <Table columns={columns} dataSource={appointments} ></Table>
    </Layout>
  );
};

export default Appointments;
