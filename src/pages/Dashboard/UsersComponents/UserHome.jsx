import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="flex flex-col space-y-5 ">
      <h2 className="text-black text-2xl uppercase text-start">
        My Activities
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="card row-span-2 bg-base-100  shadow-sm text-black">
          <figure className="px-10 pt-10">
            <img
              src={user?.photoURL}
              alt="Profile Photo"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body ">
            <h2 className="flex justify-start items-start text-xl font-semibold">
              My Profile
            </h2>
            <p className="text-lg font-medium">Name : {user?.displayName}</p>
            <p className="text-lg font-medium">From : {user?.dist} </p>
            <p className="text-lg font-medium">Blood Group :</p>
          </div>
        </div>

        <div className="text-black p-10 text-xl font-semibold w-[220px] h-[150px] bg-red-400 rounded-xl">
          Taken Services : 3
        </div>

        <div className="text-black p-10 text-xl font-semibold w-[220px] h-[150px] bg-red-400 rounded-xl">
          Total Appointment
        </div>
      </div>
    </div>
  );
};

export default UserHome;
