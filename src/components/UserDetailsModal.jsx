import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({ user, resetTable }) {
  const [userDisplay, setUserDisplay] = useState(user);

  async function handleStatusChange(e) {
    toast("Updating the user....");
    try {
      const userStatusSelected = e.target.value;
      const response = await axiosInstance.patch(
        "user/updateUser",
        {
          userId: userDisplay.id,
          updates: {
            ...userDisplay,
            userStatus: userStatusSelected,
          },
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (response?.data?.result) {
        toast.success("User Status Updated!");
        const user = response?.data?.result;
        setUserDisplay({
          name: user.name,
          email: user.email,
          userStatus: user.userStatus,
          userType: user.userType,
          clientName: user.clientName,
        });
        resetTable();
      }
    } catch (error) {
      toast.error("Error while updating user status");
      console.log(error);
    }
  }

  return (
    <div>
      <dialog id="user_details_modal" className="modal">
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
          <select
            className="select select-bordered w-full max-w-xs"
            defaultValue="default"
            onChange={handleStatusChange}
          >
            <option value="default" disabled>
              Change user status
            </option>
            <option value="approved">Approved</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
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
