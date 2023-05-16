import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Table, message } from "antd";
import axios from "axios";

const Doctor = () => {
  const [Doctor, setDoctor] = useState([]);

  // getDoctor
  const getDoctor = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Errro in Getting Doctor");
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post("/api/v1/admin/changeAccountStatus", {
        doctorId: record._id,
        userId:record.userId,
        status: status,
      },
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        });
      if (res.data.success) {
        message.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  // Antd table col

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Contact No.",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "Pending" ? (
            <button className="btn btn-success" onClick={handleAccountStatus(record , 'Approved')} >Approve</button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h3 className="text-center m-3">Doctor List</h3>
      <Table columns={columns} dataSource={Doctor} />
    </Layout>
  );
};

export default Doctor;
