import { Outlet } from "react-router-dom";
import TrainerSidebar from "../components/Trainersidebar";

const TrainerLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <TrainerSidebar />

      <div style={{ flex: 1 }}>
        {/* <TrainerHeader /> */}
        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TrainerLayout;
