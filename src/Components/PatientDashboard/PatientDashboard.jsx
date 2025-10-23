import RatingStars from "./RatingStars";

function PatientDashboard() {
  return (
    <div>
      {/* START: Right Bottom Panel (Table) */}
      <div className="w-full flex max-w-11/12 mx-10 p-4 items-start justify-start py-2">
        <div className="flex flex-col p-4 shadow-lg rounded-lg mt-4 mb-2 w-full hover:shadow-sm transition-all duration-200">
          <h3 className="text-base mb-3">Latest Patient/Doctor Onboarding</h3>
          <div className="flex justify-center items-start text-sm w-full flex-1 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {keyValues.map((key) => (
                    <th
                      key={key}
                      className="text-left py-2 mb-2 px-1 font-semibold border-b-1 border-gray-300"
                    >
                      {key === "specialty"
                        ? "Role"
                        : key === "appointment"
                        ? "Appt."
                        : key === "contact"
                        ? "Contact No."
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataValues.map((record) => (
                  <tr key={record.id}>
                    {keyValues.map((key) => {
                      const refProp = key === "contact" ? { ref: tdref } : {};

                      if (key === "image") {
                        return (
                          <td key={key} className="p-1">
                            <img
                              src={record.image}
                              alt={record.alt}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </td>
                        );
                      }

                      if (key === "status") {
                        let isOnline = record.status === "online";
                        return (
                          <td key={key}>
                            <span
                              className={`${
                                isOnline ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                        );
                      }

                      if (key === "contact") {
                        let number = record.contact.replace(/\s/g, "");
                        let length = number.length;
                        let contactNumber = record.contact;

                        if (cellWidth > 0 && length > cellWidth) {
                          contactNumber =
                            number.slice(0, cellWidth - 3) + "...";
                        }

                        return (
                          <td
                            key={key}
                            {...(record.id === dataValues[0].id ? refProp : {})}
                          >
                            {contactNumber}
                          </td>
                        );
                      }

                      if (key === "rating") {
                        let rate = record.rating;
                        return (
                          <td key={key}>
                            <RatingStars rate={rate} />
                          </td>
                        );
                      }

                      return <td key={key}>{record[key]}</td>;
                    })}
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

export default PatientDashboard;
