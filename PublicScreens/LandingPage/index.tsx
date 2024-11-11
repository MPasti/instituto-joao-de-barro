import { Outlet } from "react-router-dom";
import { Footer } from "../../../components/Footer";
import { Navbar } from "../../../components/Navbar";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
