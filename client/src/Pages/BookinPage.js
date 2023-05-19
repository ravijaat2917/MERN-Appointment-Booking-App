import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/features/alertSlice.js";

const BookinPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },
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

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          userInfo: user,
          doctorInfo: doctors,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="p-2">
        <h3>Booking Page</h3>
        <div className="container m-2">
          {doctors && (
            <div>
              <h4>
                Dr. {doctors.firstName} {doctors.lastName}{" "}
              </h4>
              <h4>Fees : {doctors.feePerConsultant}</h4>
              <div className="d-flex flex-column w-50">
                <DatePicker
                  className="m-2"
                  format={"DD-MM-YY"}
                  onChange={(value) =>
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker
                  className="m-2"
                  format={"HH:mm"}
                  onChange={(values) => {
                    setTime(moment(values).format("HH:mm"));
                  }}
                />
                <button onClick={handleBooking} className="btn btn-dark mt-2">
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookinPage;
