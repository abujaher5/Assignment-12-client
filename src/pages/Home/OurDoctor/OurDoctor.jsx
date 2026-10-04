import { useQuery } from "@tanstack/react-query";
import { FaUserDoctor } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DoctorCard from "./DoctorCard";

const OurDoctor = () => {
  const axiosSecure = useAxiosSecure();

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/doctors");
      return res.data;
    },
  });

  return (
    <section className="bg-white py-16 dark:bg-[#1c2229] lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaUserDoctor className="text-base" /> Meet Our Specialists
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
            Our Expert Doctors
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            Consult our experienced and certified specialists for accurate
            diagnosis and compassionate care at every step of your health
            journey.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-3xl border border-slate-100 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
            <FaUserDoctor className="text-5xl text-slate-300 dark:text-slate-600" />
            <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
              No doctors available at the moment
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Please check back later for our specialist doctors.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurDoctor;
