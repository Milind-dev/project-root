import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const payload = {
    title: "chip and tale",
    description: "Construction",
    fields: [
      {
        label: "Full name",
        type: "text",
        placeholder: "Enter full name",
        validation: { required: true, minLength: 3, maxLength: 50 },
      },
      {
        label: "Phone",
        type: "text",
        phone: "+919876543210",
        validation: { required: true },
      },
      {
        label: "Role",
        type: "select",
        options: ["dev", "qa", "pm"],
        validation: { required: true },
      },
    ],
  };
  const res = await axios.post("http://localhost:5000/api/empFormSchemaCreate",payload);
  const response = res.data?.data??res.data
    return response;
};

export default function OnboardingForm() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["empFormSchemaGetPages"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load form.</p>;

  const fields = data?.fields || [];

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      fds
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">
        {data?.title || "Onboarding Form"}
      </h2>

      <p className="text-gray-600 mb-4">{data?.description}</p>

      <form className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="font-medium mb-1">{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.placeholder}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                placeholder={field.placeholder}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            )}

            {field.type === "select" && (
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400">
                <option value="">Select option</option>
                {field.options?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "date" && (
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                rows="3"
                placeholder={field.placeholder}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              ></textarea>
            )}

            {field.type === "switch" && (
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer-checked:bg-blue-600 transition-all"></div>
              </label>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-14"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


// import React from 'react'
// import {useQuery} from "@tanstack/react-query";
// import axios from "axios"


// const fetchUsers = async () => {
//      const res = await axios.get(
//        "http://localhost:5000/api/empFormSchemaGetPages/empFormSchemaGetPages"
//      );
//       return res.data;
// }
// export default function OnboardingForm() {
//     const { data, isLoading, isError } = useQuery({
//       queryKey: ["empFormSchemaGetPages"],
//       queryFn: fetchUsers,
//     });


//   return (
//      <>
//         <div>

//         </div>
//     </>
//   );
// }