import React from "react";
import "../Styles/RegisterStyles.css";
import { Form, Input , message } from "antd";
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showLoading , hideLoading } from "../Redux/features/alertSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinishHandler = async(values) => {
    try {
      dispatch(showLoading);
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading);
      if (res.data.success) {
        message.success('Register Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
      
    } catch (error) {
      dispatch(hideLoading);
      console.log(error);
      message.error('Something went wrong');
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name={"name"}>
            <Input type="text" required></Input>
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required></Input>
                  </Form.Item>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
                  <Link to={'/login'} className="m-2">Already User ? Login</Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
