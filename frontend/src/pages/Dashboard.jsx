import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import UploadSection from "../components/UploadSection";
import Loader from "../components/Loader";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  const fetchResumes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/resumes");
      setResumes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFile(null);

      fetchResumes();

      alert("Resume uploaded successfully.");

    } catch (error) {
      console.error(error);
      alert("Upload Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700">

        <div className="max-w-7xl mx-auto py-10 text-center">

          <h1 className="text-5xl text-white font-bold">
            AI Resume Parser
          </h1>

          <p className="text-blue-100 mt-3">
            Upload and Manage Parsed Resumes
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto py-10 px-6">

        <UploadSection
          file={file}
          setFile={setFile}
          uploadResume={uploadResume}
          loading={loading}
        />

        {loading && (
          <div className="mt-8">
            <Loader />
          </div>
        )}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Uploaded Resumes
          </h2>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Uploaded On
                  </th>

                  <th className="p-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {resumes.map((resume) => (

                  <tr
                    key={resume.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {resume.name}
                    </td>

                    <td className="p-4">
                      {resume.email}
                    </td>

                    <td className="p-4">
                      {resume.uploaded_at}
                    </td>

                    <td className="p-4 text-center">

                      <Link
                        to={`/resume/${resume.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;