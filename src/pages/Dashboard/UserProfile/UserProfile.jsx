import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaArrowRight,
  FaCalendarDays,
  FaCircleCheck,
  FaCircleUser,
  FaClock,
  FaDroplet,
  FaEnvelope,
  FaFloppyDisk,
  FaIdCard,
  FaImage,
  FaLocationDot,
  FaMapLocationDot,
  FaPenToSquare,
  FaStethoscope,
  FaUserClock,
  FaUserDoctor,
  FaUserShield,
  FaUsers,
} from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import districtData from "../../../../public/district.json";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

const roleMeta = {
  Admin: {
    label: "Administrator",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    icon: <FaUserShield />,
    description:
      "Manage users, doctors, tests and the day-to-day operations of the diagnostic center.",
  },
  Doctor: {
    label: "Doctor",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    icon: <FaUserDoctor />,
    description:
      "Manage your professional details, availability and patient appointments.",
  },
  User: {
    label: "Member",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    icon: <FaCircleUser />,
    description:
      "Keep your personal details up to date for faster bookings and accurate reports.",
  },
};

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: profile,
    isLoading: isProfileLoading,
    refetch,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/profile/${user.email}`);
        return res.data;
      } catch (error) {
        if (error.response?.status === 404) return null;
        throw error;
      }
    },
  });

  const { data: doctorProfile } = useQuery({
    queryKey: ["doctorProfile", user?.email],
    enabled: role === "Doctor" && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/doctors/email/${user.email}`);
      return res.data || null;
    },
  });

  const { data: adminOverview, isLoading: isAdminOverviewLoading } = useQuery({
    queryKey: ["adminOverview"],
    enabled: role === "Admin",
    queryFn: async () => {
      const [usersRes, doctorsRes, requestsRes] = await Promise.all([
        axiosSecure.get("/users"),
        axiosSecure.get("/doctors"),
        axiosSecure.get("/users/doctorRequests/all"),
      ]);
      return {
        users: usersRes.data.length,
        doctors: doctorsRes.data.length,
        pending: requestsRes.data.length,
      };
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || user?.displayName || "",
        bloodGroup: profile.bloodGroup || "",
        district: profile.district || "",
        image: profile.image || user?.photoURL || "",
      });
    } else if (profile === null) {
      reset({
        name: user?.displayName || "",
        bloodGroup: "",
        district: "",
        image: user?.photoURL || "",
      });
    }
  }, [profile, reset, user]);

  const onSubmit = async (data) => {
    try {
      if (!profile) {
        const res = await axiosPublic.post("/users", {
          name: data.name,
          email: user.email,
          bloodGroup: data.bloodGroup,
          district: data.district,
          status: "Active",
          image: data.image,
        });
        if (!res.data.insertedId) {
          throw new Error("Could not create profile");
        }
      } else {
        const res = await axiosSecure.patch(
          `/users/profile/${user.email}`,
          data,
        );
        if (res.data.matchedCount === 0) {
          throw new Error("Profile not found");
        }
      }

      await updateUserProfile(data.name, data.image || user?.photoURL || null);
      await refetch();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Profile update failed",
        text: error.message || "Please try again.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  if (isRoleLoading || isProfileLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const meta = roleMeta[role] || roleMeta.User;
  const displayName = profile?.name || user?.displayName || "User";
  const displayEmail = profile?.email || user?.email || "No email available";
  const avatar =
    profile?.image ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=2563eb&color=fff&bold=true`;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaIdCard className="text-base" /> My Profile
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-800 dark:text-white">
            Account &amp; Personal Information
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {meta.description}
          </p>
        </div>
      </div>

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
                  {displayEmail}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.badge}`}
              >
                {meta.icon} {meta.label}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <FaCircleCheck /> {profile?.status || "Active"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {role === "User" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Patient Information
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                  <FaDroplet />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Blood Group
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {profile?.bloodGroup || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <FaMapLocationDot />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    District
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {profile?.district || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Quick Links
            </h3>
            <div className="mt-4 space-y-2">
              {[
                {
                  to: "/dashboard/myAppointment",
                  label: "My Appointments",
                  icon: <FaCalendarDays />,
                },
                {
                  to: "/dashboard/myListings",
                  label: "My Test List",
                  icon: <FaStethoscope />,
                },
                {
                  to: "/doctors",
                  label: "Find a Doctor",
                  icon: <FaUserDoctor />,
                },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-blue-500">{link.icon}</span>
                    {link.label}
                  </span>
                  <FaArrowRight className="text-xs text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {role === "Doctor" && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Professional Information
            </h3>
            <Link
              to="/dashboard/doctorProfile"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 dark:shadow-blue-900/30"
            >
              <FaPenToSquare /> Edit Professional Profile
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <FaStethoscope className="text-blue-500" /> Specialization
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                {doctorProfile?.specialize || "Not set"}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <FaLocationDot className="text-blue-500" /> Chamber
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                {doctorProfile?.location || "Not set"}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <FaCalendarDays className="text-blue-500" /> Available On
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                {doctorProfile?.availableOn || "Not set"}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <FaClock className="text-blue-500" /> Available Time
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                {doctorProfile?.availableTime || "Not set"}
              </p>
            </div>
          </div>

          {doctorProfile?.about && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                About
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {doctorProfile.about}
              </p>
            </div>
          )}

          {!doctorProfile && (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              Your professional profile is not set up yet. Use the button above
              to add your specialization, chamber and schedule.
            </p>
          )}
        </div>
      )}

      {role === "Admin" && (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            System Overview
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                label: "Total Users",
                value: adminOverview?.users,
                icon: <FaUsers />,
                tone: "from-blue-600 to-cyan-500",
                to: "/dashboard/allUsers",
              },
              {
                label: "Doctors",
                value: adminOverview?.doctors,
                icon: <FaUserDoctor />,
                tone: "from-emerald-500 to-teal-500",
                to: "/dashboard/manageDoctors",
              },
              {
                label: "Pending Requests",
                value: adminOverview?.pending,
                icon: <FaUserClock />,
                tone: "from-amber-500 to-orange-500",
                to: "/dashboard/doctorRequests",
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group flex items-center gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-white hover:shadow-md dark:bg-slate-900/40 dark:hover:bg-slate-900"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.tone} text-lg text-white`}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                    {isAdminOverviewLoading ? "-" : item.value ?? 0}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30 sm:p-8"
      >
        <h3 className="text-base font-bold text-slate-800 dark:text-white">
          Edit Account Information
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your name, blood group, district and profile photo.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Full Name</label>
            <div className="relative">
              <FaCircleUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                className={inputClass}
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email Address</label>
            <div className="relative">
              <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={displayEmail}
                readOnly
                className={`${inputClass} cursor-not-allowed opacity-70`}
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Your account email cannot be changed here.
            </p>
          </div>

          <div>
            <label className={labelClass}>Blood Group</label>
            <div className="relative">
              <FaDroplet className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                className={`${inputClass} appearance-none`}
                defaultValue=""
                {...register("bloodGroup")}
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>District</label>
            <div className="relative">
              <FaMapLocationDot className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                className={`${inputClass} appearance-none`}
                defaultValue=""
                {...register("district")}
              >
                <option value="">Select</option>
                {districtData.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Profile Photo URL</label>
            <div className="relative">
              <FaImage className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                placeholder="https://..."
                className={inputClass}
                {...register("image")}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-70 dark:shadow-blue-900/30"
          >
            <FaFloppyDisk /> {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserProfile;
