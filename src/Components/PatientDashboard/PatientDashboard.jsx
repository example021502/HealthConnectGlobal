import React, { useContext } from "react";
import { AuthContext } from "../Context/Context";

function PatientDashboard() {
  const { view, userName } = useContext(AuthContext);

  console.log("The view is: ", view);
  console.log("The userName is: ", userName);

  return (
    <div className="w-full h-fit bg-gray-100">
      <div className="flex flex-col items-center justify-start w-full h-fit">
        <section className="relative flex w-full h-fit">
          <div className="absolute inset-0 z-1 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
          </div>
          <div className="z-10 w-full h-fit p-4 gap-2 grid grid-cols-1 md:flex">
            <div className="border-1">
              <img
                src="https://i.ibb.co/jZsMsxgS/Untitled-1.png "
                alt="IntehealthConnect"
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="border-1  border-blue-600">image</div>
            <div className="border-1 border-green-700">form</div>
          </div>
        </section>
        <section>middle1 section</section>
        <section>middle2 section</section>
        <section>middle3 section</section>
        <section>middle4 section</section>
        <section>middle5 section</section>
        <section>middle6 section</section>
        <section>middle7 section</section>
        <section>Footer section</section>
      </div>
    </div>
  );
}

export default PatientDashboard;
