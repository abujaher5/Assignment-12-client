import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaRightToBracket,
  FaCircleExclamation,
  FaHeartPulse,
  FaClock,
  FaShieldHeart,
  FaTruckMedical,
} from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrors";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import logo from "../../assets/FamousDiagnosticLogo.png";

const highlights = [
  { icon: <FaHeartPulse />, text: "Book tests & track reports online" },
  { icon: <FaTruckMedical />, text: "Free home sample collection" },
  { icon: <FaClock />, text: "Reports delivered within 24 hours" },
  { icon: <FaShieldHeart />, text: "Your health data stays secure" },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400  focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn, resetPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError("");
    try {
      await logIn(data.email, data.password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset your password",
      input: "email",
      inputLabel: "Enter your account email",
      inputPlaceholder: "you@example.com",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Send reset link",
      inputValidator: (value) =>
        !value ? "Please enter your email" : undefined,
    });

    if (!email) return;

    try {
      await resetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Reset link sent",
        text: `Check ${email} for the password reset link.`,
        confirmButtonColor: "#2563eb",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Could not send reset link",
        text: getAuthErrorMessage(err),
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Famous Diagnostic | Login</title>
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
                  Welcome Back
                </h2>
                <p className="mt-3 max-w-sm text-sm text-blue-50/90">
                  Login to book diagnostic tests, view reports and manage your
                  appointments in one place.
                </p>
              </div>

              <ul className="mt-10 space-y-4">
                {highlights.map((item) => (
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
                  Login to Your Account
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  New here?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Create a new account
                  </Link>
                </p>
              </div>

              {error && (
                <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
                  <FaCircleExclamation className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
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

                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`${inputClass} pr-11`}
                      {...register("password", {
                        required: "Password is required",
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

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-70 dark:shadow-blue-900/30"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <FaRightToBracket /> Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6">
                <SocialLogin from={from} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
