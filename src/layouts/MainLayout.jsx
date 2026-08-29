import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div className="container mt-4" style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;