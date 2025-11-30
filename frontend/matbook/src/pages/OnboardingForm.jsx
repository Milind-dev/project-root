import React from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from "axios"


const fetchUsers = async () => {
     const res = await axios.get(
       "http://localhost:5000/api/empFormSchemaGetPages/empFormSchemaGetPages"
     );
      return res.data;
}
export default function OnboardingForm() {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["empFormSchemaGetPages"],
      queryFn: fetchUsers,
    });
  return (
     <>
        <div>
            <h1 className="text-red-700 text-3xl">Onboarding Forms</h1>
        </div>
    </>
  );
}
