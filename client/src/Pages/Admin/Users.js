import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Table, message } from "antd";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  // getUSers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Errro in Getting Users");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // Antd table col

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h3 className="text-center m-3">Users List</h3>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
