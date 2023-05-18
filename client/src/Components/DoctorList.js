import React from "react";
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
  const from = (date) => {
    return date.toLocaleString().slice(11, 16);
  };

  const to = (date) => {
    return date.toLocaleString().slice(11, 16);
  };
  return (
    <>
      <div className="card " style={{cursor:'pointer'}} onClick={()=> navigate(`/book-appointment/${doctor._id}`)}>
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
        </div>
        <div className="card-body">
          <p>
            <b>Experiance</b> {doctor.experiance}
          </p>
        </div>
        <div className="card-body">
          <p>
            <b>Fees Per Consultant</b> {doctor.feePerConsultant}
          </p>
        </div>
        <div className="card-body">
          <p>
            <b>Timings</b> {from(doctor.timings[0])} To {to(doctor.timings[1])}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
