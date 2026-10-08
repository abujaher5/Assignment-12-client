import { Rating } from "@smastrom/react-rating";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  FaUserDoctor,
  FaStethoscope,
  FaLocationDot,
  FaCalendarDays,
  FaClock,
  FaArrowLeft,
  FaCalendarCheck,
  FaChevronRight,
  FaShieldHeart,
  FaClipboardCheck,
  FaHouseMedical,
} from "react-icons/fa6";
import "@smastrom/react-rating/style.css";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const highlights = [
  {
    icon: <FaShieldHeart />,
    title: "Trusted Care",
    text: "Certified & experienced",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Diagnosis",
    text: "Accurate analysis",
  },
  {
    icon: <FaHouseMedical />,
    title: "Comfort",
    text: "Patient first approach",
  },
];

const DoctorDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = useLoaderData();
  const {
    _id,
    name,
    specialize,
    location: doctorLocation,
    availableOn,
    availableTime,
    image,
    rating,
    email: doctorEmail,
  } = doctor;

  const { register, handleSubmit, reset } = useForm();

  const handleBooking = (data) => {
    if (!user?.email) {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to book an appointment",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Please Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    const appointment = {
      doctorId: _id,
      doctorName: name,
      doctorEmail,
      specialize,
      image,
      email: user.email,
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
    };

    axiosSecure.post("/appointments", appointment).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Appointment with ${name} booked successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myAppointment");
      }
    });
  };

  return (
    <section className="bg-slate-50 py-10 dark:bg-[#1c2229] lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400 sm:text-sm">
          <Link to="/" className="transition hover:text-blue-600">
            Home
          </Link>
          <FaChevronRight className="text-[10px]" />
          <Link to="/" className="transition hover:text-blue-600">
            Doctors
          </Link>
          <FaChevronRight className="text-[10px]" />
          <span className="truncate text-slate-600 dark:text-slate-300">
            {name}
          </span>
        </nav>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-80 lg:h-full lg:min-h-[520px]">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 text-slate-300 dark:from-slate-700 dark:to-slate-800 dark:text-slate-600">
                  <FaUserDoctor className="text-6xl" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute inset-x-6 bottom-5">
                <Rating style={{ maxWidth: 130 }} value={rating || 5} readOnly />
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                <FaUserDoctor /> Available For Appointment
              </span>

              <h1 className="mt-4 text-2xl font-extrabold text-slate-800 dark:text-white lg:text-3xl">
                {name}
              </h1>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                <FaStethoscope className="text-xs" />
                {specialize || "Consultant Specialist"}
              </p>

              <div className="mt-6 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
                <p className="flex items-start gap-3">
                  <FaLocationDot className="mt-0.5 shrink-0 text-blue-500" />
                  <span>{doctorLocation || "Location not specified"}</span>
                </p>
                <p className="flex items-start gap-3">
                  <FaCalendarDays className="mt-0.5 shrink-0 text-blue-500" />
                  <span>{availableOn || "Schedule unavailable"}</span>
                </p>
                <p className="flex items-start gap-3">
                  <FaClock className="mt-0.5 shrink-0 text-blue-500" />
                  <span>{availableTime || "Time unavailable"}</span>
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/40"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-sm text-blue-600 dark:text-blue-400">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30 sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-800 dark:text-white">
            <FaCalendarCheck className="text-blue-600 dark:text-blue-400" />
            Book An Appointment
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill in your details and confirm your appointment with {name}.
          </p>

          <form
            onSubmit={handleSubmit(handleBooking)}
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-slate-600 dark:text-slate-300">
                  Patient Name*
                </span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName || ""}
                placeholder="Patient Name"
                {...register("patientName", { required: true })}
                className="input input-bordered w-full border-slate-200 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-slate-600 dark:text-slate-300">
                  Phone Number*
                </span>
              </label>
              <input
                type="tel"
                placeholder="01xxxxxxxxx"
                {...register("patientPhone", { required: true })}
                className="input input-bordered w-full border-slate-200 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-slate-600 dark:text-slate-300">
                  Appointment Date*
                </span>
              </label>
              <input
                type="date"
                {...register("appointmentDate", { required: true })}
                className="input input-bordered w-full border-slate-200 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-slate-600 dark:text-slate-300">
                  Appointment Time*
                </span>
              </label>
              <input
                type="time"
                {...register("appointmentTime", { required: true })}
                className="input input-bordered w-full border-slate-200 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-blue-900/30"
              >
                <FaCalendarCheck /> Confirm Appointment
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-600 dark:text-slate-300"
              >
                <FaArrowLeft /> Back to Doctors
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
