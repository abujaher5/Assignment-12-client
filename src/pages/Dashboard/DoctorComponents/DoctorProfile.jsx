import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaUserDoctor,
  FaStethoscope,
  FaLocationDot,
  FaCalendarDays,
  FaClock,
  FaImage,
  FaNoteSticky,
  FaFloppyDisk,
} from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

const DoctorProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctorProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/doctors/email/${user.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  useEffect(() => {
    if (profile) {
      reset(profile);
    } else if (profile === null) {
      reset({ name: user?.displayName, email: user?.email });
    }
  }, [profile, reset, user]);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      specialize: data.specialize,
      location: data.location,
      availableOn: data.availableOn,
      availableTime: data.availableTime,
      about: data.about,
      email: data.email,
      image: data.image,
    };

    const res = profile
      ? await axiosSecure.patch(`/doctors/${profile._id}`, payload)
      : await axiosSecure.post("/doctors", payload);

    const success = profile
      ? res.data.modifiedCount > 0
      : Boolean(res.data.insertedId);

    if (success || !profile) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile saved successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "No changes to save",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl text-white">
          <FaUserDoctor />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            My Profile
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your professional details, availability and schedule.
          </p>
        </div>
      </div>

      {!profile && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          No directory profile was found for your account. Fill in the form below
          to create it.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30 sm:grid-cols-2 sm:p-8"
      >
        <div>
          <label className={labelClass}>Full Name</label>
          <div className="relative">
            <FaUserDoctor className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass}
              placeholder="Doctor name"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Specialization</label>
          <div className="relative">
            <FaStethoscope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass}
              placeholder="e.g. Cardiologist"
              {...register("specialize", {
                required: "Specialization is required",
              })}
            />
          </div>
          {errors.specialize && (
            <p className="mt-1 text-xs text-red-500">
              {errors.specialize.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Account Email</label>
          <div className="relative">
            <FaNoteSticky className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              readOnly
              className={`${inputClass} cursor-not-allowed opacity-70`}
              {...register("email")}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <div className="relative">
            <FaLocationDot className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass}
              placeholder="Chamber / Hospital location"
              {...register("location", { required: "Location is required" })}
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Available On</label>
          <div className="relative">
            <FaCalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass}
              placeholder="Sat, Sun, Mon"
              {...register("availableOn", {
                required: "Availability days are required",
              })}
            />
          </div>
          {errors.availableOn && (
            <p className="mt-1 text-xs text-red-500">
              {errors.availableOn.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Available Time</label>
          <div className="relative">
            <FaClock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass}
              placeholder="10.00 am to 2.00 pm"
              {...register("availableTime", {
                required: "Availability time is required",
              })}
            />
          </div>
          {errors.availableTime && (
            <p className="mt-1 text-xs text-red-500">
              {errors.availableTime.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Photo URL</label>
          <div className="relative">
            <FaImage className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass}
              placeholder="https://..."
              {...register("image")}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>About</label>
          <textarea
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20"
            placeholder="Short professional bio"
            {...register("about")}
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-70 dark:shadow-blue-900/30"
          >
            <FaFloppyDisk /> Save Profile
          </button>
        </div>
      </form>
    </section>
  );
};

export default DoctorProfile;
