import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaMagnifyingGlass,
  FaVial,
  FaXmark,
  FaSliders,
} from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TestCard from "./TestCard";

const categoryPills = [
  { value: "All", label: "All Tests" },
  { value: "pathology", label: "Pathology" },
  { value: "radiology", label: "Radiology" },
  { value: "imaginary", label: "Imaging" },
];

const sortOptions = [
  { value: "default", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

const AllTests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "All";

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const { data: tests = [], isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  const setCategory = (value) =>
    setSearchParams(value === "All" ? {} : { category: value });

  const filteredTests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const list = tests.filter((test) => {
      const matchesCategory =
        categoryFilter === "All" || test.category === categoryFilter;
      const matchesSearch =
        !query ||
        test.name?.toLowerCase().includes(query) ||
        test.testDetails?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "name")
      return [...list].sort((a, b) => a.name?.localeCompare(b.name));
    return list;
  }, [tests, categoryFilter, searchTerm, sortBy]);

  return (
    <section className="bg-slate-50 py-12 dark:bg-[#1c2229] lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaVial className="text-base" /> Test Directory
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-800 dark:text-white lg:text-4xl">
            All Diagnostic Tests
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            Browse our complete range of pathology, radiology and imaging tests
            with transparent pricing and fast reporting.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by test name or details..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-white dark:focus:ring-blue-500/20"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  <FaXmark />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <FaSliders className="shrink-0 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900/40 dark:text-slate-200 sm:w-auto"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categoryPills.map((pill) => (
              <button
                key={pill.value}
                type="button"
                onClick={() => setCategory(pill.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  categoryFilter === pill.value
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30"
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {!isLoading && (
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-700 dark:text-white">
              {filteredTests.length}
            </span>{" "}
            {filteredTests.length === 1 ? "test" : "tests"}
          </p>
        )}

        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[380px] animate-pulse rounded-3xl border border-slate-100 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-800/40">
            <FaVial className="text-5xl text-slate-300 dark:text-slate-600" />
            <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
              No tests found
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTests.map((test) => (
              <TestCard key={test._id} test={test} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTests;
