
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const makeKey = (label) =>
  label
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");

// --- API helpers ---
const fetchSchema = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/empFormSchemaGetPages/empFormSchemaGetPages"
  );
  return res.data?.data ?? res.data;
};

const submitResponse = async (body) => {
  const res = await axios.post(
    "http://localhost:5000/api/empFormSchemaCreate",
    body
  );
  return res.data;
};

export default function OnboardingForm() {
  const queryclients = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["empFormSchemaPostPages"],
    queryFn: fetchSchema,
  });

  const { mutate, isLoading: isSubmitting } = useMutation(submitResponse, {
    onSuccess: () => queryclients.invalidateQueries(["empFormSchemaPostPages"]),
  });

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleDescriptionInput = Array.isArray(data) ? data[0] : data ?? null;
  const fields = Array.isArray(titleDescriptionInput?.fields) ? titleDescriptionInput.fields : [];
  console.log(fields)

  useEffect(() => {
    if (!titleDescriptionInput) return;

    setTitle(titleDescriptionInput.title ?? "");
    setDescription(titleDescriptionInput.description ?? "");

    const initial = {};
    
    (titleDescriptionInput.fields || []).forEach((field) => {
      const key = makeKey(field.label);
      if (field.type === "switch") {
        initial[key] = Boolean(field.default ?? false);
      } else if (field.type === "select") {
        initial[key] = field.default ?? field.options?.[0] ?? "";
      } else if (field.type === "number") {
        initial[key] = field.default ?? "";
      } else if (field.type === "textarea") {
        initial[key] = field.default ?? "";
      } else {
        initial[key] = field.default ?? "";
      }
    });

    setValues(initial);
    setErrors({});
    setSuccessMessage("");
  }, [titleDescriptionInput]); 

  const handleChange = (key, value) => {
    setValues((p) => ({ ...p, [key]: value }));
    setErrors((p) => {
      const c = { ...p };
      delete c[key];
      return c;
    });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const key = makeKey(field.label);
      const val = values[key];

      if (field.validation?.required) {
        const empty =
          val === undefined ||
          val === null ||
          (typeof val === "string" && val.trim() === "") ||
          (Array.isArray(val) && val.length === 0);
        if (empty) newErrors[key] = `${field.label} is required`;
      }

      if (field.validation?.minLength && typeof val === "string") {
        if (val.trim().length < field.validation.minLength)
          newErrors[
            key
          ] = `${field.label} must be at least ${field.validation.minLength} characters`;
      }

      if (field.validation?.maxLength && typeof val === "string") {
        if (val.trim().length > field.validation.maxLength)
          newErrors[
            key
          ] = `${field.label} must be at most ${field.validation.maxLength} characters`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validate()) return;

    // payload uses title & description from local state (editable)
    const payload = {
      title: title,
      description: description,
      fields: fields.map((f) => ({
        label: f.label,
        type: f.type,
        placeholder: f.placeholder,
        options: f.options,
        validation: f.validation,
        default: values[makeKey(f.label)] ?? f.default ?? "",
      })),
      response: {}, //response stored phone , fullname , role
    };

    fields.forEach((f) => {
      payload.response[makeKey(f.label)] = values[makeKey(f.label)];
    });

    mutate(payload, {
      onSuccess: (res) => {
        setSuccessMessage("Form submitted successfully.");
      },
      onError: (err) => {
        console.error(err);
        setSuccessMessage("");
      },
    });
  };

  if (isLoading) return <p className="text-center text-blue-600">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600">
        Failed to load form. {error?.message ?? ""}
      </p>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="mb-4">
        <label className="block font-medium mb-1">Form Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {fields.map((field, index) => {
          const key = makeKey(field.label);
          const val = values[key];

          return (
            <div key={key + index} className="flex flex-col">
              <label className="font-medium mb-1">
                {field.label}
                {field.validation?.required ? (
                  <span className="text-red-500"> *</span>
                ) : null}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  value={val ?? ""}
                  placeholder={field.placeholder ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              )}

              {field.type === "textarea" && (
                <>
                  {field.phone}
                  <input
                    type="textarea"
                    value={val ?? ""}
                    placeholder={field.placeholder ?? ""}
                    onChange={(e) =>
                      handleChange(
                        key,
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </>
              )}

              {field.type === "select" && (
                <>
                  <select
                    value={val ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">
                      {field.placeholder ?? "Select option"}
                    </option>
                    {field.options?.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {field.type === "date" && (
                <input
                  type="date"
                  value={val ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  rows="3"
                  value={val ?? ""}
                  placeholder={field.placeholder ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              )}

              {field.type === "switch" && (
                <label className="inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={Boolean(val)}
                    onChange={(e) => handleChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer-checked:bg-blue-600 transition-all"></div>
                </label>
              )}

              {errors[key] && (
                <p className="text-sm text-red-600 mt-1">{errors[key]}</p>
              )}
            </div>
          );
        })}

        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded-lg mt-6 ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
