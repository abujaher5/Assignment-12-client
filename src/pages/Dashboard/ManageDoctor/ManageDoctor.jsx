import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageDoctor = () => {
  const axiosSecure = useAxiosSecure();
  const { data: doctors = [], refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/doctors");
      return res.data;
    },
  });
  console.log(doctors);

  const handleDelete = (doctor) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/doctors/${doctor._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${doctor.name} has been deleted.`,
            icon: "success",
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="text-4xl font-bold text-center uppercase max-w-6xl ">
      <h2>Manage Doctors</h2>

      <div className=" overflow-auto">
        <table className="table ">
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
                  <Link to={`/dashboard/updateDoctorsInfo/${doctor._id}`}>
                    <button className="btn btn-ghost hover:bg-green-300">
                      <FaEdit
                        size={30}
                        color="green
                    "
                      />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(doctor)}
                    className="btn btn-ghost hover:bg-red-300 "
                  >
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
