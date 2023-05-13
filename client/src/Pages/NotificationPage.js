import React from "react";
import Layout from "../Components/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user?._id,
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        {
          userId: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error in deleting notifications");
    }
  };
  return (
    <Layout>
      <h4 className="m-3 text-center p-3">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab={"Unread"} key={1}>
          <div className="d-flex justify-content-end">
            <h6
              className="p-2"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              {user?.notification.length ? "Mark All Read" : "No Notifications"}
            </h6>
          </div>
          {user?.notification.map((Msg) => {
            return (
              <div
                className="card"
                onClick={() => navigate(`${Msg.data.onClickPath}`)}
              >
                <div
                  className="card-text"
                  onClick={navigate(`${Msg.data.onClickPath}`)}
                  style={{ cursor: "pointer" }}
                >
                  {Msg.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Read"} key={0}>
          <div className="d-flex justify-content-end">
            <h6
              className="p-2"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              {user?.seennotification.length
                ? "Delete All Read"
                : "No Notifications"}
            </h6>
          </div>
          {user?.seennotification.map((Msg) => {
            return (
              <div
                className="card"
                onClick={() => navigate(`${Msg.data.onClickPath}`)}
              >
                <div
                  className="card-text"
                  onClick={navigate(`${Msg.data.onClickPath}`)}
                  style={{ cursor: "pointer" }}
                >
                  {Msg.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
