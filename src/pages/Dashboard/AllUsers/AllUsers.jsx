import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  return (
    <div className="overflow-x-auto shadow-xl bg-slate-200 rounded-md">
      <div>
        <h2 className="text-3xl my-4 text-black text-center">
          Welcome To Famous Diagnostic Center
        </h2>
        <h2 className="text-3xl my-4 text-black text-center">
          Total Users : {users.length}
        </h2>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>User Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th> Status</th>
            <th>Role</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {/* table row  */}
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-ghost btn-xs">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
