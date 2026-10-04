import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useAuth from "../../../hooks/useAuth";
import useListing from "../../../hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const UserHome = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const { data: cUser = [] } = useQuery({
    queryKey: ["cUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      const result = res.data;
      return result;
    },
  });

  console.log("Current log in user", cUser);

  const [listing] = useListing();

  // chart related data
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="flex flex-col space-y-5 ">
      <h2 className="text-black text-2xl uppercase text-start">
        My Activities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className=" row-span-2 bg-base-100  shadow-sm  rounded-xl text-black">
          <figure className="px-10 pt-10">
            <img src={user?.photoURL} alt="Profile Photo" className="p-6" />
          </figure>
          <div className="card-body ">
            <h2 className="flex justify-start items-start text-xl font-semibold">
              My Profile
            </h2>
            <p className="text-lg font-medium">Name : {user?.displayName}</p>
            <p className="text-lg font-medium">From : {cUser?.district} </p>
            <p className="text-lg font-medium">
              Blood Group :{cUser.bloodGroup}
            </p>
          </div>
        </div>

        <div className="text-black p-10 text-xl font-semibold  bg-red-400 rounded-xl card-body">
          Taken Services : {listing.length}
        </div>

        <div className="text-black p-10 text-xl font-semibold  bg-red-400 rounded-xl card-body">
          Total Appointment : 2
        </div>
      </div>
      {/* chart box div */}
      <div>
        <div>
          <BarChart
            width={700}
            height={500}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="uv"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
