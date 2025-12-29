import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DownloadIcon } from "lucide-react";
import ResumePreview from "./ResumePreview";

const ResumePrint = ({ resumeData, template, accentColor }) => {
  const componentRef = useRef(null); // ref jo DOM ko point karega

  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // ✅ ye ref pass karna zaruri
    documentTitle: resumeData.personal_info?.full_name || "resume",
  });

  // Tabhi render kare jab resumeData ready ho
  if (!resumeData._id) return null;

  return (
    <div>
      {/* Download/Print Button */}
      <div className="flex gap-2 mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-3 py-2 text-xs bg-green-100 text-green-700 rounded-lg"
        >
          <DownloadIcon className="size-4" />
          Download
        </button>
      </div>

      {/* Print Area */}
      <div ref={componentRef}>
        <ResumePreview
          data={resumeData}
          template={template}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
};

export default ResumePrint;
