import React from "react";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  var sidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  const navigate = useNavigate();
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Appointment</h6>
              <hr></hr>
            </div>
            <div className="menu">
              {sidebarMenu?.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon} />
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`}>
                <i className={"fa-solid fa-right-from-bracket"} />
                <Link
                  to={"/login"}
                  onClick={() => {
                    message.success("Logout Sucessfully");
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header pb-3" style={{height:'max-content' , textAlign:"center"}}>
              <div className="header-content" style={{cursor:'pointer'}} >
                <Badge
                  count={user?.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell" />
                </Badge>
                <Link to={"/profile"} key={user?._id}>
                  {user?.name}
                </Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
