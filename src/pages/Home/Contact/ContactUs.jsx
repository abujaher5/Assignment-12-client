import { BiCurrentLocation, BiMailSend, BiPhone } from "react-icons/bi";
import { FaMailBulk } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="my-10">
      <section className="py-6 bg-gray-800 dark:bg-gray-100 space-y-10 text-gray-50 dark:text-gray-900">
        <div className="grid  grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <form
            noValidate=""
            className="flex flex-col py-6 space-y-4 md:py-0 md:px-6"
          >
            <label className="block">
              <span className="mb-1 font-semibold">Your Full Name</span>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="block w-full border p-1 border-black rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 focus:dark:ring-violet-600 bg-gray-800 dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1 font-semibold">Your Email Address</span>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="block w-full border border-black p-1 rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 focus:dark:ring-violet-600 bg-gray-800 dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1 font-semibold">Your Mobile Number </span>
              <input
                type="number"
                placeholder="0123456789"
                className="block w-full border border-black p-1 rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 focus:dark:ring-violet-600 bg-gray-800 dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1 font-semibold">Your Message</span>
              <textarea
                rows="3"
                placeholder="Type Your Message"
                className="block w-full border border-black p-1 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 focus:dark:ring-violet-600 bg-gray-800 dark:bg-gray-100"
              ></textarea>
            </label>
            <button
              type="button"
              className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50 focus:ring-violet-400 focus:dark:ring-violet-600 hover:ring-violet-400 hover:dark:ring-violet-600"
            >
              Send Message
            </button>
          </form>
          <div className="flex justify-center items-center ">
            <div className="py-6 md:py-0 md:px-6 ">
              <h1 className=" text-3xl md:text-4xl lg:text-4xl font-semibold text-center uppercase">
                Contact With Us
              </h1>
              <p className="pt-2 pb-4 text-center">
                Feel Free To Come Physically To Our Diagnostic Center
              </p>
              <div className="space-y-4 flex flex-col  items-center md:items-start lg:items-start">
                <p className="flex items-center gap-3">
                  <IoLocationSharp />
                  <span>Chittagong, Bangladesh</span>
                </p>
                <p className="flex items-center gap-3">
                  <MdLocalPhone />
                  <span>+880 1234567890</span>
                </p>
                <p className="flex items-center gap-3 ">
                  <BiMailSend className=" mt-1 md:mt-2 lg:mt-2" />
                  <span>contact@business.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
