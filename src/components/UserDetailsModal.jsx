import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({ user, resetTable }) {
  const [userDisplay, setUserDisplay] = useState(user);

  async function handleUserChange(e) {
    const { category, updatedValue } = e;

    toast(`Updating ${category}... `);
    try {
      const response = await axiosInstance.patch(
        "user/updateUser",
        {
          userId: userDisplay.id,
          updates: {
            ...userDisplay,
            [category]: updatedValue,
          },
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (response?.data?.result) {
        toast.success(`Successfully updated ${category} `);
        const user = response?.data?.result;
        setUserDisplay({
          ...userDisplay,
          name: user.name,
          email: user.email,
          userStatus: user.userStatus,
          userType: user.userType,
          clientName: user.clientName,
        });
        resetTable();
      }
    } catch (error) {
      toast.error(`Error while updating ${category} `);
      console.log(error);
    }
  }

  return (
    <div>
      <dialog
        id="user_details_modal"
        className="modal flex items-center justify-center mt-8 "
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">User Details!</h3>
          <p className="py-4">
            <p className="py-4">
              Name: <span className="text-yellow-500"> {userDisplay.name}</span>
            </p>
            <p className="py-4">
              Client Name:{" "}
              <span className="text-yellow-500"> {userDisplay.clientName}</span>
            </p>
            <p className="py-4">
              Status:{" "}
              <span className="text-yellow-500"> {userDisplay.userStatus}</span>
            </p>
            <p className="py-4">
              Type:{" "}
              <span className="text-yellow-500"> {userDisplay.userType}</span>
            </p>
            <p className="py-4">
              email:{" "}
              <span className="text-yellow-500"> {userDisplay.email}</span>
            </p>
          </p>

          <span>
            <select
              className="select select-bordered w-1/2 max-w-xs"
              defaultValue="default"
              onChange={(e) => {
                const selectedValue = e.target.value;
                const customPayload = {
                  category: "userStatus", // The fixed string
                  updatedValue: selectedValue, // The selected value
                };
                handleUserChange(customPayload);
              }}
            >
              <option value="default" disabled>
                Change user status
              </option>
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <select
              className="select select-bordered w-1/2 max-w-xs"
              defaultValue="default"
              onChange={(e) => {
                const selectedValue = e.target.value;
                const customPayload = {
                  category: "userType",
                  updatedValue: selectedValue,
                };

                handleUserChange(customPayload);
              }}
            >
              <option value="default" disabled>
                Change user type
              </option>
              <option value="customer">Customer</option>
              <option value="engineer">Engineer</option>
              <option value="admin">Admin</option>
            </select>
          </span>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default UserDetailsModal;
