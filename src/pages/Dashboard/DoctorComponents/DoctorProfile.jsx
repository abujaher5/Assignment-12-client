import { useEffect, useState } from "react";
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
  FaPenToSquare,
  FaEnvelope,
  FaXmark,
} from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

const cardClass =
  "rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30";

const DoctorProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctorProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/doctors/email/${user.email}`);
      return res.data || null;
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
      await refetch();
      setIsEditing(false);
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

  const showForm = !profile || isEditing;

  const displayName = profile?.name || user?.displayName || "Doctor";
  const avatar =
    profile?.image ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=2563eb&color=fff&bold=true`;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl text-white">
            <FaUserDoctor />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              My Profile
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {profile
                ? "Your professional details, availability and schedule."
                : "Create your professional profile to appear in the doctor directory."}
            </p>
          </div>
        </div>

        {profile && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 dark:shadow-blue-900/30"
          >
            <FaPenToSquare /> Edit Profile
          </button>
        )}
      </div>

      {!profile && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          No professional profile was found for your account. Fill in the form
          below to create it.
        </div>
      )}

      {!showForm && (
        <>
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
            <div className="h-24 bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500" />
            <div className="px-5 pb-6 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <img
                    src={avatar}
                    alt={displayName}
                    className="-mt-12 h-24 w-24 shrink-0 rounded-2xl border-4 border-white object-cover shadow-md dark:border-slate-800"
                  />
                  <div className="min-w-0 pb-1">
                    <h3 className="truncate text-xl font-extrabold text-slate-800 dark:text-white">
                      {displayName}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-2 truncate text-sm text-slate-500 dark:text-slate-400">
                      <FaEnvelope className="shrink-0 text-blue-500" />
                      {profile.email || user?.email}
                    </p>
                  </div>
                </div>

                {profile.specialize && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    <FaStethoscope /> {profile.specialize}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Professional Information
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              These details are shown to patients in the doctor directory.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <FaStethoscope />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Specialization
                  </p>
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                    {profile.specialize || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <FaLocationDot />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Chamber
                  </p>
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                    {profile.location || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FaCalendarDays />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Available On
                  </p>
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                    {profile.availableOn || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <FaClock />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Available Time
                  </p>
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                    {profile.availableTime || "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {profile.about && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  About
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {profile.about}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {showForm && (
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
              <p className="mt-1 text-xs text-red-500">
                {errors.location.message}
              </p>
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

          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-70 dark:shadow-blue-900/30"
            >
              <FaFloppyDisk /> {profile ? "Save Changes" : "Create Profile"}
            </button>

            {profile && (
              <button
                type="button"
                onClick={() => {
                  reset(profile);
                  setIsEditing(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-900/40"
              >
                <FaXmark /> Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
};

export default DoctorProfile;
