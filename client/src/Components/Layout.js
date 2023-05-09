import React from "react";
import { SideBarMenu } from "../Data/data";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
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
              {SideBarMenu.map((menu) => {
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
            </div>
          </div>
          <div className="content">
            <div className="header">Header</div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
