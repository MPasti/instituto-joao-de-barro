import React from "react";
import { BiArrowBack, BiSolidCalendarStar } from "react-icons/bi";
import { FaTools, FaHandsHelping } from "react-icons/fa";
import { FaBoxOpen, FaHandHoldingHeart, FaPiggyBank } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
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
            <DashboardIcon icon={<FaHandsHelping />} label="VOLUNTÁRIOS" />
            <DashboardIcon icon={<FaHandHoldingHeart />} label="BENEFICIÁRIOS" />
            <DashboardIcon icon={<FaBoxOpen />} label="ESTOQUE" />
            <DashboardIcon icon={<FaPiggyBank />} label="FINANCEIRO" />
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <div className="row justify-content-center w-100">
            <DashboardIcon icon={<BiSolidCalendarStar />} label="EVENTOS" />
            <DashboardIcon icon={<FaTools />} label="OBRAS" />
            <DashboardIcon icon={<IoNewspaper />} label="NOTÍCIAS" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardIcon = ({ icon, label }: DashboardIconProps) => {
  return (
    <div className="col-12 col-sm-6 col-md-3 mb-3 cursor-pointer">
      <div className="card dashboard-icon p-4 d-flex align-items-center justify-content-center bg-dark">
        <div className="icon mb-2" style={{ fontSize: "30px" }}>
          {icon}
        </div>
        <span className="font-weight-bold">{label}</span>
      </div>
    </div>
  );
};

export default DashboardPage;
