import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaUserDoctor,
  FaCircleCheck,
  FaCircleXmark,
  FaTriangleExclamation,
  FaPlus,
  FaInbox,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DoctorRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["doctorRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/doctorRequests/all");
      return res.data;
    },
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/doctors");
      return res.data;
    },
  });

  const doctorEmails = new Set(doctors.map((doctor) => doctor.email));

  const handleReview = (request, status) => {
    Swal.fire({
      title: status === "approved" ? "Approve request?" : "Reject request?",
      text:
        status === "approved"
          ? `${request.name} will get doctor access.`
          : `${request.name}'s request will be rejected.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#2563eb" : "#e11d48",
      confirmButtonText: status === "approved" ? "Yes, approve" : "Yes, reject",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      const res = await axiosSecure.patch(`/users/doctorRequest/${request._id}`, {
        status,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            status === "approved"
              ? `${request.name} is now a doctor.`
              : "Request rejected.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl text-white">
          <FaUserDoctor />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Doctor Requests
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Review users asking for doctor access ({requests.length} pending).
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <FaInbox className="text-5xl text-slate-300 dark:text-slate-600" />
          <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
            No pending doctor requests
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {requests.map((request) => {
            const matched = doctorEmails.has(request.email);
            return (
              <div
                key={request._id}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30"
              >
                <div className="flex items-start gap-3">
                  <div className="mask mask-squircle h-12 w-12 overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <img
                      src={request.image}
                      alt={request.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                      {request.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {request.email}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Requested{" "}
                      {request.doctorRequest?.requestedAt
                        ? new Date(
                            request.doctorRequest.requestedAt,
                          ).toLocaleString()
                        : "recently"}
                    </p>
                  </div>
                </div>

                {matched ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FaCircleCheck /> Doctor profile matched
                  </p>
                ) : (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                    <FaTriangleExclamation /> No matching doctor profile
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    disabled={!matched}
                    onClick={() => handleReview(request, "approved")}
                    title={
                      matched
                        ? "Approve and grant doctor access"
                        : "Add a doctor profile with this email first"
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500/10 dark:text-emerald-400"
                  >
                    <FaCircleCheck /> Approve
                  </button>
                  <button
                    onClick={() => handleReview(request, "rejected")}
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-100 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-500/10 dark:text-rose-400"
                  >
                    <FaCircleXmark /> Reject
                  </button>
                  {!matched && (
                    <Link
                      to="/dashboard/addADoctor"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-400"
                    >
                      <FaPlus /> Add Doctor Profile
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default DoctorRequests;
