"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import "./styles/react-modal.css";
import { useEffect } from "react";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [formSubmissions, setFormSubmissions] = useState([]);

  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) {
      setModalMessage("Input Error");
    } else {
      setModalMessage("Submit Successful");
      setFormSubmissions([data, ...formSubmissions]); // Set Data to a constant
      localStorage.setItem("formSubmissions", JSON.stringify([data, ...formSubmissions])); // Save to Local Storage
    }
    setIsModalOpen(true);
    console.log("Form submitted successfully", data);
    reset(); // Reset form fields
  };

  useEffect(() => {
    const storedSubmissions = localStorage.getItem("formSubmissions");
    if (storedSubmissions) {
      setFormSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);
  

  return (
    <div className="bg-stone-100 p-5 mt-5 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-stone-200/50 px-4 py-3 rounded-lg flex justify-between">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            {...register("firstName", { required: "Please enter your first name." })}
            className="ml-2 rounded px-2"
          />
        </div>
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}

        <div className="bg-stone-200/50 px-4 py-3 mt-4 rounded-lg flex justify-between">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            {...register("lastName", { required: "Please enter your last name." })}
            className="ml-2 rounded px-2"
          />
        </div>
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}

        <div className="bg-stone-200/50 px-4 py-3 mt-4 rounded-lg flex justify-between">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", { required: "Please enter your email.", pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email address." } })}
            className="ml-2 rounded px-2"
          />
        </div>
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="px-3 py-2 mt-5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Submit Form
        </button>
      </form>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <p className="bg-green-500 text-white px-3 py-2 rounded-lg mb-4">{modalMessage}</p>
          <button onClick={() => setIsModalOpen(false)} className="bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-lg">Close</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default RegisterForm;
