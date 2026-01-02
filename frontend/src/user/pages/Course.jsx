import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SimpleCircularProgress from "./SimpleCircularProgress";

const Dashboard = () => {
  const [courseData, setCourseData] = useState(null);
  const [subcourseData, setsubCourseData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { course_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/getstudentcourse/${course_id}`
        );
        console.log("✅ Course data received:", res.data.data);
        if (res.data.success) {
          setCourseData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    if (course_id) fetchCourseData();
  }, [course_id]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/getstudentsubcourse/${course_id}`
        );
        console.log("✅ Course data received:", res.data.data);
        if (res.data.success) {
          setsubCourseData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    if (course_id) fetchCourseData();
  }, [course_id]);

  const handleClick = () => {
    setShowDetails(true);
  };

  const calltopicClick = (subcourseId) => {
    navigate(`/subcourse/${subcourseId}`);
  };

  return (
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Course
        </h2>

        {courseData ? (
          <div className="flex justify-center w-full">
            <div
              className="shadow-lg border border-gray-300 bg-white dark:bg-gray-800 p-6 flex items-center gap-6"
              style={{ borderRadius: "30px", width: "650px" }}
              onClick={handleClick}
            >
              {/* LEFT → IMAGE */}
              <img
                src={`http://localhost:5000/uploads/course/${courseData.file}`}
                alt={courseData.name}
                className="h-32 w-32 object-cover rounded-full shadow-md"
              />

              {/* RIGHT → TEXT */}
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {courseData.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Duration: {courseData.duration}
                </p>

                <p className="description text-sm text-gray-500 dark:text-gray-300 mt-1 relative">
                  {courseData.description.length > 40
                    ? courseData.description.slice(0, 40) + "..."
                    : courseData.description}

                  <span className="popup">{courseData.description}</span>
                </p>
              </div>
              <SimpleCircularProgress progress={75} />
            </div>
          </div>
        ) : (
          <p>Loading course details...</p>
        )}
        {showDetails && subcourseData && (
          <div className="row mt-8">
            <div className="col-md-12 grid-margin transparent">
              <div className="row d-flex justify-content-center">
                {subcourseData.map((subcourse, index) => {
                  const colors = ["#ee9a62ff", "#a4c556ff", "#9b9a7bff","#86e67aff"]; // pick your colors

                  return (
                    <div
                      key={subcourse._id || index}
                      className="col-md-3 mb-4 stretch-card transparent"
                      onClick={() => calltopicClick(subcourse._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="card text-white"
                        style={{
                          backgroundColor: colors[index % colors.length],
                          borderRadius: "10px",
                        }}
                      >
                        <div className="card-body">
                          <p className="mb-4">{subcourse.name}</p>
                          <p className="fs-30 mb-2">{subcourse.duration}</p>
                          <p>{subcourse.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
