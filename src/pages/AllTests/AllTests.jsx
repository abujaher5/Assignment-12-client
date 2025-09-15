import { Link, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllTests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tests = [] } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  // const [searchParams] = useSearchParams();
  // const categoryFilter = searchParams.get("category") || "all";

  // const filtered = tests.filter((test) =>
  //   categoryFilter === "all" ? true : test.category === categoryFilter
  // );

  // const pathology = tests.filter((test) => test.category === "pathology");
  // const imaginary = tests.filter((test) => test.category === "imaginary");
  // const radiology = tests.filter((test) => test.category === "radiology");
  // console.log(
  //   "Pathology=>",
  //   pathology,
  //   "Imaginary=>",
  //   imaginary,
  //   "Radiology=>",
  //   radiology
  // );
  // const handleSearch = (e) => {
  //   console.log("Search button clicked");
  //   const typed = e.target.searchTerm.value;
  //   console.log(typed);
  // };

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filterTypedItems = tests.filter((test) => {
    const matchesSearch = test.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter == "All" || test.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="text-center flex gap-5 justify-center flex-col items-center">
        <h2 className="text-3xl items-center justify-center mt-6 ">
          Our Services
        </h2>

        <div className="md:self-end self-center flex flex-col md:flex-row">
          <input
            className="border  rounded-xl  px-4 py-1 "
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search By Test Name"
          />
          <div className=" p-2 text-center self-end">
            <select
              defaultValue={"All"}
              className="text-black   w-full border outline-none px-2 py-1 rounded-xl  "
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value={"All"} disabled>
                Select By Category
              </option>
              <option value={"pathology"}>Pathology</option>
              <option value={"radiology"}>Radiology</option>
              <option value={"imaginary"}>Imaginary</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 p-4">
        {filterTypedItems.map((item) => (
          <div className="card glass" key={item._id}>
            <figure>
              <img src={item.image} alt="TestImage" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>Price :{item.price}</p>
              <p>{item.testDetails}</p>
              <div className="card-actions justify-center">
                <Link to={`/testDetails/${item._id}`}>
                  <button className="btn btn-primary">Details Test</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTests;
