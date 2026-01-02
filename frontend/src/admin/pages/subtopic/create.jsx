import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CourseDropdown = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [topics, setTopics] = useState([{ name: "" }]);
  const navigate = useNavigate();

  // ✅ Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/topic/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  // ✅ Handle topic input change
  const handleTopicChange = (index, e) => {
    const newTopics = [...topics];
    newTopics[index][e.target.name] = e.target.value;
    setTopics(newTopics);
  };

  // ✅ Add new topic input row
  const handleAddTopic = () => {
    setTopics([...topics, { name: "" }]);
  };

  // ✅ Remove topic input row
  const handleRemoveTopic = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  // ✅ Submit topics one by one
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let topic of topics) {
        await axios.post("http://localhost:5000/api/subtopic", {
          topic_id: id,
          name: topic.name,
        });
      }

      alert("All topics stored successfully!");
      navigate("/topic/index");
    } catch (err) {
      console.error(err);
      alert("Error submitting topics");
    }
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title">Create / Topic</h4>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/topic/index")}
            >
              Back
            </button>
          </div>

          <form className="forms-sample" onSubmit={handleSubmit}>
            {/* Course details */}
            <div className="form-group">
              <label>Course Details</label>
              <input
                type="text"
                className="form-control"
                value={
                  course
                    ? `${course.subcourse_id?.name || "N/A"} - ${
                        course.name || ""
                      }`
                    : ""
                }
                readOnly
              />
            </div>

            {/* Dynamic topic input rows */}
            <div className="form-group">
              <label>Topics</label>
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center mb-2"
                >
                  <input
                    type="text"
                    name="name"
                    value={topic.name}
                    onChange={(e) => handleTopicChange(index, e)}
                    className="form-control me-2"
                    placeholder={`Enter topic name ${index + 1}`}
                  />
                  {topics.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => handleRemoveTopic(index)}
                    >
                      -
                    </button>
                  )}
                  {index === topics.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddTopic}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <button type="submit" className="btn btn-success me-2">
              Submit All
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setTopics([{ name: "" }])}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseDropdown;
