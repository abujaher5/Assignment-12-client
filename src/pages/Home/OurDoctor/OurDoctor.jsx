import { Rating } from "@smastrom/react-rating";
import { useState } from "react";

import "@smastrom/react-rating/style.css";
import { CiLocationOn } from "react-icons/ci";
import { BiCalendarEdit } from "react-icons/bi";
import { TiTime } from "react-icons/ti";

const OurDoctor = () => {
  const [rating, setRating] = useState(4);
  return (
    <div className="bg-white mt-10">
      <div className="text-center space-y-3 text-black">
        <h2 className="text-4xl font-bold">Our Expert Doctors</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, porro?
        </p>
      </div>
      {/* doctors card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8">
        <div className="card bg-base-100  shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>

          <div className="card-body items-start ">
            <h2 className="card-title">Dr. Kamal Uddin</h2>
            <p>New born and child specialist</p>
            <p>
              <Rating style={{ maxWidth: 150 }} value={rating} readOnly />
            </p>
            <p className="flex items-center justify-center gap-4">
              <CiLocationOn /> Agrabad, Chittagong, Bangladesh
            </p>
            <p className="flex items-center justify-center gap-4">
              <BiCalendarEdit /> Available On Sun,Tues and Wednesday
            </p>
            <p className="flex items-center justify-center gap-4">
              <TiTime /> From 10:00 am to 2:00 pm
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <button className="btn btn-wide text-white border-cyan-500 hover:bg-cyan-500">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurDoctor;
