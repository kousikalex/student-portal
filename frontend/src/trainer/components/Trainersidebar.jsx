import { Link } from "react-router-dom";

const Trainersidebar = () => {
  return (
    <aside style={{ width: "220px", background: "#1f2937", color: "#fff" }}>
      <h3 style={{ padding: "20px" }}>Trainer Panel</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/trainer/dashboard">Dashboard</Link></li>
        <li><Link to="/trainer/attendance">Attendance</Link></li>
        <li><Link to="/trainer/works">Allocated Works</Link></li>
        <li><Link to="/trainer/notifications">Notifications</Link></li>
        <li><Link to="/trainer/materials">Course Materials</Link></li>
      </ul>
    </aside>
  );
};

export default Trainersidebar;
