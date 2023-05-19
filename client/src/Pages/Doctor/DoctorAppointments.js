import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table } from "antd";
import Layout from "../../Components/Layout";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
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

  const handleStatus = async (record, status) => {
    const res = await axios.post(
      "/api/v1/doctor/update-status",
      {
        appointmentId: record._id,
        status,
      },
      {
        headres: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.status) {
      message.success(res.data.message);
      DoctorAppointments();
    }
  };
  const columns = [
    { title: "ID", dataIndex: "_id" },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Contact Number",
    //   dataIndex: "phone",
    // },
    { title: "Status", dataIndex: "status" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success "
                onClick={() => handleStatus(record, "approve")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h4 className="m-2 text-center">Appointments List</h4>
      <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
  );
};

export default DoctorAppointments;
