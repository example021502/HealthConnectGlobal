import React from "react";

function ImageContent() {
  const objectives = [
    {
      head: "Global Accessibility & Borderless Consultation",
      description:
        "Eliminate geographical barriers by providing a seamless interface for cross-border video consultations. This includes integrated multi-language support and real-time translation to ensure clear communication between patients and specialists worldwide.",
    },
    {
      head: "Unified Electronic Health Records (EHR) Portability",
      description:
        "Enable patients to maintain a single, secure digital health profile that is accessible to authorized providers globally. This ensures continuity of care by allowing doctors to review medical histories and lab results regardless of the patient's location.",
      head: " Verification and Quality Standardization",
      description:
        "Establish a rigorous credentialing system to vet all participating medical professionals against international standards. This objective builds user trust by offering transparent access to verified licenses, certifications, and peer-reviewed performance ratings.",
    },
    {
      head: "End-to-End Data Security and Compliance",
      description:
        "Implement high-level encryption and strict adherence to global privacy regulations like HIPAA, GDPR, and PIPEDA. This ensures that sensitive patient data remains protected and compliant with the legal requirements of multiple international jurisdictions.",
    },
    {
      head: "Automated Appointment and Medical Logistics Management",
      description:
        "Streamline the healthcare journey with an automated engine for time-zone-aware scheduling and instant digital bookings. The system reduces administrative overhead by handling everything from initial consultations to medical tourism documentation in one place.",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:flex flex-row items-center justify-center gap-4">
      <img
        src="https://i.ibb.co/nM5tkWVp/a-call-away.jpg"
        alt=""
        className="w-full min-h-110 object-cover rounded-standard md:w-150"
      />
      <div className="w-full p-4 mb-4">
        <h1 className="font-bold text-primary mb-2">Objectives</h1>
        <ul className="flex items-start justify-center flex-col gap-4">
          {objectives.map((objective, index) => {
            return (
              <li
                key={index}
                className="flex flex-col gap-1 items-start justify-center"
              >
                <span className="font-lighter text-sm tracking-wide">
                  {objective.head}
                </span>
                <span className="font-light text-xs tracking-wide">
                  {objective.description}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ImageContent;
