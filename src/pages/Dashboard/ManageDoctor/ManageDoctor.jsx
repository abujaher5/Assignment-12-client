import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageDoctor = () => {
  const axiosSecure = useAxiosSecure();
  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/doctors");
      return res.data;
    },
  });
  console.log(doctors);
  return (
    <div className="text-4xl font-bold text-center uppercase">
      <h2>Manage Doctors</h2>

      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>doctor Photo</th>
              <th>Name</th>
              <th>Location</th>
              <th> Available On</th>
              <th>Update Info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {/* table row  */}
            {doctors.map((doctor, idx) => (
              <tr key={doctor._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={doctor.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.location}</td>
                <td>{doctor.availableOn} </td>
                <td>
                  <button className="btn btn-ghost hover:bg-green-300">
                    <FaEdit
                      size={30}
                      color="green
                    "
                    />
                  </button>
                </td>
                <td>
                  <button className="btn btn-ghost hover:bg-red-300 ">
                    <FaTrash size={30} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctor;
