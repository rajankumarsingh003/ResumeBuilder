





import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkle,
  User,
} from 'lucide-react'

import PersonalinfoForm from '../components/PersonalinfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'


const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)



  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    projects: [],   
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })




  const loadExistingResume = async () => {
    if (!resumeId) return;

    try {
      const { data } = await api.get(
        `/api/resumes/get/${resumeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.resume) {
        const resume = data.resume;

        
        setResumeData({
          ...resume,
          projects: resume.projects || resume.project || [],
        });

        document.title = resume.title || "Resume Builder";
      }
    } catch (error) {
      console.log(
        "Error loading resume:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to load resume");
    }
  };




  useEffect(() => {
    loadExistingResume();
  }, [resumeId, token]);



  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'project', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkle },
  ]

  const activeSection = sections[activeSectionIndex]




  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );

      const { data } = await api.put(
        "/api/resumes/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      setResumeData((prev) => ({
        ...prev,
        public: !prev.public,
      }));

      // ⚠️ backend typo fix
      toast.success(data.messgae || "Visibility updated");

    } catch (error) {
      console.error("Error Saving Resume", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };




  const handleShare = () => {
    const baseUrl = window.location.origin
    const resumeUrl = `${baseUrl}/view/${resumeId}`

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: 'My Resume' })
    } else {
      alert('Share not supported on this browser')
    }
  }

  const downloadResume = () => {
    window.print();
  };




  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      // 🧹 remove image object from JSON payload
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));

      // ✅ correct key name
      if (removeBackground) {
        formData.append("removeBackground", "yes");
      }

      // ✅ correct image append
      if (typeof resumeData.personal_info.image === "object") {
        formData.append("image", resumeData.personal_info.image);
      }

      const { data } = await api.put(
        "/api/resumes/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ update state from backend
      setResumeData(data.resume);

      // ⚠️ backend typo handling
      toast.success(data.messgae || "Resume saved successfully");

    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };









  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {/* Back */}
      <div className="py-6 print:hidden">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon className="size-4" />
          Back To Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT FORM */}
        <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 print:hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <div className="flex gap-2">
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onchange={template =>
                  setResumeData(prev => ({ ...prev, template }))
                }
              />

              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={color =>
                  setResumeData(prev => ({ ...prev, accent_color: color }))
                }
              />
            </div>

        



            {/* Navigation Buttons + Toggle Bar */}
            <div className="flex flex-col gap-2">
              {/* Toggle Bar */}
              <div className="flex gap-1 mb-2">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`flex-1 h-1 rounded-full transition-colors duration-300 ${index <= activeSectionIndex
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                      }`}
                  ></div>
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={activeSectionIndex === 0}
                  className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  <ChevronLeft className="size-4" />
                  Prev
                </button>

                <button
                  onClick={() =>
                    setActiveSectionIndex((prev) =>
                      Math.min(prev + 1, sections.length - 1)
                    )
                  }
                  disabled={activeSectionIndex === sections.length - 1}
                  className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>





          </div>

          {/* Forms */}

          {activeSection.id === 'personal' && (
            <PersonalinfoForm
              data={resumeData.personal_info}
              onChange={data =>
                setResumeData(prev => ({ ...prev, personal_info: data }))
              }
              removeBackground={removeBackground}
              setRemoveBackground={setRemoveBackground}
            />
          )}


          {activeSection.id === 'summary' && (
            <ProfessionalSummaryForm
              data={resumeData.professional_summary}
              onChange={data =>
                setResumeData(prev => ({ ...prev, professional_summary: data }))
              }
            />
          )}



          {activeSection.id === 'project' && (
            <ProjectForm
              data={resumeData.projects}
              onChange={(data) =>
                setResumeData(prev => ({ ...prev, projects: data }))
              }
            />
          )}



          {activeSection.id === 'experience' && (
            <ExperienceForm
              data={resumeData.experience}
              onChange={data =>
                setResumeData(prev => ({ ...prev, experience: data }))
              }
            />
          )}

          {activeSection.id === 'education' && (
            <EducationForm
              data={resumeData.education}
              onChange={data =>
                setResumeData(prev => ({ ...prev, education: data }))
             

              }
              
            />
          )}

       
          {activeSection.id === 'skills' && (
            <SkillsForm
              data={resumeData.skills}
              onChange={data =>
                setResumeData(prev => ({ ...prev, skills: data }))
              }
            />
          )}



          <button onClick={() => { toast.promise(saveResume, { loading: 'Saving...' }) }} className='bg-gradient-to-brfrom-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transitions-all rounded-md px-6 py-2 mt-6 text-sm'>
            Save Changes

          </button>

        </div>



{/* RIGHT PREVIEW */}
<div className="lg:col-span-7 relative mt-6 lg:mt-0">
  {/* Action Buttons */}
  {/* <div className="absolute top-0 right-0 z-10 flex gap-2 print:hidden"> */}
  <div className="
  absolute top-0 right-0 z-10
  flex flex-wrap gap-2
  print:hidden
">

    {resumeData.public && (
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg"
      >
        <Share2Icon className="w-4 h-4" />
        Share
      </button>
    )}

    <button
      onClick={changeResumeVisibility}
      className="flex items-center gap-2 px-3 py-2 text-xs bg-purple-100 text-purple-700 rounded-lg"
    >
      {resumeData.public ? (
        <EyeIcon className="w-4 h-4" />
      ) : (
        <EyeOffIcon className="w-4 h-4" />
      )}
      {resumeData.public ? 'Public' : 'Private'}
    </button>

    <button
      onClick={downloadResume}
      className="flex items-center gap-2 px-3 py-2 text-xs bg-green-100 text-green-700 rounded-lg"
    >
      <DownloadIcon className="w-4 h-4" />
      Download
    </button>
  </div>

  {/* PRINT AREA */}
 
<div
  id="resume-print-area"
  className="
    bg-white mx-auto mt-6
    scale-[0.75] 
    sm:scale-100 
    origin-top
  "
  style={{
    width: '210mm',
    minHeight: '297mm',
    padding: '15mm',
    boxSizing: 'border-box',
  }}
>


    <ResumePreview
      data={resumeData}
      template={resumeData.template}
      accentColor={resumeData.accent_color}
      removeBackground={removeBackground}
    />
  </div>
</div>



      </div>
    </div>
  )
}

export default ResumeBuilder
