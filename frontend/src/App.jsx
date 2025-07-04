import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [result, setResult] = useState(null);

  const API = "http://localhost:3000/api/student";

  // CREATE
  const createStudent = async (data) => {
    try {
      const res = await axios.post(`${API}/create`, data);
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data?.error || "Create failed" });
    }
  };

  // READ
  const readStudent = async (data) => {
    try {
      const res = await axios.get(`${API}/read/${data.rollNo}`);
      setResult(res.data);
      reset(res.data); // pre-fill form with data
    } catch (err) {
      setResult({ error: err.response?.data?.message || "Read failed" });
    }
  };

  // UPDATE
  const updateStudent = async (data) => {
    try {
      const res = await axios.put(`${API}/update/${data.rollNo}`, data);
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data?.error || "Update failed" });
    }
  };

  // DELETE
  const deleteStudent = async (data) => {
    try {
      const res = await axios.delete(`${API}/delete/${data.rollNo}`);
      setResult(res.data);
      reset(); // clear form
    } catch (err) {
      setResult({ error: err.response?.data?.message || "Delete failed" });
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🎓 Student CRUD Form</h2>

      <form onSubmit={handleSubmit(createStudent)} className="flex flex-col gap-4   items-center w-screen">
        <input
          className="border rounded-full px-2 py-1"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="text-red-600">Name is required</p>}

        <input
          className="border rounded-full px-2 py-1"
          placeholder="Roll No"
          {...register("rollNo" )}
        />
        {errors.rollNo && <p className="text-red-600">Roll No is required</p>}

        <input
          className="border rounded-full px-2 py-1"
          placeholder="Phone"
          {...register("phone" )}
        />
        {errors.phone && <p className="text-red-600">Phone is required</p>}

        <input
          className="border rounded-full px-2 py-1"
          placeholder="Branch"
          {...register("branch" )}
        />
        {errors.branch && <p className="text-red-600">Branch is required</p>}

        <div className="mt-6 flex    gap-3 justify-center w-screen">
          <button
            className="border px-10 py-2 rounded-full bg-green-600 text-white"
            type="submit"
          >
            Create
          </button>
          <button
            className="border px-10 py-2 rounded-full bg-blue-600 text-white"
            type="button"
            onClick={handleSubmit(readStudent)}
          >
            Read
          </button>
          <button
            className="border px-10 py-2 rounded-full bg-amber-600 text-white"
            type="button"
            onClick={handleSubmit(updateStudent)}
          >
            Update
          </button>
          <button
            className="border px-10 py-2 rounded-full bg-red-600 text-white"
            type="button"
            onClick={handleSubmit(deleteStudent)}
          >
            Delete
          </button>
        </div>
      </form>

      {result && result.student && (
  <div className="mt-6 bg-gray-100 p-4 rounded-md text-sm leading-6">
    <p className="font-semibold text-green-700">✅ {result.message}</p>
    <p><strong>Name:</strong> {result.student.name}</p>
    <p><strong>Roll No:</strong> {result.student.rollNo}</p>
    <p><strong>Phone:</strong> {result.student.phone}</p>
    <p><strong>Branch:</strong> {result.student.branch}</p>
  </div>
)}

{result && result.name && ( // For Read-only case
  <div className="mt-6 bg-gray-100 p-4 rounded-md text-sm leading-6">
    <p className="font-semibold text-blue-700">📄 Student Found</p>
    <p><strong>Name:</strong> {result.name}</p>
    <p><strong>Roll No:</strong> {result.rollNo}</p>
    <p><strong>Phone:</strong> {result.phone}</p>
    <p><strong>Branch:</strong> {result.branch}</p>
  </div>
)}

{result && result.message && result.student === undefined && (
  <p className="mt-4 text-red-600">{result.message}</p>
)}

{result?.error && (
  <p className="mt-4 text-red-600">❌ {result.error}</p>
)}

    </div>
  );
};

export default App;
