import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { createTicket } from "../../Redux/Slices/TicketSlice";

function CreateTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!ticket.title || !ticket.description) {
      toast.error("Title and description are mandatory");
      return;
    }
    try {
      const response = await dispatch(createTicket(ticket));
      if (response?.payload?.status == 201) {
        // ticket got created successfully
        toast.success("Email sent to user successfully");
      } else {
        // handle error
        toast.error("An error occurred while creating the ticket");
      }
    } catch (error) {
      // handle error
      toast.error("An error occurred while creating the ticket");
    } finally {
      setTicket({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="min-w-[40rem] border p-20 border-sky-500 rounded-lg hover:bg-sky-900 transition-all ease-in-out duration-300"
        >
          <h1 className="text-3xl font-semibold text-white text-center">
            Create new ticket
          </h1>

          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text text-white text-lg">
                What is title of the issue?
              </span>
            </label>
            <input
              value={ticket.title}
              onChange={handleFormChange}
              name="title"
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full bg-white text-black"
            />
          </div>

          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text text-white text-lg">
                Please describe your issue?
              </span>
            </label>
            <textarea
              value={ticket.description}
              onChange={handleFormChange}
              name="description"
              placeholder="Type here"
              rows="8"
              className="p-2 resize-none w-full rounded-md bg-white text-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-lg font-semibold text-white rounded-md hover:bg-green-600 transition-all ease-in-out duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateTicket;
