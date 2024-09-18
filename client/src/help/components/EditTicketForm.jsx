import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
import axios from "axios"; // Import axios

const EditTicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id !== "new"; // Check if in edit mode or create mode
  const navigate = useNavigate(); // React Router's useNavigate hook

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  // Populate form data with existing ticket information if in EDITMODE
  if (EDITMODE) {
    startingTicketData.title = ticket.title;
    startingTicketData.description = ticket.description;
    startingTicketData.priority = ticket.priority;
    startingTicketData.progress = ticket.progress;
    startingTicketData.status = ticket.status;
    startingTicketData.category = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (EDITMODE) {
        // Update existing ticket
        const res = await axios.put(
          `http://localhost:8080/ticket/${ticket._id}`,
          {
            formData,
          }
        );
        if (res.status === 200) {
          console.log("Ticket updated successfully");
        }
      } else {
        // Create new ticket
        const res = await axios.post("http://localhost:8080/ticket", {
          formData,
        });
        if (res.status === 201) {
          console.log("Ticket created successfully");
        }
      }

      // Navigate back to the home page after the ticket is updated/created
      navigate("/help");
    } catch (error) {
      console.error("Error saving ticket:", error);
    }
  };

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project",
  ];

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>

        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
          {[1, 2, 3, 4, 5].map((priority) => (
            <span key={priority}>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={priority}
                checked={formData.priority == priority}
              />
              <label>{priority}</label>
            </span>
          ))}
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default EditTicketForm;
