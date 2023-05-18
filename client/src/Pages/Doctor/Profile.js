import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Col, Form, Input, Row, message  } from "antd";
import { showLoading, hideLoading } from "../../Redux/features/alertSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  const params = useParams();

  // Form Submit Function
  const handleFinish = async (value) => {
    // console.log(value);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...value,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  // get Doc Info
  const getDocInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDocInfo();
    //   eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
          }}
        >
          <h4>Personal Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="First Name" name={"firstName"} required>
                <Input type="text" placeholder="First Name"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Last Name" name={"lastName"} required>
                <Input type="text" placeholder="Last Name"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Phone Number" name={"phone"} required>
                <Input type="text" placeholder="Phone Number"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Email" name={"email"} required>
                <Input type="text" placeholder="Email"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name={"website"}>
                <Input type="text" placeholder="Your website"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Address" name={"address"} required>
                <Input type="text" placeholder="Address"></Input>
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name={"specialization"}
                required
              >
                <Input type="text" placeholder="Your Specialization"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Experiance" name={"experiance"} required>
                <Input type="text" placeholder="Your Experiance"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name={"feePerConsultant"}
                required
              >
                <Input
                  type="text"
                  placeholder="Your Fees Per Consultation"
                ></Input>
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name={"timings"} required>
                <TimePicker.RangePicker format={"HH:mm"} />
              </Form.Item>
            </Col> */}
          </Row>
          <div className="d-flex justify-content-start">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
