import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserGear, FaUsers } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const roleStyles = {
  Admin: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  Doctor: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  User: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

const roles = ["User", "Doctor", "Admin"];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (targetUser, role) => {
    if (role === (targetUser.role || "User")) return;

    Swal.fire({
      title: "Change role?",
      text: `Set ${targetUser.name}'s role to ${role}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Yes, change it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/role/${targetUser._id}`, {
          role,
        });
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${targetUser.name} is now ${role}.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl text-white">
          <FaUsers />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            All Users
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage roles and permissions ({users.length} total).
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
                <th>User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>
                  <span className="inline-flex items-center gap-2">
                    <FaUserGear /> Change Role
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td colSpan={5}>
                      <div className="h-10 animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-700" />
                    </td>
                  </tr>
                ))
              ) : (
                users.map((item) => {
                  const role = item.role || "User";
                  const isSelf = item.email === currentUser?.email;
                  return (
                    <tr
                      key={item._id}
                      className="text-sm text-slate-700 dark:text-slate-200"
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="mask mask-squircle h-11 w-11 overflow-hidden bg-slate-100 dark:bg-slate-700">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            {isSelf && (
                              <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          {item.status || "Active"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            roleStyles[role] || roleStyles.User
                          }`}
                        >
                          {role}
                        </span>
                      </td>
                      <td>
                        <select
                          value={role}
                          disabled={isSelf}
                          onChange={(e) =>
                            handleRoleChange(item, e.target.value)
                          }
                          className="select select-bordered select-sm w-32 border-slate-200 text-slate-700 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900/40 dark:text-slate-200"
                          title={
                            isSelf
                              ? "You cannot change your own role"
                              : "Change role"
                          }
                        >
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
