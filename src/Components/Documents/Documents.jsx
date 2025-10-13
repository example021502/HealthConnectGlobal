import React from "react";
// NOTE: No dedicated CSS file is needed now.
// The image URL remains the same for the logo.

function Documents() {
  return (
    // .history_container_div
    <div className="flex flex-col items-center justify-center w-full mx-0 py-8 bg-gray-50">
      {/* .history_top_bar_div */}
      <div className="flex flex-row items-center w-[80%] p-4 mx-auto mb-8 bg-white rounded-md shadow-md">
        {/* .logo_icon (using a div with inline style for the image) */}
        <div
          className="mr-4 h-10 w-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://i.ibb.co/pjRdgCRL/Gemini-Generated-Image-1ubt531ubt531ubt-removebg-preview.png")`,
          }}
        />

        {/* .text_search_bar_div */}
        <div className="flex flex-col items-start justify-start mx-4">
          <h2 className="text-xl font-semibold mb-1 text-gray-800">
            My Documents: Secure Health Vault
          </h2>

          {/* .search_bar_div */}
          <div className="relative w-[350px] flex items-center justify-center">
            <input
              type="text"
              placeholder="Search by keyword, date, or doctor..."
              className="flex-1 px-4 py-2 text-sm border border-gray-300 outline-none rounded-lg focus:border-blue-500"
            />
            {/* Search Icon */}
            <i className="ri-search-line absolute right-4 text-base text-gray-500 z-10 cursor-pointer transition-all duration-200 hover:text-gray-700 hover:scale-110" />
          </div>
        </div>

        {/* .add_document_div */}
        <div className="ml-auto flex items-center justify-center px-4 py-2 text-sm cursor-pointer transition-all duration-200 hover:text-green-900 hover:font-bold hover:translate-y-[-2px] hover:scale-[1.02]">
          {/* Icon */}
          <i className="ri-add-line text-2xl text-white bg-green-700 border border-green-700 rounded-full mr-1 flex items-center justify-center transition-all duration-200 p-0.5" />
          {/* Text */}
          <span className="text-green-700 font-medium text-base">
            Add Document
          </span>
        </div>
      </div>

      {/* .documents_bottom_container_div */}
      <div className="flex flex-row items-start w-[90%] p-8 gap-8 rounded-md">
        {/* .document_bottom_left_div */}
        <div className="flex flex-col items-center justify-center w-80 bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-medium tracking-wide pb-1 mb-3 mt-4 border-b border-gray-300 w-full text-center">
            Quick Access
          </h2>

          {/* Latest MRI */}
          <p className="flex items-center justify-start w-4/5 p-3 my-2 text-sm bg-white rounded-md shadow-md cursor-pointer transition-all duration-200 hover:translate-y-[-2px] hover:scale-[1.01]">
            <i className="ri-first-aid-kit-line text-lg text-green-700 mr-2" />
            Latest MRI
          </p>

          {/* Annual Physical Report */}
          <p className="flex items-center justify-start w-4/5 p-3 my-2 text-sm bg-white rounded-md shadow-md cursor-pointer transition-all duration-200 hover:translate-y-[-2px] hover:scale-[1.01]">
            <i className="ri-history-line text-lg text-green-700 mr-2" />
            Annual Physical Report Medication List
          </p>

          {/* Urgent Data: Allergies */}
          <ul className="flex flex-col items-center w-4/5 p-4 mt-4 bg-red-100 rounded-md shadow-md transition-all duration-200">
            <span className="w-full text-left text-lg font-semibold text-red-700 mb-1">
              Urgent Data: Allergies
            </span>
            <li className="list-none w-[90%] text-left my-0.5 text-base">
              Pencillin
            </li>
            <li className="list-none w-[90%] text-left my-0.5 text-base">
              Sheliff
            </li>
            <li className="list-none w-[90%] text-left my-0.5 text-base">
              Dust Mites
            </li>
          </ul>

          {/* Last Added Documents */}
          <div className="flex flex-col items-center justify-center w-4/5 p-4 my-4 rounded-md shadow-md bg-white">
            <h3 className="w-full text-sm font-semibold tracking-wider pb-1 mb-1 border-b border-gray-300 text-gray-800">
              Last 5 Added{" "}
              <i className="ri-history-line text-base text-green-700 ml-1" />
            </h3>
            <p className="w-full text-left text-xs font-light my-0.5">
              Ootho Consult (09/28/25)
            </p>
            <p className="w-full text-left text-xs font-light my-0.5">
              Dental X-Ray{" "}
            </p>
            <p className="w-full text-left text-xs font-light my-0.5">
              Vaccine Record (09/15/25)
            </p>
            <p className="w-full text-left text-xs font-light my-0.5">
              Insurance Card (09/10/25)
            </p>
          </div>
        </div>

        {/* .document_bottom_right_div */}
        <div className="flex flex-col flex-1 items-center justify-center p-4 bg-white rounded-md shadow-md gap-4">
          {/* List 1: Clinical History */}
          <ul className="w-[90%] rounded-md">
            <p className="text-xl font-semibold tracking-wider w-full mb-2 text-gray-800">
              1. My Clinical History
            </p>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-heart-pulse-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  Complete Blood Count
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Quest Diagnosis
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                10/05/2025
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-microscope-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  Spine MRI Report
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Dr. Emily Chen
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                10/05/2025
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-mental-health-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  Psychiatric Evaluation
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Dr. Alex Johnson
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                10/05/2025
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
          </ul>

          {/* List 2: Treatments & Medications */}
          <ul className="w-[90%] rounded-md">
            <p className="text-xl font-semibold tracking-wider w-full mb-2 text-gray-800">
              2. Treatments & Medications
            </p>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-dna-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  Current Medication List
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Vaccination Record (ibuporen)
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                10/05/2025
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-dna-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  E-Prescription Report (2024)
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Allergies: Penicillin, Shelleff
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                10/05/2025
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
          </ul>

          {/* List 3: Health & Wellness Data */}
          <ul className="w-[90%] rounded-md">
            <p className="text-xl font-semibold tracking-wider w-full mb-2 text-gray-800">
              3. Health & Wellness Data
            </p>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-heart-pulse-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  Blood Pressure Log (Q3 Report)
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Physical Therapy Plan
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                10/05/2025
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-heart-pulse-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  Blood Sugar Records (Last 6 Months)
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Dietary Recommendations
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                10/05/2025
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
          </ul>

          {/* List 4: Administrative & Legal */}
          <ul className="w-[90%] rounded-md">
            <p className="text-xl font-semibold tracking-wider w-full mb-2 text-gray-800">
              4. Administrative & Legal
            </p>
            <li className="list-none my-4 p-4 flex items-center text-sm font-normal shadow-md bg-gray-50 rounded-md">
              <i className="ri-bank-card-line text-2xl text-green-700 mr-3" />
              <span className="flex flex-col items-start justify-center flex-1 text-sm">
                <span className="font-medium text-gray-800">
                  Insurance Card (2024)
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  Advance Healthcare Directive
                </span>
              </span>
              <span className="ml-auto flex items-end justify-center text-sm text-green-700">
                Living Will
                <i className="ri-download-line text-lg border border-green-900 rounded-full p-0.5 ml-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-700 hover:text-white hover:scale-125" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Documents;
