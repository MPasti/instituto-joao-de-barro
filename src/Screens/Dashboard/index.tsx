import React from "react";
import { BiArrowBack } from "react-icons/bi";
import {
  FaUsers,
  FaBox,
  FaMoneyBill,
  FaCalendarAlt,
  FaBuilding,
  FaNewspaper,
} from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

interface DashboardIconProps {
  icon: React.ReactNode;
  label: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center my-5" style={{ padding: "200px" }}>
      <div className="row justify-content-center">
        <div className="d-flex justify-content-start mb-3 m-3">
          <BiArrowBack
            onClick={() => navigate("/")}
            size={32}
            style={{
              cursor: "pointer",
            }}
          />
        </div>
        <div className="col-12 d-flex justify-content-center">
          <div className="row w-100">
            <DashboardIcon icon={<GiThreeFriends />} label="Voluntários" />
            <DashboardIcon icon={<FaUsers />} label="Beneficiários" />
            <DashboardIcon icon={<FaBox />} label="Estoque" />
            <DashboardIcon icon={<FaMoneyBill />} label="Financeiro" />
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <div className="row justify-content-center w-100">
            <DashboardIcon icon={<FaCalendarAlt />} label="Eventos" />
            <DashboardIcon icon={<FaBuilding />} label="Obras" />
            <DashboardIcon icon={<FaNewspaper />} label="Notícias" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardIcon = ({ icon, label }: DashboardIconProps) => {
  return (
    <div className="col-12 col-sm-6 col-md-3 mb-3 cursor-pointer">
      <div className="card dashboard-icon p-4 d-flex align-items-center justify-content-center">
        <div className="icon mb-2" style={{ fontSize: "30px" }}>
          {icon}
        </div>
        <span className="font-weight-bold">{label}</span>
      </div>
    </div>
  );
};

export default DashboardPage;
