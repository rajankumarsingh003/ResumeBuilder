



import {
  UploadCloudIcon,
  PlusIcon,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
  UploadCloud,
  LoaderCircleIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from 'react-pdftotext';


const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setshowCreateResume] = useState(false);
  const [showUploadResume, setshowUploadResume] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [isLoading, setisLoading]= useState(false)

const loadAllResumes = async () => {
  try {
    if (!token) return;

    const { data } = await api.get("/api/users/resumes", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // If user has resumes, use them, else fallback to dummyResumeData
    if (data.resumes && data.resumes.length > 0) {
      setAllResumes(data.resumes);
    } else {
      setAllResumes(dummyResumeData);
    }
  } catch (err) {
    console.log("Error loading resumes: ", err.response || err);
    toast.error(err?.response?.data?.message || err.message);
    // fallback to dummyResumeData
    setAllResumes(dummyResumeData);
  }
};




  // CREATE RESUME
  const createResume = async (e) => {
  e.preventDefault();
  if (!title) return toast.error("Title is required");

  try {
    const { data } = await api.post(
      "/api/resumes/create",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );


    const newResume = data.Resume; // ✅ FIX: use capital R

    if (newResume && newResume._id) {
      setAllResumes([...allResumes, newResume]);
      setTitle("");
      setshowCreateResume(false);
      navigate(`/app/builder/${newResume._id}`);
      toast.success(data.message || "Resume created successfully");
    } else {
      toast.error("Resume creation failed: invalid response");
    }
  } catch (err) {
    console.log("API error:", err.response || err);
    toast.error(err?.response?.data?.message || err.message);
  }
};


  // EDIT TITLE
  const editTitle = async (e) => {
  e.preventDefault();

  try {
    const { data } = await api.put(
      `/api/resumes/update`,
      { 
        resumeId: editResumeId,  // ✅ match backend
        resumeData: { title } 
      },
      { headers: { Authorization: `Bearer ${token}` } } // ✅ config object
    );

    // update local state
    setAllResumes(prev =>
      prev.map(resume =>
        resume._id === editResumeId ? { ...resume, title } : resume
      )
    );

    setTitle('');
    setEditResumeId('');
    toast.success(data.message || "Resume updated successfully");
  } catch (error) {
    console.log("Edit title error:", error.response || error);
    toast.error(error?.response?.data?.message || error.message);
  }
};


  // DELETE RESUME
const deleteResume = async (resumeId) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (!confirmDelete) return;

    // call backend
    const { data } = await api.delete(
      `/api/resumes/delete/${resumeId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // remove from state
    setAllResumes(prev => prev.filter(resume => resume._id !== resumeId));

    toast.success(data.message || "Resume deleted successfully");

  } catch (error) {
   
    toast.error(error?.response?.data?.message || error.message);
  }
};


const uploadResume = async (e) => {
  e.preventDefault();
  if (!resume) return toast.error("Please select a PDF file first");
  if (!title) return toast.error("Title is required");

  setisLoading(true);

  try {
    const resumeText = await pdfToText(resume); // converts PDF to text
    const { data } = await api.post(
      "/api/ai/upload-resume",
      { title, resumeText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const newResumeId = data.resumeId || data.Resume?._id;
    if (newResumeId) {
      setTitle("");
      setResume(null);
      setshowUploadResume(false);
      navigate(`/app/builder/${newResumeId}`);
      toast.success("Resume uploaded successfully");
      // reload resumes after upload
      loadAllResumes();
    } else {
      toast.error("Resume upload failed: invalid response");
    }
  } catch (error) {
    console.log("Upload error:", error.response || error);
    toast.error(error?.response?.data?.message || error.message);
  }

  setisLoading(false);
};



useEffect(() => {
  loadAllResumes();
}, [token]);


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, {user?.name || "User"}
        </p>

        {/* CREATE / UPLOAD BUTTONS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setshowCreateResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">Create Resume</p>
          </button>

          <button
            onClick={() => setshowUploadResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* RESUME CARDS */}
        <div className="grid grid-cols-2 sm:flex-wrap gap-4">
          {allResumes
            .filter((r) => r && r._id && r.title)
            .map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <button
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  <FilePenLineIcon
                    className="size-7 group-hover:scale-105"
                    style={{ color: baseColor }}
                  />
                  <p
                    className="text-sm group-hover:scale-105 px-2 text-center"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>
                  <p
                    className="absolute bottom-1 text-[11px] px-2 text-center"
                    style={{ color: baseColor + "90" }}
                  >
                    updated on{" "}
                    {resume.updatedAt
                      ? new Date(resume.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {/* ACTION ICONS */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-1 right-1 hidden group-hover:flex gap-1"
                  >
                    <TrashIcon
                      onClick={() => deleteResume(resume._id)}
                      className="size-7 p-1.5 hover:bg-white/50 rounded"
                    />
                    <PencilIcon
                      onClick={() => {
                        setEditResumeId(resume._id);
                        setTitle(resume.title);
                      }}
                      className="size-7 p-1.5 hover:bg-white/50 rounded"
                    />
                    <UploadCloudIcon className="size-7 p-1.5 hover:bg-white/50 rounded" />
                  </div>
                </button>
              );
            })}
        </div>

        {/* CREATE RESUME MODAL */}
        {showCreateResume && (
          <div
            onClick={() => setshowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setshowCreateResume(false)}
              />
            </form>
          </div>
        )}

        {/* UPLOAD RESUME MODAL */}
        {showUploadResume && (
          <div
            onClick={() => setshowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded"
                required
              />
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <div className="flex flex-col items-center justify-center gap-2 border border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 cursor-pointer">
                  {resume ? (
                    <p className="text-green-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-14 stroke-1" />
                      <p>Upload resume</p>
                    </>
                  )}
                </div>
              </label>
              <button disabled={isLoading} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white"/>}
                {isLoading ? 'uploading...' : 'Upload Resume'}
               
              </button>
              <XIcon
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setshowUploadResume(false)}
              />
            </form>
          </div>
        )}

        {/* EDIT TITLE MODAL */}
        {editResumeId && (
          <div
            onClick={() => setEditResumeId(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <form
              onSubmit={editTitle}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setEditResumeId(null)}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
