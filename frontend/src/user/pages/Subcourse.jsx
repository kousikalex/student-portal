import React, { useEffect, useState } from "react";
import axios from "axios"; // <-- Missing import (added)
import { useParams } from "react-router-dom";

import Samplevideo from "../image/videos/sample_video.mp4";
import Sampleresume from "../image/file/resume.pdf";

function Subcourse() {
  const [topics, setTopicData] = useState([]); // MUST be array
  const { subcourseId } = useParams();

  const [openIndex, setOpenIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState({});
  // const [activeTab, setActiveTab] = useState({});
  const [activeTab, setActiveTab] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");

  // console.log("Fetching topics for subcourse ID:", subcourseId);

  //Fetch Topics
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/getstudenttopic/${subcourseId}`
        );

        // console.log("📌 API Response:", res.data.data);

        if (res.data.success && Array.isArray(res.data.data)) {
          // console.log("✅ Valid topic data received:", res.data.data);

          setTopicData(res.data.data);
        } else {
          setTopicData([]);
        }
      } catch (error) {
        console.error("Error fetching topic data:", error);
        setTopicData([]);
      }
    };

    if (subcourseId) fetchCourseData();
  }, [subcourseId]);

  useEffect(() => {
    if (!activeTab) return;
    console.log("hiii", activeTab);

    const fetchData = async () => {
      setVideoUrl("");
      setDocUrl("");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/getdocument/${activeTab.subId}?type=${activeTab.module}`
        );

        // console.log("data",res.data);

        if (activeTab.module === "video") {
          setVideoUrl(res.data.videoUrl);
        } else if (activeTab.module === "document") {
          setDocUrl(res.data.pdfUrl);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="flex h-screen gap-4">
      {/* LEFT ACCORDION PANEL */}
      <div className="h-full w-[300px] min-w-[300px] max-w-[300px] border-r rounded-lg shadow flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <div key={index} className="border-b">
                {/* Accordion Button */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  {topic.topic_name}
                </button>

                {/* Show Subtopics */}
                {openIndex === index && (
                  <div className="px-4 py-2 bg-white transition-all duration-300">
                    {topic.subtopics.map((sub, idx) => (
                      // console.log("Subtopic:", sub),

                      <p
                        key={idx}
                        onClick={() => {
                          setSelectedTopic({
                            name: sub.name,
                            id: sub._id,
                          });

                          // Reset active tab for new subtopic
                          setActiveTab(null);
                        }}
                        className={`cursor-pointer py-1 hover:text-purple-600 ${
                          selectedTopic.id === sub._id
                            ? "font-semibold text-purple-700"
                            : "text-gray-700"
                        }`}
                      >
                        {idx + 1}. {sub.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500">No topics found.</p>
          )}
        </div>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header section */}
        {selectedTopic ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedTopic.name}
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActiveTab({
                      module: "video",
                      subId: selectedTopic.id,
                    })
                  }
                  className={`px-4 py-2 text-sm font-medium border rounded-lg ${
                    activeTab?.module === "video"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-600 hover:bg-gray-100"
                  }`}
                >
                  Video
                </button>

                <button
                  onClick={() =>
                    setActiveTab({
                      module: "document",
                      subId: selectedTopic.id,
                    })
                  }
                  className={`px-4 py-2 text-sm font-medium border rounded-lg ${
                    activeTab?.module === "document"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-600 hover:bg-gray-100"
                  }`}
                >
                  Documents
                </button>
              </div>
            </div>

            {/* Display Area */}
            <div className="flex-1 p-4 flex justify-center items-center bg-gray-50">
              {/* VIDEO VIEW */}
              {activeTab?.module === "video" &&
                (videoUrl === "" ? (
                  <p>No video available</p>
                ) : videoUrl === null ? (
                  <p className="text-red-500 font-medium">No video available</p>
                ) : (
                  <video
                    controls
                    className="rounded-lg border shadow object-contain"
                    style={{ width: "700px", height: "380px" }}
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                ))}

              {/* DOCUMENT VIEW */}
              {activeTab?.module === "document" &&
                (docUrl === "" ? (
                  <p>No PDF available</p>
                ) : docUrl === null ? (
                  <p className="text-red-500 font-medium">No PDF available</p>
                ) : (
                  <iframe
                    src={docUrl}
                    width="80%"
                    height="450"
                    className="rounded-lg border shadow"
                    title="Document Viewer"
                  ></iframe>
                ))}

              {!activeTab && (
                <p className="text-gray-500 text-sm italic">
                  Select “Video” or “Document” to view content.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center text-gray-500 italic">
            Select a subtopic to begin.
          </div>
        )}
      </div>
    </div>
  );
}

export default Subcourse;
