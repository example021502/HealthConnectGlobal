import React, { useState, useContext } from "react";
import Icon from "../../common/Icon";
import Image from "../../common/Image";
import { expandingContext } from "../../contexts/ExpandingContext";

function ImageContent() {
  const { expand_label, setExpand_label } = useContext(expandingContext);
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
      <Image
        imgLink="https://i.ibb.co/nM5tkWVp/a-call-away.jpg"
        alt=""
        class_name="w-full min-h-80 object-cover rounded-standard md:w-150"
      />
      <div className="w-full p-4 mb-4">
        <ul className="flex items-start justify-center flex-col gap-4">
          {objectives.map((objective, index) => {
            const [expand, setExpand] = useState(false);
            const handleExpanding = (label) => {
              if (expand_label === label) {
                setExpand_label("");
                return;
              }
              setExpand_label(label);
            };
            const limit = 80;
            return (
              <li
                key={index}
                className="flex flex-col gap-1 items-start justify-center"
              >
                <span className="font-lighter text-md tracking-wide">
                  {objective.head}
                </span>
                <span className="font-light text-sm tracking-wide">
                  {objective.description.slice(
                    0,
                    expand_label === objective.head
                      ? objective.description.length
                      : limit
                  )}
                  {expand_label != objective.head ? (
                    <span
                      onClick={() => handleExpanding(objective.head)}
                      className="font-lighter text-sm cursor-pointer"
                    >
                      ...
                      <Icon icon="ri-arrow-down-s-line" />
                    </span>
                  ) : (
                    <span
                      onClick={() => handleExpanding(objective.head)}
                      className="font-lighter text-sm cursor-pointer"
                    >
                      <Icon icon="ri-arrow-up-s-line" />
                    </span>
                  )}
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
