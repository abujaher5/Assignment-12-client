import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";
import {
  FaCircleExclamation,
  FaLocationDot,
  FaPaperPlane,
  FaQuoteLeft,
  FaStar,
  FaUserLarge,
} from "react-icons/fa6";

import "@smastrom/react-rating/style.css";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const AddReview = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 5,
      aboutService: "",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const reviewItem = {
      aboutService: data.aboutService.trim(),
      name: user?.displayName || "Anonymous",
      email: user?.email,
      location: data.location.trim(),
      image: user?.photoURL || "",
      rating: Number(data.rating),
      createdAt: new Date().toISOString(),
    };

    try {
      const reviewRes = await axiosSecure.post("/reviews", reviewItem);

      if (reviewRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review added successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Could not add review",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatar =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.displayName || "User",
    )}&background=2563eb&color=fff&bold=true`;

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
          <FaStar />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Add a Review
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Share your experience and help other patients choose with confidence.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
        <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />

        <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-5 dark:border-slate-700">
          <img
            src={avatar}
            alt={user?.displayName || "User"}
            className="h-14 w-14 rounded-full border-2 border-white object-cover ring-2 ring-blue-100 dark:border-slate-800 dark:ring-blue-500/20"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
              {user?.displayName || "Anonymous"}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user?.email || "No email available"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          <div className="form-control">
            <label className="label px-0">
              <span className="label-text font-semibold text-slate-700 dark:text-slate-200">
                About Our Service
              </span>
            </label>
            <textarea
              {...register("aboutService", {
                required: "Please share a few words about our service.",
              })}
              className={`textarea textarea-bordered h-28 w-full bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:bg-slate-900 ${
                errors.aboutService ? "textarea-error" : ""
              }`}
              placeholder="Tell us what your experience was like..."
            ></textarea>
            {errors.aboutService && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                <FaCircleExclamation /> {errors.aboutService.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label px-0">
              <span className="label-text font-semibold text-slate-700 dark:text-slate-200">
                I Am From
              </span>
            </label>
            <div className="relative">
              <FaLocationDot className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Your city or area"
                {...register("location", {
                  required: "Please enter your location.",
                })}
                className={`input input-bordered w-full bg-slate-50 pl-11 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:bg-slate-900 ${
                  errors.location ? "input-error" : ""
                }`}
              />
            </div>
            {errors.location && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                <FaCircleExclamation /> {errors.location.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label px-0">
              <span className="label-text font-semibold text-slate-700 dark:text-slate-200">
                Your Rating
              </span>
            </label>
            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Rating
                  style={{ maxWidth: 160 }}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  isRequired
                />
              )}
            />
            <p className="mt-2 text-xs text-slate-400">
              Tap the stars to rate our service from 1 to 5.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            <FaQuoteLeft className="mt-1 shrink-0" />
            <p className="text-xs leading-relaxed">
              Your review will be shown on our testimonials section. Please keep
              it honest and respectful.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-blue-900/30"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FaPaperPlane />
            )}
            {isSubmitting ? "Submitting..." : "Add a Review"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddReview;
