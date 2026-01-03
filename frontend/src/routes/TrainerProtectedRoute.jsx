import { Navigate } from "react-router-dom";

const TrainerProtectedRoute = ({ children }) => {
  let trainer = null;

  try {
    trainer = JSON.parse(sessionStorage.getItem("trainer"));
  } catch (error) {
    trainer = null;
  }

  if (!trainer || trainer.role !== "trainer") {
    return <Navigate to="/trainer/login" replace />;
  }

  return children;
};

export default TrainerProtectedRoute;
