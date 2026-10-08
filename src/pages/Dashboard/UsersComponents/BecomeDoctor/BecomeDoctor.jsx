import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaUserDoctor,
  FaCircleCheck,
  FaClock,
  FaCircleExclamation,
  FaPaperPlane,
  FaStethoscope,
} from "react-icons/fa6";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CENTER =
  "flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white px-6 py-16 text-center shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30";

const BecomeDoctor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();

  const {
    data: request,
    isLoading: isRequestLoading,
    refetch: refetchRequest,
  } = useQuery({
    queryKey: ["doctorRequest", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/doctorRequest/${user.email}`);
      return res.data?.doctorRequest || null;
    },
  });

  const { data: doctorProfile, isLoading: isDoctorLoading } = useQuery({
    queryKey: ["doctorByEmail", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/doctors/email/${user.email}`);
      return res.data;
    },
  });

  const handleRequest = () => {
    Swal.fire({
      title: "Request to become a doctor?",
      text: "Send a request to the admin for approval.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Yes, send request",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        await axiosSecure.post("/users/doctorRequest");
        refetchRequest();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Request sent to admin.",
          showConfirmButton: false,
          timer: 1600,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Request failed",
          text:
            error?.response?.data?.message ||
            "Please make sure the admin has added your doctor profile.",
          confirmButtonColor: "#2563eb",
        });
      }
    });
  };

  if (isRoleLoading || isRequestLoading || isDoctorLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const isDoctor = role === "Doctor";
  const isAdmin = role === "Admin";
  const status = request?.status;
  const hasDoctorProfile = Boolean(doctorProfile);

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl text-white">
          <FaStethoscope />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Become a Doctor
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Join our panel of specialists and manage patients online.
          </p>
        </div>
      </div>

      {(isDoctor || isAdmin || status === "approved") && (
        <div className={CENTER}>
          <FaCircleCheck className="text-5xl text-emerald-500" />
          <p className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">
            {isAdmin
              ? "You are an administrator"
              : "You are already a doctor"}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Head to the doctor dashboard to manage your appointments.
          </p>
        </div>
      )}

      {!isDoctor && !isAdmin && status === "pending" && (
        <div className={CENTER}>
          <FaClock className="text-5xl text-amber-500" />
          <p className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">
            Request pending approval
          </p>
          <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Your request to become a doctor is waiting for the admin to review.
            You will be notified once it is approved.
          </p>
        </div>
      )}

      {!isDoctor && !isAdmin && status !== "pending" && status !== "approved" && (
        <>
          {hasDoctorProfile ? (
            <div className={CENTER}>
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-3xl text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <FaUserDoctor />
              </span>
              <p className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">
                You are eligible to become a doctor
              </p>
              <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                The admin has added a doctor profile for{" "}
                <span className="font-semibold">{user?.email}</span>. Send a
                request to get doctor access.
              </p>
              {status === "rejected" && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
                  <FaCircleExclamation /> Your previous request was rejected. You
                  can request again.
                </p>
              )}
              <button
                onClick={handleRequest}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-blue-900/30"
              >
                <FaPaperPlane /> Request To Become a Doctor
              </button>
            </div>
          ) : (
            <div className={CENTER}>
              <FaUserDoctor className="text-5xl text-slate-300 dark:text-slate-600" />
              <p className="mt-4 text-lg font-bold text-slate-700 dark:text-slate-200">
                No doctor profile found
              </p>
              <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                The admin has not added a doctor profile for{" "}
                <span className="font-semibold">{user?.email}</span> yet. Please
                contact the admin to add you as a doctor first.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BecomeDoctor;
