import React from "react";
import { Bell, User, LogOut } from "lucide-react";

function PatientDashboard() {
  let noteNumber = 21;
  return (
    <div className="flex flex-col bg-gray-50 h-screen w-full">
      {/* Top section */}
      <section className="py-4 px-7 shadow bg-white flex flex-row items-center -justify-start">
        <img
          src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
          alt=""
          className="h-10 w-10 object-contain mr-2 rounded-full"
        />
        <h1 className="text-2xl font-bold">InterHealthConnect</h1>
        <div className="ml-auto border-1 flex flex-row gap-4 text-white items-center justify-center w-fit">
          <div className="relative w-fit">
            <p className="absolute p-1 bottom-[100%] text-[0.6em] w-fit h-fit rounded-full bg-indigo-600 text-white font-semibold right-0">
              {noteNumber}
            </p>
            <Bell className="w-6 h-6 border-1" />
          </div>
          <div className="relative w-fit">
            <p className="absolute p-1 bottom-[100%] text-[0.6em] w-fit h-fit rounded-full bg-indigo-600 text-white font-semibold right-0">
              {noteNumber}
            </p>
            <User className="w-6 h-6 border-1" />
          </div>
          <div className="relative w-fit">
            <p className="absolute p-1 bottom-[100%] text-[0.6em] w-fit h-fit rounded-full bg-indigo-600 text-white font-semibold right-0">
              {noteNumber}
            </p>
            <LogOut className="w-6 h-6 border-1" />
          </div>
        </div>
      </section>

      {/* middle section */}
      <section className="bg-white flex flex-row justify-start h-full w-full">
        {/* left div */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-lg text-white h-full w-1/5 flex flex-col items-start p-4 gap-6">
          <button className="font-semibold tracking-wide gap-2 bg-blue-500 flex items-center justify-start px-3 py-2 rounded-full w-full hover:bg-blue-400 transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>My Health Data</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-blue-500 flex items-center justify-start px-3 py-2 rounded-full w-full hover:bg-blue-400 transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Performance</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-blue-500 flex items-center justify-start px-3 py-2 rounded-full w-full hover:bg-blue-400 transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Appointments</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-blue-500 flex items-center justify-start px-3 py-2 rounded-full w-full hover:bg-blue-400 transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Find Care</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-blue-500 flex items-center justify-start px-3 py-2 rounded-full w-full hover:bg-blue-400 transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Messages</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-blue-500 flex items-center justify-start px-3 py-2 rounded-full w-full hover:bg-blue-400 transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Settings</span>
          </button>
        </div>

        {/* right div */}
        <div className="bg-gray-100 h-full w-4/5 p-4 flex items-center justify-center">
          Add New Patient
        </div>
      </section>

      {/* footer section */}
      <section className="p-4 bg-blue-500 text-white w-full">
        <h2 className="text-xl font-semibold">Footer Section</h2>
      </section>
    </div>
  );
}

export default PatientDashboard;
