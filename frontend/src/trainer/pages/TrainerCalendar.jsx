import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Calendar.css";

const TrainerCalendar = () => {
  const trainer = JSON.parse(sessionStorage.getItem("trainer"));
  const trainerId = trainer?.id;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    if (trainerId) {
      fetchAttendance();
    }
  }, [currentDate, trainerId]);

  const fetchAttendance = async () => {
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const res = await axios.get(
        `http://localhost:5000/api/attendance/${trainerId}/${month}/${year}`
      );

      /**
       * Convert array response → object keyed by day
       */
      const mapped = {};
      res.data.forEach((item) => {
        const day = new Date(item.date).getDate();
        mapped[day] = {
          punchIn: item.punchIn,
          punchOut: item.punchOut,
          hours: item.hours,
        };
      });

      setAttendance(mapped);
    } catch (err) {
      console.error("Attendance fetch failed", err);
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const changeMonth = (val) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + val, 1)
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div className="day-name" key={d}>
            {d}
          </div>
        ))}

        {Array(startDay)
          .fill("")
          .map((_, i) => (
            <div key={i} className="empty"></div>
          ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const data = attendance[day];

          return (
            <div className="day-cell" key={day}>
              <div className="date">{day}</div>

              {data && (
                <div className="attendance">
                  <p className="in">IN: {data.punchIn}</p>
                  <p className="out">OUT: {data.punchOut}</p>
                  <p className="eff">Eff: {data.hours}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainerCalendar;
