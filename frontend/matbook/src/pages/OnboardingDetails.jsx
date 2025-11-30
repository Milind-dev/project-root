

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSchemasPage = async ({ queryKey }) => {
  const [, page, limit, sort] = queryKey;
  const url = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const sortbydate = sort === "desc" ? "desc" : "asc";
  const pages = Number(page) || 1;
  const limits = Number(limit) || 20;

  const res = await axios.get(
    `${url}/api/empFormSchemaGetPages/empFormSchemaGetPages?page=${pages}&limit=${limits}&sort=${sortbydate}`
  );

  return res.data?.data ?? res.data ?? [];
};

export default function OnboardingDetails() {
  const [searchtitle, setSearchTitle] = useState("");
  const [debounce, setDebounceTitle] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // pagination & sort state
  const [page, setPage] = useState(1);
  const [limit] = useState(20); 
  const [sort, setSort] = useState("asc");  //1:-1

  const {
    data = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["empFormSchemaGetPages", page, limit, sort],
    queryFn: fetchSchemasPage,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    onSuccess: (res) => {
      console.log("React Query Fetched Successfully:", res);
    },
    onError: (err) => {
      console.error("React Query Error:", err);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTitle(searchtitle.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchtitle]);

  useEffect(() => {
    if (!debounce) {
      setFilteredData(Array.isArray(data) ? data : []);
      return;
    }

    const searchItem = debounce.toLowerCase();
    const result = (data || []).filter((item) =>
      String(item.title ?? "")
        .toLowerCase()
        .includes(searchItem)
    );
    setFilteredData(result);
  }, [debounce, data]);

  const toggleSort = () => {
    setSort((sortbydate) => (sortbydate === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  const prevPage = () => {
    setPage((pages) => Math.max(1, pages - 1));
  };

  const nextPage = () => {
    if (Array.isArray(data) && data.length < limit) return;
    setPage((pages) => pages + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2">
      <div className="max-w-6xl mx-auto p-8 rounded-2xl shadow">
        <div className="border border-gray-300 border-3 border-spacing-1 shadow-sm mb-3">
          <div className="flex items-center justify-between gap-3 mb-4 mt-3 px-3">
            <div className="flex items-center gap-3">
              <h6 className="text-gray-700 font-semibold">Search</h6>
              <input
                type="text"
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Search title..."
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-md transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleSort}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sort: {sort === "asc" ? "ASC" : "DESC"}
              </button>

              <div className="text-sm text-gray-600">
                {isFetching ? "Updating..." : null}
              </div>
            </div>
          </div>

          <h1 className="text-gray-500 text-2xl font-semibold mb-4 text-center py-6">
            Employee Onboarding Details
          </h1>
        </div>

        <div className="rounded-sm shadow-md">
          <table className="min-w-full shadow-sm rounded-2lg table-fixed border-collapse border border-gray-400 text-center">
            <thead className="border border-spacing-9 bg-gray-300">
              <tr className="py-4">
                <th className="p-2">_id</th>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="py-6 text-center">
                    <div className="flex justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : (filteredData || []).length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                (filteredData || []).map((item) => (
                  <tr
                    key={item._id}
                    className="gap-9 border border-gray-300 text-gray-700"
                  >
                    <td className="p-2 border border-gray-300 text-gray-500">
                      {item._id}
                    </td>
                    <td className="p-2 border border-gray-300 text-gray-500">
                      {item.title}
                    </td>
                    <td className="p-2 border border-gray-300 text-gray-500">
                      {item.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={`px-3 py-2 rounded-md ${
                  page === 1 ? "bg-gray-300 text-gray-600" : "bg-white border"
                }`}
              >
                Prev page
              </button>

              <span className="px-2">Page: {page}</span>
              <button
                onClick={nextPage}
                disabled={Array.isArray(data) && data.length < limit}
                className={`px-3 py-2 rounded-md ${
                  Array.isArray(data) && data.length < limit
                    ? "bg-gray-300 text-gray-600"
                    : "bg-white border"
                }`}
              >
                Next page
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Showing  of {Array.isArray(filteredData) ? filteredData.length : 0}{" "}
              results
            </div>
            <div className="mb-5  text-center mt-[2%]">
              <span className="bg-pink-600 px-3 py-1 rounded-sm  text-white">
                Employee Details{" "}
              </span>
              <p className=" shadow-xl "></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
