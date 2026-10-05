import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  FaUser,
  FaEnvelope,
  FaDroplet,
  FaMapLocationDot,
  FaImage,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaHeartPulse,
  FaShieldHeart,
  FaCircleCheck,
  FaHouseMedical,
} from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { getAuthErrorMessage } from "../../utils/authErrors";
import districtData from "../../../public/district.json";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import logo from "../../assets/FamousDiagnosticLogo.png";

const benefits = [
  { icon: <FaCircleCheck />, text: "Accurate & certified test reports" },
  { icon: <FaHouseMedical />, text: "Free home sample collection" },
  { icon: <FaShieldHeart />, text: "Safe, hygienic & secure data" },
  { icon: <FaHeartPulse />, text: "Trusted by 150k+ patients" },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const district = districtData;
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const uploadImage = async (file) => {
    const key = import.meta.env.VITE_image_hosting_key;
    if (!key) return null;

    const formData = new FormData();
    formData.append("image", file);
    const res = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${key}`,
      formData,
      { headers: { "content-type": "multipart/form-data" } }
    );
    return res.data?.data?.display_url || null;
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      let image = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name
      )}&background=2563eb&color=fff&bold=true`;

      const file = data.image?.[0];
      if (file) {
        const uploaded = await uploadImage(file);
        if (uploaded) image = uploaded;
      }

      await createUser(data.email, data.password);
      await updateUserProfile(data.name, image);

      const userInfo = {
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        district: data.district,
        status: "Active",
        image,
      };
      await axiosPublic.post("/users", userInfo);

      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        text: "Welcome to Famous Diagnostic Center.",
        showConfirmButton: false,
        timer: 1800,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: getAuthErrorMessage(error),
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Famous Diagnostic | Register</title>
      </Helmet>

      <section className="bg-slate-50 py-10 dark:bg-[#1c2229] lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30 lg:grid-cols-2">
            {/* Info panel */}
            <aside className="relative hidden flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 p-10 text-white lg:flex">
              <div>
                <Link to="/" className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="Famous Diagnostic"
                    className="h-12 w-12 rounded-full border-2 border-white/70 object-cover"
                  />
                  <span className="text-lg font-extrabold">
                    Famous <span className="text-cyan-200">Diagnostic</span>
                  </span>
                </Link>
                <h2 className="mt-10 text-3xl font-extrabold leading-tight">
                  Join Our Health Family
                </h2>
                <p className="mt-3 max-w-sm text-sm text-blue-50/90">
                  Create your account to book tests, track reports and manage
                  appointments easily.
                </p>
              </div>

              <ul className="mt-10 space-y-4">
                {benefits.map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-xs text-blue-100/80">
                Open 24/7 &middot; All Branches &middot; Hotline 10101
              </p>
            </aside>

            {/* Form */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                  Create an Account
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Already registered?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Login here
                  </Link>
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className={inputClass}
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Blood Group</label>
                    <div className="relative">
                      <FaDroplet className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        className={`${inputClass} appearance-none`}
                        defaultValue=""
                        {...register("bloodGroup", {
                          required: "Select your blood group",
                        })}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bg) => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    {errors.bloodGroup && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.bloodGroup.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>District</label>
                    <div className="relative">
                      <FaMapLocationDot className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        className={`${inputClass} appearance-none`}
                        defaultValue=""
                        {...register("district", {
                          required: "Select your district",
                        })}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {district.map((dis) => (
                          <option key={dis.id} value={dis.name}>
                            {dis.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.district && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.district.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Profile Photo{" "}
                    <span className="font-normal text-slate-400">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <FaImage className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-600 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-blue-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-200 focus:border-blue-400 focus:bg-white dark:border-slate-600 dark:bg-slate-900/40 dark:text-slate-300"
                      {...register("image")}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Leave empty to use an auto-generated avatar.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 characters"
                      className={`${inputClass} pr-11`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative">
                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className={`${inputClass} pr-11`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label="Toggle confirm password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-70 dark:shadow-blue-900/30"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <FaUserPlus /> Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6">
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
