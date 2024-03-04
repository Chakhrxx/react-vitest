import { useState } from "react";
import axios from "axios";

interface userType {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export default function RegisterForm() {
  const userData = {
    name: "",
    email: "",
    phoneNumber: "",
  };

  const [formData, setFormData] = useState(userData);
  const [errors, setErrors] = useState<userType>({});

  const validate = (values: userType) => {
    const errors: userType = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number, should be 10 digits";
    }

    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "https://65e5cddcd7f0758a76e77232.mockapi.io/user",
          formData
        );
        if (!response.data) throw new Error("Error in form submission");
        // Handle success here
        alert("Register successful!");
      } catch (error) {
        // Handle errors here
        console.log("error", error);
        alert("Register fail!");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-8">
        <h1 className="text-3xl mb-2">Register Form</h1>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            data-testid="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            data-testid="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
            value={formData.phoneNumber}
            data-testid="phoneNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
}
