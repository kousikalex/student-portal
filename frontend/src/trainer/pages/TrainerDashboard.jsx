import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const navigate = useNavigate();

  const trainer = JSON.parse(sessionStorage.getItem("trainer"));

  const [time, setTime] = useState("");
  const [punchedIn, setPunchedIn] = useState(false);
  const [punchedOut, setPunchedOut] = useState(false);

  /* 🔐 Safety check */
  useEffect(() => {
    if (!trainer) {
      navigate("/trainer/login");
    }
  }, [trainer, navigate]);

  /* ⏰ Live India Time */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ✅ ALWAYS FETCH FROM BACKEND */
  const fetchTodayAttendance = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/attendance/today/${trainer.id}`
      );

      if (res.data) {
        setPunchedIn(Boolean(res.data.punchIn));
        setPunchedOut(Boolean(res.data.punchOut));
      } else {
        setPunchedIn(false);
        setPunchedOut(false);
      }
    } catch (err) {
      setPunchedIn(false);
      setPunchedOut(false);
    }
  }, [trainer]);

  /* 🔄 On page load / refresh / navigation */
  useEffect(() => {
    if (trainer) fetchTodayAttendance();
  }, [trainer, fetchTodayAttendance]);

  /* 🟢 Punch In */
  const handlePunchIn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/punch-in",
        { trainerId: trainer.id }
      );

      if (res.data.success) {
        await fetchTodayAttendance(); // 🔥 sync again
        alert("Punch In Successful");
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Punch In failed");
    }
  };

  /* 🔴 Punch Out */
  const handlePunchOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/punch-out",
        { trainerId: trainer.id }
      );

      if (res.data.success) {
        await fetchTodayAttendance(); // 🔥 sync again
        alert("Punch Out Successful");
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Punch Out failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <div
        style={{
          width: 520,
          padding: 40,
          borderRadius: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h3>Welcome, {trainer?.name}</h3>

        <h2>Current Time (India)</h2>
        <h1 style={{ fontSize: 48, margin: "30px 0" }}>{time}</h1>

        <button
          onClick={handlePunchIn}
          disabled={punchedIn}
          style={{
            background: punchedIn ? "#ccc" : "#28a745",
            color: "#fff",
            padding: "12px 30px",
            borderRadius: 8,
            border: "none",
            marginRight: 20,
            cursor: punchedIn ? "not-allowed" : "pointer",
          }}
        >
          Punch In
        </button>

        <button
          onClick={handlePunchOut}
          disabled={!punchedIn || punchedOut}
          style={{
            background: punchedOut ? "#ccc" : "#dc3545",
            color: "#fff",
            padding: "12px 30px",
            borderRadius: 8,
            border: "none",
            cursor: !punchedIn || punchedOut ? "not-allowed" : "pointer",
          }}
        >
          Punch Out
        </button>
      </div>
    </div>
  );
};

export default TrainerDashboard;
