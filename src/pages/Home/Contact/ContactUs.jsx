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
                placeholder="name@gmail.com"
                className="block w-full border border-black p-1 rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 focus:dark:ring-violet-600 bg-gray-800 dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1 font-semibold">Your Number </span>
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
              <h1 className="text-4xl font-bold">Contact With Us</h1>
              <p className="pt-2 pb-4">
                Feel Free To Come Physically To Our Diagnostic Center
              </p>
              <div className="space-y-4">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Fake address, 9999 City</span>
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>123456789</span>
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
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
