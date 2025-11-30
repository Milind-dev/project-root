import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const url = process.env.REACT_APP_API_URL;
  const res = await axios.get(
    `${url}/api/empFormSchemaGetPages/empFormSchemaGetPages`
  );
  const data = await res.data.data;
  console.log(data);

  return data;
};

export default function OnboardingDetails() {
  const [searchtitle, setSearchTitle] = useState("");
  const [debounce, setDebounceTitle] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["empFormSchemaGetPages", searchtitle],
    queryFn: fetchUsers,
    onSuccess: (res) => {
      console.log("React Query Fetched Successfully:", res);
    },
    onError: (err) => {
      console.log("React Query Error:", err);
    },
  });

  const filteringSearchData = () => {
    if(!debounce) return setFilteredData(data);
    
    const searchItem = debounce.toLowerCase();
    const result = data?.filter((item) => {
      return item.title?.toLowerCase().includes(searchItem);
    });
    setFilteredData(result);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTitle(searchtitle.trim());
      // console.log("setbounce",searchtitle.trim())
    }, 500);
    return () => clearTimeout(timer);
  }, [searchtitle]);

  useEffect(() => {
    filteringSearchData()
  },[debounce,data])

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto  p-8 rounded-2xl shadow">
        <div className="border border-gray-300  border-3 border-spacing-1 shadow-sm mb-3">
          <div className="flex items-center justify-end gap-3 mb-4 mt-3 px-3">
            <h6 className="text-gray-700 font-semibold">Search</h6>
            <input
              type="text"
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search title..."
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-md transition-all"
            />
          </div>

          <h1 className="text-gray-500 text-2xl font-semibold mb-4 text-center py-6">
            Employee Onboarding Details
          </h1>
        </div>

        <div className=" rounded-sm shadow-md">
          <table className="min-w-full  shadow-sm  rounded-2lg  table-fixed border-collapse   border border-gray-400 text-center">
            <thead className="border border-spacing-9 bg-gray-300">
              <tr className=" py-4">
                <th>_id</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="2" className="py-6 ml-[50%] text-center">
                    <div className="flex justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData?.map((item) => (
                  <tr
                    key={item._id}
                    className="gap-9 border border-gray-300  text-gray-300 p-6"
                  >
                    <td className="p-2  border border-gray-300 text-gray-500">
                      {item._id}
                    </td>
                    <td className="p-2  border border-gray-300 text-gray-500">
                      {item.title}
                    </td>
                    <td className="p-2  border border-gray-300 text-gray-500">
                      {item.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
