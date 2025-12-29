import { Mail, Phone, MapPin } from "lucide-react";

const AccountantClassicTemplate = ({ data, accentColor }) => {
  const formatDateRange = (start, end) => {
    if (!start && !end) return "";
    return `${start || ""} - ${end || "Present"}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-gray-800">
      
      {/* HEADER */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {data.personal_info?.designation || "Professional Accountant"}
        </p>

        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 mt-3">
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              {data.personal_info.phone}
            </div>
          )}
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              {data.personal_info.email}
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              {data.personal_info.location}
            </div>
          )}
        </div>
      </header>

      <hr className="mb-6" style={{ borderColor: accentColor }} />

      {/* ABOUT ME */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="font-bold uppercase mb-2" style={{ color: accentColor }}>
            About Me
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold uppercase mb-3" style={{ color: accentColor }}>
            Education
          </h2>

          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <p className="font-semibold text-gray-900">
                  {edu.degree} {edu.field && `(${edu.field})`}
                </p>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">
                  {formatDateRange(edu.start_year, edu.end_year)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WORK EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold uppercase mb-3" style={{ color: accentColor }}>
            Work Experience
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <p className="font-semibold text-gray-900">{exp.company}</p>
                  <p className="text-gray-600">
                    {formatDateRange(exp.start_year, exp.end_year)}
                  </p>
                </div>
                <p className="italic text-sm text-gray-700">{exp.position}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="font-bold uppercase mb-3" style={{ color: accentColor }}>
            Skills
          </h2>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            {data.skills.map((skill, index) => (
              <div key={index}>• {skill}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AccountantClassicTemplate;
